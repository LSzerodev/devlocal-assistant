import { SettingsIcon } from '../Icons';
import type { OllamaConnectionStatus } from '../../../chat/protocol';
import { StatusBadge } from './StatusBadge';
import Container from '../../assets/Container.svg';
import styles from './SidebarHeader.module.css';

type SidebarHeaderProps = {
	onOpenSettings: () => void;
	status: OllamaConnectionStatus;
};

export function SidebarHeader({ onOpenSettings, status }: SidebarHeaderProps) {
	return (
		<header className={styles.header}>
			<div className={styles.brandSlot}>
				<div className={styles.brandMark}>
					<img src={Container} alt="DevLocal AI logo" className={styles.logo} />
				</div>
			</div>

			<div className={styles.statusSlot}>
				<StatusBadge status={status} />
			</div>

			<button
				type="button"
				aria-label="Open settings"
				onClick={onOpenSettings}
				className={styles.settingsButton}
			>
				<SettingsIcon className={styles.settingsIcon} />
			</button>
		</header>
	);
}
