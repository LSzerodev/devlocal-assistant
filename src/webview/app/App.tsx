import { useState } from 'react';
import { SettingsView } from '../components/settings/SettingsView';
import { Composer } from '../components/sidebar/Composer';
import { EmptyState } from '../components/sidebar/EmptyState';
import { FooterMeta } from '../components/sidebar/FooterMeta';
import { SidebarHeader } from '../components/sidebar/SidebarHeader';
import { SidebarShell } from '../components/sidebar/SidebarShell';

type AppView = 'chat' | 'settings';
type InfrastructureLoad = 'low' | 'standard' | 'ideal' | 'max';
type GlobalOverride = 'chat' | 'empty' | 'status' | 'error';

const MODEL_OPTIONS = ['Mistral', 'Llama 3.1', 'Phi-3 Mini'];


export function App() {

	const [currentView, setCurrentView] = useState<AppView>('chat');
	const [model, setModel] = useState('Mistral');
	const [prompt, setPrompt] = useState('');
	const [host, setHost] = useState('http://localhost:11434');
	const [infrastructureLoad, setInfrastructureLoad] = useState<InfrastructureLoad>('ideal');
	const [globalOverride, setGlobalOverride] = useState<GlobalOverride>('chat');

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
						onBack={() => {
							setCurrentView('chat');
						}}
						onCommitChanges={() => {
							setCurrentView('chat');
						}}
						onHostChange={setHost}
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
					onOpenSettings={() => {
						setCurrentView('settings');
					}}
				/>
			}
			contentClassName="flex items-center justify-center px-6"
			content={<EmptyState />}
			footer={
				<>
					<div className="px-2">
						<Composer
							model={model}
							options={MODEL_OPTIONS}
							onModelChange={setModel}
							prompt={prompt}
							onPromptChange={setPrompt}
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
