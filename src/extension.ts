import * as vscode from 'vscode';
import { ChatViewProvider } from './chat/chatViewProvider';
import { RouterDependencies } from './chat/messageRouter';
import { ollamaFetch } from './services/ollama.service';
export function activate(context: vscode.ExtensionContext) {
console.log('✅ extensão ativada');

	const routerDeps: RouterDependencies = {
    settingsLoad: {
      settingsLoad: async () => {
        console.log('📦 loading settings');
        return { model: 'mistral', host: 'http://localhost:11434' };
      },
    },

    settingsSave: {
      settingsSave: async (save) => {
        console.log('💾 saving settings:', save);
      },
    },

    ollamaStatus: {
      statusOllama: async () => {
        console.log('🔌 checking ollama');
        return { status: 'checking' };
      },
    },

    chatSend: {
      chatSend: async (send) => {
        console.log('💬 sending chat:', send);
        return await ollamaFetch({ model: send.model, prompt: send.prompt });
      },
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
