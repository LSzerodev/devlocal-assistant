import { BoltIcon, ShieldIcon } from '../Icons';
import styles from './FooterMeta.module.css';

export function FooterMeta() {
	return (
		<footer className={styles.footer}>
			<span className={styles.item}>
				<BoltIcon className={styles.icon} />
				Turbo Enabled
			</span>
			<span className={styles.item}>
				<ShieldIcon className={styles.icon} />
				End-to-End Encrypted
			</span>
		</footer>
	);
}
