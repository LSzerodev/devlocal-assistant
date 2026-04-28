import { ChatPanel } from '../components/chat/ChatPanel';
import { SettingsView } from '../components/settings/SettingsView';
import { Composer } from '../components/sidebar/Composer';
import { FooterMeta } from '../components/sidebar/FooterMeta';
import { SidebarHeader } from '../components/sidebar/SidebarHeader';
import { SidebarShell } from '../components/sidebar/SidebarShell';
import styles from './App.module.css';
import { useAppController } from './useAppController';

export function App() {
	const {
		state,
		availableModelNames,
		canSaveSettings,
		canTestConnection,
		canUseChat,
		checkOllama,
		openChat,
		openSettings,
		saveSettings,
		sendChat,
		setGlobalOverride,
		setHost,
		setInfrastructureLoad,
		setModel,
		setPrompt,
	} = useAppController();

	if (state.currentView === 'settings') {
		return (
			<SidebarShell
				contentClassName={styles.settingsContent}
				content={
					<SettingsView
						model={state.settings.form.model}
						modelOptions={availableModelNames}
						host={state.settings.form.host}
						status={state.ollama.status}
						modelsError={state.ollama.error}
						infrastructureLoad={state.controls.infrastructureLoad}
						globalOverride={state.controls.globalOverride}
						helperText={state.settings.helperText}
						isSaving={state.settings.isSaving}
						canSave={canSaveSettings}
						canTestConnection={canTestConnection}
						onBack={openChat}
						onCommitChanges={saveSettings}
						onHostChange={setHost}
						onTestConnection={checkOllama}
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
			header={<SidebarHeader status={state.ollama.status} onOpenSettings={openSettings} />}
			contentClassName={styles.chatContent}
			content={
				<ChatPanel
					status={state.ollama.status}
					models={state.ollama.models}
					selectedModel={state.settings.form.model}
					response={state.chat.response}
					error={state.chat.error ?? state.ollama.error ?? null}
					isLoading={state.chat.isLoading}
				/>
			}
			footer={
				<>
					<div className={styles.composerWrap}>
						<Composer
							model={state.settings.form.model}
							options={availableModelNames}
							onModelChange={setModel}
							prompt={state.chat.prompt}
							onPromptChange={setPrompt}
							onSend={sendChat}
							disabled={!canUseChat || state.chat.isLoading}
							status={state.ollama.status}
						/>
					</div>
					<div className={styles.footerWrap}>
						<FooterMeta />
					</div>
				</>
			}
		/>
	);
}
