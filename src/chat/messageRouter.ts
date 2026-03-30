import {
  ChatSettings,
  ExtensionToWebview,
  OllamaConnectionStatus,
  SendChat,
  WebviewToExtension,
} from './protocol';

type postToWebview = (message: ExtensionToWebview) => void;

export interface RouterDependencies {
  settingsLoad: {
    settingsLoad(): Promise<ChatSettings>;
  };
  ollamaStatus: {
    statusOllama(): Promise<{status: OllamaConnectionStatus}>;
  };
  settingsSave: {
    settingsSave(save: ChatSettings): Promise<void>;
  };
  chatSend: {
    chatSend(send: SendChat): Promise<{ response: string; model: string }>;
  };
}

export async function messageRouter(
  message: WebviewToExtension,
  postToWebview: postToWebview,
  deps: RouterDependencies
) {
  switch (message.type) {
    case 'settings.save':
      try{
        await deps.settingsSave.settingsSave(message.payload);
          postToWebview({ type: 'settings.saved' });
      }catch(error: any){
        console.error('error saved message router: ' + error);
      }

      break;

    case 'settings.load':
      try {
        const settings = await deps.settingsLoad.settingsLoad();
        postToWebview({
          type: 'settings.loaded',
          payload: settings,
        });
      } catch (error: any) {
        console.error("error loaded message router: " + error);
      }
      break;

      case 'chat.send':
      try{
        postToWebview({ type: 'chat.loading' });
        const result = await deps.chatSend.chatSend(message.payload);
        postToWebview({
          type: 'chat.response',
          payload: result,
        });

      } catch (error: any){
        postToWebview({
          type: 'chat.error',
          payload: {
            error: error.toString()
          }
        });

        console.error('error chat send message router: ', error);
      }
      break;

      case "ollama.checkStatus":
      try{
        const checkedStatus = await deps.ollamaStatus.statusOllama();
        postToWebview({
          type: 'ollama.status',
          payload: checkedStatus
        });

      }catch(error: any){
        console.error('error check in status ollma messageRouter: ' + error);
      }break;
    }
}
