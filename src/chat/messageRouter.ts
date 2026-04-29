import type {
	ChatResponse,
	ChatSettings,
	OllamaModelCatalogPayload,
	ExtensionToWebview,
	OllamaStatusPayload,
	SendChat,
	WebviewToExtension,
} from './protocol';
import { normalizeOllamaHost } from './ollamaHost';

type PostToWebview = (message: ExtensionToWebview) => void;

export interface RouterDependencies {
	settings: {
		load(): Promise<ChatSettings>;
		save(settings: ChatSettings): Promise<ChatSettings>;
	};
	ollama: {
		check(host?: string): Promise<OllamaStatusPayload>;
		getCatalog(): OllamaModelCatalogPayload;
		download(host: string | undefined, model: string, onProgress: (percent: number) => void): Promise<void>;
	};
	chat: {
		send(send: SendChat): Promise<ChatResponse>;
	};
}

export async function messageRouter(
	message: WebviewToExtension,
	postToWebview: PostToWebview,
	deps: RouterDependencies
): Promise<void> {
	switch (message.type) {
		case 'settings.load':
			await handleSettingsLoad(postToWebview, deps);
			return;

		case 'settings.save':
			await handleSettingsSave(message.payload, postToWebview, deps);
			return;

		case 'ollama.check':
			await handleOllamaCheck(message.payload?.host, postToWebview, deps);
			return;

		case 'models.download':
			await handleModelDownload(message.payload.host, message.payload.model, postToWebview, deps);
			return;

		case 'chat.send':
			await handleChatSend(message.payload, postToWebview, deps);
			return;
	}
}

async function handleSettingsLoad(postToWebview: PostToWebview, deps: RouterDependencies): Promise<void> {
	try {
		const settings = await deps.settings.load();

		postToWebview({
			type: 'settings.loaded',
			payload: settings,
		});
		postToWebview({
			type: 'models.catalog',
			payload: deps.ollama.getCatalog(),
		});
	} catch (error) {
		postSettingsError(postToWebview, 'Unable to load local settings.', error);
	}
}

async function handleSettingsSave(
	settings: ChatSettings,
	postToWebview: PostToWebview,
	deps: RouterDependencies
): Promise<void> {
	try {
		const savedSettings = await deps.settings.save(settings);

		postToWebview({
			type: 'settings.saved',
			payload: savedSettings,
		});

		await postOllamaStatus(savedSettings.host, postToWebview, deps);
	} catch (error) {
		postSettingsError(postToWebview, 'Unable to save local settings.', error);
	}
}

async function handleOllamaCheck(
	host: string | undefined,
	postToWebview: PostToWebview,
	deps: RouterDependencies
): Promise<void> {
	try {
		const settings = host ? undefined : await deps.settings.load();
		const hostToCheck = host ?? settings?.host;

		await postOllamaStatus(hostToCheck, postToWebview, deps);
	} catch (error) {
		postToWebview({
			type: 'ollama.status',
			payload: {
				status: 'disconnected',
				host: normalizeOllamaHost(host),
				models: [],
				error: getErrorMessage(error, 'Unable to check Ollama.'),
			},
		});
	}
}

async function postOllamaStatus(
	host: string | undefined,
	postToWebview: PostToWebview,
	deps: RouterDependencies
): Promise<void> {
	const hostToCheck = normalizeOllamaHost(host);

	postToWebview({
		type: 'ollama.status',
		payload: {
			status: 'checking',
			host: hostToCheck,
			models: [],
		},
	});

	try {
		const status = await deps.ollama.check(hostToCheck);

		postToWebview({
			type: 'ollama.status',
			payload: status,
		});
	} catch (error) {
		postToWebview({
			type: 'ollama.status',
			payload: {
				status: 'disconnected',
				host: hostToCheck,
				models: [],
				error: getErrorMessage(error, 'Unable to check Ollama.'),
			},
		});
	}
}

async function handleChatSend(
	send: SendChat,
	postToWebview: PostToWebview,
	deps: RouterDependencies
): Promise<void> {
	try {
		postToWebview({ type: 'chat.loading' });

		const result = await deps.chat.send(send);

		postToWebview({
			type: 'chat.response',
			payload: result,
		});
	} catch (error) {
		postToWebview({
			type: 'chat.error',
			payload: {
				error: getErrorMessage(error, 'Unable to send message to Ollama.'),
			},
		});
	}
}

async function handleModelDownload(
	host: string | undefined,
	model: string,
	postToWebview: PostToWebview,
	deps: RouterDependencies
): Promise<void> {
	const postDownloadProgress = (percent: number) => {
		postToWebview({
			type: 'models.downloadProgress',
			payload: {
				model,
				percent,
				status: 'downloading',
			},
		});
	};

	try {
		postDownloadProgress(0);
		await deps.ollama.download(host, model, postDownloadProgress);
		postToWebview({
			type: 'models.downloadProgress',
			payload: {
				model,
				percent: 100,
				status: 'complete',
			},
		});
		await postOllamaStatus(host, postToWebview, deps);
	} catch (error) {
		postToWebview({
			type: 'models.downloadProgress',
			payload: {
				model,
				percent: 0,
				status: 'error',
				error: getErrorMessage(error, 'Unable to download this Ollama model.'),
			},
		});
	}
}

function postSettingsError(postToWebview: PostToWebview, fallback: string, error: unknown): void {
	postToWebview({
		type: 'settings.error',
		payload: {
			error: getErrorMessage(error, fallback),
		},
	});
}

function getErrorMessage(error: unknown, fallback: string): string {
	if (error instanceof Error && error.message) {
		return error.message;
	}

	return fallback;
}
