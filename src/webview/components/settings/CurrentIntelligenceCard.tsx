import type { OllamaConnectionStatus } from '../../../chat/protocol';
import styles from './CurrentIntelligenceCard.module.css';

type CurrentIntelligenceCardProps = {
	modelDisplayName: string;
	description: string;
	status: OllamaConnectionStatus;
};

export function CurrentIntelligenceCard({ modelDisplayName, description, status }: CurrentIntelligenceCardProps) {
	const label = status === 'connected' ? 'active' : status;

	return (
		<section className={styles.card}>
			<div className={styles.header}>
				<div>
					<p className={styles.eyebrow}>Current Intelligence</p>
					<h2 className={styles.title}>{modelDisplayName}</h2>
				</div>
				<span className={`${styles.badge} ${styles[status]}`}>{label}</span>
			</div>
			<p className={styles.description}>{description}</p>
		</section>
	);
}
