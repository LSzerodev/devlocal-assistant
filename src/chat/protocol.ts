export type OllamaConnectionStatus = 'connected' | 'disconnected' | 'checking';

export interface ChatSettings {
  model: string;
  host: string;
}

export interface SendChat {
  prompt: string;
  model: string;
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
      type: 'ollama.checkStatus';
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
    }
  | {
      type: 'ollama.status';
      payload: {
        status: OllamaConnectionStatus;
      };
    }
  | {
      type: 'chat.response';
      payload: {
        response: string;
        model: string;
      };
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

    // ainda nao terminado!
