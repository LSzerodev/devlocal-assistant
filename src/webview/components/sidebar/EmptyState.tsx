import { EmptyStateIcon } from '../Icons';
import styles from './EmptyState.module.css';

type EmptyStateProps = {
	title?: string;
	description?: string;
};

export function EmptyState({
	title = 'Pronto para comecar?',
	description = 'Selecione um modelo e envie sua duvida abaixo para validar o fluxo visual do assistente.',
}: EmptyStateProps) {
	return (
		<div className={styles.emptyState}>
			<div className={styles.iconWrap}>
				<EmptyStateIcon className={styles.icon} />
			</div>
			<h1 className={styles.title}>{title}</h1>
			<p className={styles.description}>{description}</p>
		</div>
	);
}
