import type { OllamaConnectionStatus } from '../../../chat/protocol';
import styles from './StatusBadge.module.css';

type StatusBadgeProps = {
	status: OllamaConnectionStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
	const badgeState =
		status === 'connected'
			? {
					label: 'connected',
					stateClassName: styles.connected,
				}
			: status === 'checking'
				? {
						label: 'checking',
						stateClassName: styles.checking,
					}
				: {
						label: 'disconnected',
						stateClassName: styles.disconnected,
					};

	return (
		<div className={`${styles.badge} ${badgeState.stateClassName}`}>
			<span className={styles.dot} />
			<span className={styles.label}>{badgeState.label}</span>
		</div>
	);
}
