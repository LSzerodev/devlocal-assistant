import { useState } from 'react';
import { ArrowLeftIcon, CloseIcon } from '../Icons';
import { CommitChangesButton } from './CommitChangesButton';
import { CurrentIntelligenceCard } from './CurrentIntelligenceCard';
import { GlobalOverrides } from './GlobalOverrides';
import { HostGatewayField } from './HostGatewayField';
import { InfrastructureLoadGrid } from './InfrastructureLoadGrid';
import { ModelSelection } from './ModelSelection';

type InfrastructureLoad = 'low' | 'standard' | 'ideal' | 'max';
type GlobalOverride = 'chat' | 'empty' | 'status' | 'error';

type SettingsViewProps = {
	model: string;
	modelOptions: string[];
	host: string;
	infrastructureLoad: InfrastructureLoad;
	globalOverride: GlobalOverride;
	helperText?: string;
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
	infrastructureLoad,
	globalOverride,
	helperText,
	onBack,
	onCommitChanges,
	onHostChange,
	onTestConnection,
	onInfrastructureLoadChange,
	onGlobalOverrideChange,
	onModelChange,
}: SettingsViewProps) {
	const [localHelperText, setLocalHelperText] = useState('Preview only. No live network, persistence, or Ollama integration yet.');
	const displayHelperText = helperText ?? localHelperText;

	const currentModelName = (() => {
		switch (model) {
			case 'Llama 3.1':
				return 'Llama 3.1 8B';
			case 'Phi-3 Mini':
				return 'Phi-3 Mini';
			default:
				return 'Mistral 7B';
		}
	})();

	return (
		<div className="mx-auto flex w-full max-w-[380px] flex-col gap-3">
			<header className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-1 pb-1">
				<button
					type="button"
					onClick={onBack}
					aria-label="Back to chat"
					className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.03] text-[#d5b7a8] transition hover:bg-white/[0.06]"
				>
					<ArrowLeftIcon className="h-4 w-4" />
				</button>
				<div className="text-center">
					<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7a72]">System</p>
					<h1 className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-[#f3ede5]">Settings</h1>
				</div>
				<button
					type="button"
					onClick={onBack}
					aria-label="Close settings"
					className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.03] text-[#d5b7a8] transition hover:bg-white/[0.06]"
				>
					<CloseIcon className="h-4 w-4" />
				</button>
			</header>

			<CurrentIntelligenceCard
				modelDisplayName={currentModelName}
				description="Balanced local reasoning profile prepared for a compact editor-native assistant workflow."
			/>

			<ModelSelection model={model} options={modelOptions} onModelChange={onModelChange} />

			<HostGatewayField
				host={host}
				helperText={displayHelperText}
				onDocs={() => {
					setLocalHelperText('Docs is a local-only preview action in this MVP.');
				}}
				onHostChange={onHostChange}
				onTestConnection={onTestConnection}
			/>

			<InfrastructureLoadGrid selected={infrastructureLoad} onSelect={onInfrastructureLoadChange} />

			<GlobalOverrides value={globalOverride} onChange={onGlobalOverrideChange} />

			<div className="rounded-[18px] border border-white/[0.05] bg-[#171415] px-4 py-3 text-[11px] leading-5 text-[#8f8178]">
				These controls are visual only for now. They let you validate layout, state transitions, and hierarchy before wiring anything real.
			</div>

			<CommitChangesButton
				onCommit={() => {
					onCommitChanges();
				}}
			/>
		</div>
	);
}
