import type { ChatResponse, ChatSettings, OllamaConnectionStatus, OllamaModel } from '../../chat/protocol';

export type AppView = 'chat' | 'settings';
export type InfrastructureLoad = 'low' | 'standard' | 'ideal' | 'max';
export type GlobalOverride = 'chat' | 'empty' | 'status' | 'error';

export interface AppState {
	currentView: AppView;
	settings: {
		saved: ChatSettings;
		form: ChatSettings;
		helperText?: string;
		isLoaded: boolean;
		isSaving: boolean;
	};
	ollama: {
		status: OllamaConnectionStatus;
		host: string;
		models: OllamaModel[];
		error?: string;
	};
	chat: {
		prompt: string;
		response: ChatResponse | null;
		error: string | null;
		isLoading: boolean;
	};
	controls: {
		infrastructureLoad: InfrastructureLoad;
		globalOverride: GlobalOverride;
	};
}
