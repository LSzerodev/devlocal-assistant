import * as vscode from 'vscode';
import { ChatViewProvider } from './chat/chatViewProvider';
import type { RouterDependencies } from './chat/messageRouter';
import { DEFAULT_OLLAMA_HOST, normalizeOllamaHost } from './chat/ollamaHost';
import type { ChatSettings } from './chat/protocol';
import { OllamaChecker } from './services/ollama.check';
import { ollamaFetch } from './services/ollama.service';

const SETTINGS_KEY = 'devlocalAI.settings';
const DEFAULT_SETTINGS: ChatSettings = {
	model: '',
	host: DEFAULT_OLLAMA_HOST,
};

const ollamaChecker = new OllamaChecker();

export function activate(context: vscode.ExtensionContext) {
	const routerDeps: RouterDependencies = {
		settings: {
			load: async () => loadSettings(context),
			save: async (settings) => {
				const normalizedSettings = normalizeSettings(settings);
				await context.globalState.update(SETTINGS_KEY, normalizedSettings);

				return normalizedSettings;
			},
		},
		ollama: {
			check: async (host) => ollamaChecker.check(host),
		},
		chat: {
			send: async (send) => ollamaFetch(send),
		},
	};

	const chatViewProvider = new ChatViewProvider(context.extensionUri, routerDeps);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ChatViewProvider.viewType, chatViewProvider, {
			webviewOptions: {
				retainContextWhenHidden: true,
			},
		}),
		vscode.commands.registerCommand('devlocal-ia.openPanel', async () => {
			await chatViewProvider.show();
		}),
	);
}

export function deactivate() {}

function loadSettings(context: vscode.ExtensionContext): ChatSettings {
	const savedSettings = context.globalState.get<Partial<ChatSettings>>(SETTINGS_KEY);

	return normalizeSettings({
		...DEFAULT_SETTINGS,
		...savedSettings,
	});
}

function normalizeSettings(settings: ChatSettings): ChatSettings {
	return {
		model: settings.model.trim(),
		host: normalizeOllamaHost(settings.host),
	};
}
