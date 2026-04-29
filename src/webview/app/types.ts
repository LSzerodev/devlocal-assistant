import type {
	ChatResponse,
	ChatSettings,
	OllamaCatalogModel,
	OllamaConnectionStatus,
	OllamaDownloadProgressPayload,
	OllamaModel,
} from '../../chat/protocol';

export type AppView = 'chat' | 'settings';
export type InfrastructureLoad = 'low' | 'standard' | 'ideal' | 'max';

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
	downloads: {
		localModels: OllamaCatalogModel[];
		cloudModels: OllamaCatalogModel[];
		progress?: OllamaDownloadProgressPayload;
	};
	chat: {
		prompt: string;
		response: ChatResponse | null;
		error: string | null;
		isLoading: boolean;
	};
	controls: {
		infrastructureLoad: InfrastructureLoad;
	};
}
