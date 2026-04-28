import type { Dispatch } from 'react';
import type { ExtensionToWebview } from '../../chat/protocol';
import type { AppAction } from './appReducer';

type AppDispatch = Dispatch<AppAction>;

export function handleExtensionMessage(message: ExtensionToWebview, dispatch: AppDispatch): void {
	switch (message.type) {
		case 'settings.loaded':
			handleSettingsMessage(message, dispatch);
			return;

		case 'settings.saved':
			handleSettingsMessage(message, dispatch);
			return;

		case 'settings.error':
			handleSettingsMessage(message, dispatch);
			return;

		case 'ollama.status':
			handleOllamaMessage(message, dispatch);
			return;

		case 'chat.loading':
			handleChatMessage(message, dispatch);
			return;

		case 'chat.response':
			handleChatMessage(message, dispatch);
			return;

		case 'chat.error':
			handleChatMessage(message, dispatch);
			return;
	}
}

function handleSettingsMessage(
	message: Extract<ExtensionToWebview, { type: 'settings.loaded' | 'settings.saved' | 'settings.error' }>,
	dispatch: AppDispatch
): void {
	switch (message.type) {
		case 'settings.loaded':
			dispatch({ type: 'settings.loaded', settings: message.payload });
			return;

		case 'settings.saved':
			dispatch({ type: 'settings.saved', settings: message.payload });
			return;

		case 'settings.error':
			dispatch({ type: 'settings.error', error: message.payload.error });
			return;
	}
}

function handleOllamaMessage(
	message: Extract<ExtensionToWebview, { type: 'ollama.status' }>,
	dispatch: AppDispatch
): void {
	dispatch({ type: 'ollama.statusChanged', payload: message.payload });
}

function handleChatMessage(
	message: Extract<ExtensionToWebview, { type: 'chat.loading' | 'chat.response' | 'chat.error' }>,
	dispatch: AppDispatch
): void {
	switch (message.type) {
		case 'chat.loading':
			dispatch({ type: 'chat.loading' });
			return;

		case 'chat.response':
			dispatch({ type: 'chat.response', response: message.payload });
			return;

		case 'chat.error':
			dispatch({ type: 'chat.error', error: message.payload.error });
			return;
	}
}
