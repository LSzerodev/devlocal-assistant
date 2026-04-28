export type OllamaConnectionStatus = 'connected' | 'disconnected' | 'checking';

export interface OllamaModel {
	name: string;
	model?: string;
	size?: number;
	modifiedAt?: string;
	family?: string;
	parameterSize?: string;
	quantizationLevel?: string;
}

export interface ChatSettings {
	model: string;
	host: string;
}

export interface SendChat {
	prompt: string;
	model: string;
	host: string;
}

export interface ChatResponse {
	response: string;
	model: string;
}

export interface OllamaStatusPayload {
	status: OllamaConnectionStatus;
	host: string;
	models: OllamaModel[];
	error?: string;
}

export type WebviewToExtension =
	| {
			type: 'settings.load';
		}
	| {
			type: 'settings.save';
			payload: ChatSettings;
		}
	| {
			type: 'ollama.check';
			payload?: {
				host?: string;
			};
		}
	| {
			type: 'chat.send';
			payload: SendChat;
		};

export type ExtensionToWebview =
	| {
			type: 'settings.loaded';
			payload: ChatSettings;
		}
	| {
			type: 'settings.saved';
			payload: ChatSettings;
		}
	| {
			type: 'settings.error';
			payload: {
				error: string;
			};
		}
	| {
			type: 'ollama.status';
			payload: OllamaStatusPayload;
		}
	| {
			type: 'chat.response';
			payload: ChatResponse;
		}
	| {
			type: 'chat.loading';
		}
	| {
			type: 'chat.error';
			payload: {
				error: string;
			};
		};
