import type {
	ChatResponse,
	ChatSettings,
	OllamaDownloadProgressPayload,
	OllamaModelCatalogPayload,
	OllamaStatusPayload,
} from '../../chat/protocol';
import { DEFAULT_OLLAMA_HOST, normalizeOllamaHost } from '../../chat/ollamaHost';
import type { AppState, AppView, InfrastructureLoad } from './types';

export const initialAppState: AppState = {
	currentView: 'chat',
	settings: {
		saved: {
			model: '',
			host: DEFAULT_OLLAMA_HOST,
		},
		form: {
			model: '',
			host: DEFAULT_OLLAMA_HOST,
		},
		helperText: 'Checking local Ollama connection...',
		isLoaded: false,
		isSaving: false,
	},
	ollama: {
		status: 'checking',
		host: DEFAULT_OLLAMA_HOST,
		models: [],
	},
	downloads: {
		localModels: [],
		cloudModels: [],
	},
	chat: {
		prompt: '',
		response: null,
		error: null,
		isLoading: false,
	},
	controls: {
		infrastructureLoad: 'ideal',
	},
};

export type AppAction =
	| { type: 'view.changed'; view: AppView }
	| { type: 'settings.loaded'; settings: ChatSettings }
	| { type: 'settings.modelChanged'; model: string }
	| { type: 'settings.hostChanged'; host: string }
	| { type: 'settings.saving' }
	| { type: 'settings.saved'; settings: ChatSettings }
	| { type: 'settings.error'; error: string }
	| { type: 'ollama.checking'; host?: string }
	| { type: 'ollama.statusChanged'; payload: OllamaStatusPayload }
	| { type: 'models.catalogLoaded'; payload: OllamaModelCatalogPayload }
	| { type: 'models.downloadRequested'; model: string }
	| { type: 'models.downloadProgressChanged'; payload: OllamaDownloadProgressPayload }
	| { type: 'chat.promptChanged'; prompt: string }
	| { type: 'chat.requested' }
	| { type: 'chat.loading' }
	| { type: 'chat.response'; response: ChatResponse }
	| { type: 'chat.error'; error: string }
	| { type: 'controls.infrastructureLoadChanged'; value: InfrastructureLoad };

export function appReducer(state: AppState, action: AppAction): AppState {
	switch (action.type) {
		case 'view.changed':
			return {
				...state,
				currentView: action.view,
			};

		case 'settings.loaded': {
			const nextForm = withAvailableModel(action.settings, state.ollama.models);

			return {
				...state,
				settings: {
					...state.settings,
					saved: action.settings,
					form: nextForm,
					isLoaded: true,
				},
				ollama: {
					...state.ollama,
					host: action.settings.host,
				},
			};
		}

		case 'settings.modelChanged':
			return {
				...state,
				settings: {
					...state.settings,
					form: {
						...state.settings.form,
						model: action.model,
					},
				},
			};

		case 'settings.hostChanged': {
			const normalizedHost = normalizeOllamaHost(action.host);
			const isCheckedHost = action.host.trim().length > 0 && normalizedHost === state.ollama.host;

			return {
				...state,
				settings: {
					...state.settings,
					form: {
						...state.settings.form,
						host: action.host,
						model: isCheckedHost ? state.settings.form.model : '',
					},
					helperText: isCheckedHost
						? state.settings.helperText
						: 'Test the connection to load models from this host.',
				},
				ollama: isCheckedHost
					? state.ollama
					: {
							status: 'disconnected',
							host: normalizedHost,
							models: [],
							error: 'Test the connection to load models from this host.',
						},
				chat: isCheckedHost
					? state.chat
					: {
							...state.chat,
							error: null,
							response: null,
						},
			};
		}

		case 'settings.saving':
			return {
				...state,
				settings: {
					...state.settings,
					isSaving: true,
					helperText: 'Saving local settings...',
				},
			};

		case 'settings.saved': {
			const nextForm = withAvailableModel(action.settings, state.ollama.models);

			return {
				...state,
				settings: {
					...state.settings,
					saved: action.settings,
					form: nextForm,
					isLoaded: true,
					isSaving: false,
					helperText: 'Settings saved locally.',
				},
			};
		}

		case 'settings.error':
			return {
				...state,
				settings: {
					...state.settings,
					isLoaded: true,
					isSaving: false,
					helperText: action.error,
				},
			};

		case 'ollama.checking':
			return {
				...state,
				ollama: {
					...state.ollama,
					status: 'checking',
					host: normalizeOllamaHost(action.host ?? state.settings.form.host),
					error: undefined,
				},
				settings: {
					...state.settings,
					helperText: 'Checking local Ollama connection...',
				},
				chat: {
					...state.chat,
					error: null,
				},
			};

		case 'ollama.statusChanged': {
			const checkedHost = normalizeOllamaHost(action.payload.host);
			const currentHost = normalizeOllamaHost(state.settings.form.host);

			if (state.settings.form.host.trim().length === 0 || checkedHost !== currentHost) {
				return state;
			}

			const payload = {
				...action.payload,
				host: checkedHost,
			};
			const nextForm =
				payload.status === 'connected'
					? withConnectedModel(state.settings.form, payload.models)
					: state.settings.form;

			return {
				...state,
				ollama: {
					status: payload.status,
					host: payload.host,
					models: payload.models,
					error: payload.error,
				},
				settings: {
					...state.settings,
					form: nextForm,
					helperText: getOllamaHelperText(payload, state.settings.form.model, nextForm.model),
				},
			};
		}

		case 'models.catalogLoaded':
			return {
				...state,
				downloads: {
					...state.downloads,
					localModels: action.payload.localModels,
					cloudModels: action.payload.cloudModels,
				},
			};

		case 'models.downloadRequested':
			return {
				...state,
				downloads: {
					...state.downloads,
					progress: {
						model: action.model,
						percent: 0,
						status: 'downloading',
					},
				},
			};

		case 'models.downloadProgressChanged':
			return {
				...state,
				downloads: {
					...state.downloads,
					progress: action.payload,
				},
			};

		case 'chat.promptChanged':
			return {
				...state,
				chat: {
					...state.chat,
					prompt: action.prompt,
				},
			};

		case 'chat.requested':
			return {
				...state,
				chat: {
					...state.chat,
					response: null,
					error: null,
				},
			};

		case 'chat.loading':
			return {
				...state,
				chat: {
					...state.chat,
					isLoading: true,
					error: null,
				},
			};

		case 'chat.response':
			return {
				...state,
				chat: {
					...state.chat,
					isLoading: false,
					error: null,
					response: action.response,
				},
			};

		case 'chat.error':
			return {
				...state,
				chat: {
					...state.chat,
					isLoading: false,
					error: action.error,
				},
			};

		case 'controls.infrastructureLoadChanged':
			return {
				...state,
				controls: {
					...state.controls,
					infrastructureLoad: action.value,
				},
			};
	}
}

function withAvailableModel(settings: ChatSettings, models: AppState['ollama']['models']): ChatSettings {
	if (models.length === 0) {
		return settings;
	}

	if (models.some((model) => model.name === settings.model)) {
		return settings;
	}

	return {
		...settings,
		model: models[0].name,
	};
}

function withConnectedModel(settings: ChatSettings, models: AppState['ollama']['models']): ChatSettings {
	if (models.length === 0) {
		return {
			...settings,
			model: '',
		};
	}

	return withAvailableModel(settings, models);
}

function getOllamaHelperText(
	payload: OllamaStatusPayload,
	previousModel: string,
	nextModel: string
): string {
	if (payload.status === 'checking') {
		return 'Checking local Ollama connection...';
	}

	if (payload.status === 'disconnected') {
		return payload.error ?? 'Local Ollama connection is unavailable.';
	}

	if (payload.models.length === 0) {
		return 'Ollama is connected, but no local models were found.';
	}

	if (previousModel && previousModel !== nextModel) {
		return `Saved model "${previousModel}" was not found. Selected "${nextModel}" instead.`;
	}

	return 'Local Ollama connection is available.';
}
