import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { normalizeOllamaHost } from '../../chat/ollamaHost';
import type { ExtensionToWebview, WebviewToExtension } from '../../chat/protocol';
import { appReducer, initialAppState } from './appReducer';
import { handleExtensionMessage } from './messageHandlers';

const vscode = acquireVsCodeApi();

export function useAppController() {
	const [state, dispatch] = useReducer(appReducer, initialAppState);
	const hasInitializedRef = useRef(false);
	const hasRequestedInitialCheckRef = useRef(false);

	const postToExtension = useCallback((message: WebviewToExtension) => {
		vscode.postMessage(message);
	}, []);

	useEffect(() => {
		if (hasInitializedRef.current) {
			return;
		}

		hasInitializedRef.current = true;
		postToExtension({ type: 'settings.load' });
	}, [postToExtension]);

	useEffect(() => {
		const handleMessage = (event: MessageEvent<ExtensionToWebview>) => {
			handleExtensionMessage(event.data, dispatch);
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);

	const availableModelNames = useMemo(
		() => state.ollama.models.map((model) => model.name),
		[state.ollama.models]
	);

	const hasAvailableModel = availableModelNames.includes(state.settings.form.model);
	const isCurrentHostChecked = normalizeOllamaHost(state.settings.form.host) === state.ollama.host;
	const hasHost = state.settings.form.host.trim().length > 0;
	const canUseChat = state.ollama.status === 'connected' && hasHost && isCurrentHostChecked && hasAvailableModel;

	const openChat = useCallback(() => {
		dispatch({ type: 'view.changed', view: 'chat' });
	}, []);

	const openSettings = useCallback(() => {
		dispatch({ type: 'view.changed', view: 'settings' });
	}, []);

	const checkOllama = useCallback(() => {
		const host = state.settings.form.host;

		if (host.trim().length === 0) {
			dispatch({ type: 'settings.error', error: 'Enter an Ollama host before testing the connection.' });
			return;
		}

		dispatch({ type: 'ollama.checking', host });
		postToExtension({
			type: 'ollama.check',
			payload: {
				host,
			},
		});
	}, [postToExtension, state.settings.form.host]);

	useEffect(() => {
		if (!state.settings.isLoaded || hasRequestedInitialCheckRef.current) {
			return;
		}

		hasRequestedInitialCheckRef.current = true;
		checkOllama();
	}, [checkOllama, state.settings.isLoaded]);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible' && state.settings.isLoaded) {
				checkOllama();
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [checkOllama, state.settings.isLoaded]);

	const saveSettings = useCallback(() => {
		dispatch({ type: 'settings.saving' });
		postToExtension({
			type: 'settings.save',
			payload: state.settings.form,
		});
	}, [postToExtension, state.settings.form]);

	const downloadModel = useCallback((model: string) => {
		if (state.settings.form.host.trim().length === 0) {
			dispatch({ type: 'settings.error', error: 'Enter an Ollama host before downloading a model.' });
			return;
		}

		dispatch({ type: 'models.downloadRequested', model });
		postToExtension({
			type: 'models.download',
			payload: {
				host: state.settings.form.host,
				model,
			},
		});
	}, [postToExtension, state.settings.form.host]);

	const sendChat = useCallback(() => {
		const prompt = state.chat.prompt.trim();

		if (!prompt || state.chat.isLoading || !canUseChat) {
			return;
		}

		dispatch({ type: 'chat.requested' });
		postToExtension({
			type: 'chat.send',
			payload: {
				prompt,
				model: state.settings.form.model,
				host: state.settings.form.host,
			},
		});
		dispatch({ type: 'chat.promptChanged', prompt: '' });
	}, [
		canUseChat,
		postToExtension,
		state.chat.isLoading,
		state.chat.prompt,
		state.settings.form.host,
		state.settings.form.model,
	]);

	return {
		state,
		availableModelNames,
		canSaveSettings: hasHost,
		canTestConnection: hasHost && !state.settings.isSaving && state.ollama.status !== 'checking',
		canUseChat,
		openChat,
		openSettings,
		checkOllama,
		saveSettings,
		downloadModel,
		sendChat,
		setHost: (host: string) => {
			dispatch({ type: 'settings.hostChanged', host });
		},
		setModel: (model: string) => {
			dispatch({ type: 'settings.modelChanged', model });
		},
		setPrompt: (prompt: string) => {
			dispatch({ type: 'chat.promptChanged', prompt });
		},
		setInfrastructureLoad: (value: typeof state.controls.infrastructureLoad) => {
			dispatch({ type: 'controls.infrastructureLoadChanged', value });
		},
	};
}
