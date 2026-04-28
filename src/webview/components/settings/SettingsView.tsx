import type { OllamaConnectionStatus } from '../../../chat/protocol';
import { ArrowLeftIcon, CloseIcon } from '../Icons';
import { CommitChangesButton } from './CommitChangesButton';
import { CurrentIntelligenceCard } from './CurrentIntelligenceCard';
import { GlobalOverrides } from './GlobalOverrides';
import { HostGatewayField } from './HostGatewayField';
import { InfrastructureLoadGrid } from './InfrastructureLoadGrid';
import { ModelSelection } from './ModelSelection';
import styles from './SettingsView.module.css';

type InfrastructureLoad = 'low' | 'standard' | 'ideal' | 'max';
type GlobalOverride = 'chat' | 'empty' | 'status' | 'error';

type SettingsViewProps = {
	model: string;
	modelOptions: string[];
	host: string;
	status: OllamaConnectionStatus;
	modelsError?: string;
	infrastructureLoad: InfrastructureLoad;
	globalOverride: GlobalOverride;
	helperText?: string;
	isSaving: boolean;
	canSave: boolean;
	canTestConnection: boolean;
	onBack: () => void;
	onCommitChanges: () => void;
	onHostChange: (value: string) => void;
	onTestConnection: () => void;
	onInfrastructureLoadChange: (value: InfrastructureLoad) => void;
	onGlobalOverrideChange: (value: GlobalOverride) => void;
	onModelChange: (value: string) => void;
};

export function SettingsView({
	model,
	modelOptions,
	host,
	status,
	modelsError,
	infrastructureLoad,
	globalOverride,
	helperText,
	isSaving,
	canSave,
	canTestConnection,
	onBack,
	onCommitChanges,
	onHostChange,
	onTestConnection,
	onInfrastructureLoadChange,
	onGlobalOverrideChange,
	onModelChange,
}: SettingsViewProps) {
	const hasModels = modelOptions.length > 0;
	const currentModelName = model || 'No model selected';
	const displayHelperText = helperText ?? 'Update the host or model, then test the local Ollama connection.';

	return (
		<div className={styles.settingsView}>
			<header className={styles.header}>
				<button
					type="button"
					onClick={onBack}
					aria-label="Back to chat"
					className={styles.iconButton}
				>
					<ArrowLeftIcon className={styles.icon} />
				</button>
				<div className={styles.titleGroup}>
					<p className={styles.eyebrow}>System</p>
					<h1 className={styles.title}>Settings</h1>
				</div>
				<button
					type="button"
					onClick={onBack}
					aria-label="Close settings"
					className={styles.iconButton}
				>
					<CloseIcon className={styles.icon} />
				</button>
			</header>

			<CurrentIntelligenceCard
				modelDisplayName={currentModelName}
				status={status}
				description={
					hasModels
						? `${modelOptions.length} local model${modelOptions.length === 1 ? '' : 's'} available from Ollama.`
						: 'No local Ollama models are available yet.'
				}
			/>

			<ModelSelection
				model={model}
				options={modelOptions}
				disabled={status === 'checking' || !hasModels}
				error={modelsError}
				onModelChange={onModelChange}
			/>

			<HostGatewayField
				host={host}
				helperText={displayHelperText}
				onHostChange={onHostChange}
				onTestConnection={onTestConnection}
				disabled={!canTestConnection}
				isChecking={status === 'checking'}
			/>

			<InfrastructureLoadGrid selected={infrastructureLoad} onSelect={onInfrastructureLoadChange} />

			<GlobalOverrides value={globalOverride} onChange={onGlobalOverrideChange} />

			<div className={styles.note}>
				Chat is enabled only when Ollama is connected and at least one local model is available.
			</div>

			<CommitChangesButton
				disabled={!canSave || isSaving}
				isSaving={isSaving}
				onCommit={() => {
					onCommitChanges();
				}}
			/>
		</div>
	);
}
