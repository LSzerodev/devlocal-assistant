import * as vscode from 'vscode';
import { getChatWebviewHtml } from './getChatWebviewHtml';
import { messageRouter, RouterDependencies } from './messageRouter';
import { ExtensionToWebview, WebviewToExtension } from './protocol';

export class ChatViewProvider implements vscode.WebviewViewProvider {
  public static readonly containerId = 'devlocalAI';
  public static readonly viewType = 'devlocalAI.chatView';

  private view: vscode.WebviewView | undefined;

  public constructor(
    private readonly extensionUri: vscode.Uri,
    private readonly routerDeps: RouterDependencies
  ) {}

  public async resolveWebviewView(webviewView: vscode.WebviewView): Promise<void> {
	console.log('✅ resolveWebviewView chamado');
    await this.ensureSideBarOnRight();

    this.view = webviewView;

    const postToWebview = (message: ExtensionToWebview) => {
      void webviewView.webview.postMessage(message);
    };

    webviewView.webview.onDidReceiveMessage(async (message: WebviewToExtension) => {
		await messageRouter(message, postToWebview, this.routerDeps);
		console.log('📩 Mensagem recebida da Webview:', message);
    });

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')],
    };

    webviewView.webview.html = getChatWebviewHtml(webviewView.webview, this.extensionUri);

    webviewView.onDidDispose(() => {
      if (this.view === webviewView) {
        this.view = undefined;
      }
    });
  }

  public async show(): Promise<void> {
    await this.ensureSideBarOnRight();
    await vscode.commands.executeCommand(
      `workbench.view.extension.${ChatViewProvider.containerId}`
    );
    this.view?.show(false);
  }

  private async ensureSideBarOnRight(): Promise<void> {
    const workbenchConfiguration = vscode.workspace.getConfiguration('workbench');
    const sideBarLocation = workbenchConfiguration.get<'left' | 'right'>('sideBar.location');

    if (sideBarLocation !== 'right') {
      await workbenchConfiguration.update(
        'sideBar.location',
        'right',
        vscode.ConfigurationTarget.Global
      );
    }
  }
}
