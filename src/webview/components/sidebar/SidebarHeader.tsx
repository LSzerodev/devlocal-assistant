import { SettingsIcon } from '../Icons';
import type { OllamaConnectionStatus } from '../../../chat/protocol';
import { StatusBadge } from './StatusBadge';
import Container from '../../assets/Container.svg';

type SidebarHeaderProps = {
	onOpenSettings: () => void;
	status: OllamaConnectionStatus;
};

export function SidebarHeader({ onOpenSettings, status }: SidebarHeaderProps) {
	return (
		<header className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
			<div className="flex items-center">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff7c22]/10 text-[#ff7c22] shadow-[0_0_18px_rgba(255,124,34,0.24)]">
					<img src={Container} alt="DevLocal AI logo" className="h-5 w-5 object-contain" />
				</div>
			</div>

			<div className="justify-self-center">
				<StatusBadge status={status} />
			</div>

			<button
				type="button"
				aria-label="Open settings"
				onClick={onOpenSettings}
				className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.03] text-[#d5b7a8] transition hover:bg-white/[0.06]"
			>
				<SettingsIcon className="h-4 w-4" />
			</button>
		</header>
	);
}
