import { useEffect, useRef, useState } from 'react';
import type {
	ExtensionToWebview,
	OllamaConnectionStatus,
	WebviewToExtension,
} from '../../chat/protocol';
import { SettingsView } from '../components/settings/SettingsView';
import { Composer } from '../components/sidebar/Composer';
import { EmptyState } from '../components/sidebar/EmptyState';
import { FooterMeta } from '../components/sidebar/FooterMeta';
import { SidebarHeader } from '../components/sidebar/SidebarHeader';
import { SidebarShell } from '../components/sidebar/SidebarShell';

type AppView = 'chat' | 'settings';
type InfrastructureLoad = 'low' | 'standard' | 'ideal' | 'max';
type GlobalOverride = 'chat' | 'empty' | 'status' | 'error';

const MODEL_OPTIONS = ['mistral', 'ollama3'];
const vscode = acquireVsCodeApi();

export function App() {
	const [currentView, setCurrentView] = useState<AppView>('chat');
	const [model, setModel] = useState('Mistral');
	const [prompt, setPrompt] = useState('');
	const [host, setHost] = useState('http://localhost:11434');
	const [infrastructureLoad, setInfrastructureLoad] = useState<InfrastructureLoad>('ideal');
	const [globalOverride, setGlobalOverride] = useState<GlobalOverride>('chat');
	const [ollamaStatus, setOllamaStatus] = useState<OllamaConnectionStatus>('checking');
	const [settingsHelperText, setSettingsHelperText] = useState<string | undefined>(undefined);
	const [chatResponse, setChatResponse] = useState<{ response: string; model: string } | null>(null);
	const [chatError, setChatError] = useState<string | null>(null);
	const [isChatLoading, setIsChatLoading] = useState(false);
	const hasInitializedRef = useRef(false);

	const postToExtension = (message: WebviewToExtension) => {
		vscode.postMessage(message);
	};

	useEffect(() => {
		if (hasInitializedRef.current) {
			return;
		}

		hasInitializedRef.current = true;
		postToExtension({ type: 'settings.load' });
		postToExtension({ type: 'ollama.checkStatus' });
	}, []);

	useEffect(() => {
		const handleMessage = (event: MessageEvent<ExtensionToWebview>) => {
			const message = event.data;

			switch (message.type) {
				case 'settings.loaded':
					setModel(message.payload.model);
					setHost(message.payload.host);
					break;
				case 'settings.saved':
					setSettingsHelperText('Settings saved locally.');
					break;
				case 'ollama.status':
					setOllamaStatus(message.payload.status);
					setSettingsHelperText(
						message.payload.status === 'connected'
							? 'Local Ollama connection is available.'
							: message.payload.status === 'checking'
								? 'Checking local Ollama connectivity...'
								: 'Local Ollama connection is unavailable.'
					);
					break;
				case 'chat.loading':
					setIsChatLoading(true);
					setChatError(null);
					break;
				case 'chat.response':
					setIsChatLoading(false);
					setChatError(null);
					setChatResponse(message.payload);
					break;
				case 'chat.error':
					setIsChatLoading(false);
					setChatError(message.payload.error);
					break;
			}
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);

	const handleCheckStatus = () => {
		setOllamaStatus('checking');
		setSettingsHelperText('Checking local Ollama connectivity...');
		postToExtension({ type: 'ollama.checkStatus' });
	};

	const handleSaveSettings = () => {
		setSettingsHelperText('Saving local settings...');
		postToExtension({
			type: 'settings.save',
			payload: {
				model,
				host,
			},
		});
		setCurrentView('chat');
	};

	const handleSendChat = () => {
		const trimmedPrompt = prompt.trim();

		if (!trimmedPrompt || isChatLoading) {
			return;
		}

		setChatResponse(null);
		setChatError(null);
		postToExtension({
			type: 'chat.send',
			payload: {
				prompt: trimmedPrompt,
				model,
			},
		});
		setPrompt('');
	};

	const chatContent = (() => {
		if (isChatLoading) {
			return (
				<EmptyState
					title="Generating response..."
					description="Your local model is processing the current request."
				/>
			);
		}

		if (chatError) {
			return <EmptyState title="Something went wrong" description={chatError} />;
		}

		if (chatResponse) {
			return (
				<div className="mx-auto w-full max-w-[520px] rounded-[24px] border border-white/[0.05] bg-white/[0.03] px-5 py-5 text-left shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
					<div className="mb-4 flex items-center justify-between gap-3">
						<div>
							<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7a72]">
								Local Response
							</p>
							<h2 className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-[#f3ede5]">
								{chatResponse.model}
							</h2>
						</div>
					</div>
					<p className="whitespace-pre-wrap text-[14px] leading-7 text-[#d7c6ba]">
						{chatResponse.response}
					</p>
				</div>
			);
		}

		return <EmptyState />;
	})();

	if (currentView === 'settings') {
		return (
			<SidebarShell
				contentClassName="block overflow-y-auto px-3 pb-3 pt-3"
				content={
					<SettingsView
						model={model}
						modelOptions={MODEL_OPTIONS}
						host={host}
						infrastructureLoad={infrastructureLoad}
						globalOverride={globalOverride}
						helperText={settingsHelperText}
						onBack={() => {
							setCurrentView('chat');
						}}
						onCommitChanges={handleSaveSettings}
						onHostChange={setHost}
						onTestConnection={handleCheckStatus}
						onInfrastructureLoadChange={setInfrastructureLoad}
						onGlobalOverrideChange={setGlobalOverride}
						onModelChange={setModel}
					/>
				}
			/>
		);
	}

	return (
		<SidebarShell
			header={
				<SidebarHeader
					status={ollamaStatus}
					onOpenSettings={() => {
						setCurrentView('settings');
					}}
				/>
			}
			contentClassName="flex items-center justify-center px-6"
			content={chatContent}
			footer={
				<>
					<div className="px-2">
						<Composer
							model={model}
							options={MODEL_OPTIONS}
							onModelChange={setModel}
							prompt={prompt}
							onPromptChange={setPrompt}
							onSend={handleSendChat}
							disabled={isChatLoading}
						/>
					</div>
					<div className="pt-3">
						<FooterMeta />
					</div>
				</>
			}
		/>
	);
}
