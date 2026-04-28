import { PlugIcon } from '../Icons';
import styles from './HostGatewayField.module.css';

type HostGatewayFieldProps = {
	host: string;
	helperText: string;
	onHostChange: (value: string) => void;
	onTestConnection: () => void;
	disabled?: boolean;
	isChecking: boolean;
};

export function HostGatewayField({
	host,
	helperText,
	onHostChange,
	onTestConnection,
	disabled = false,
	isChecking,
}: HostGatewayFieldProps) {
	return (
		<section className={styles.section}>
			<p className={styles.eyebrow}>Host Gateway</p>
			<div className={styles.inputWrap}>
				<span className={styles.inputIcon}>
					<PlugIcon className={styles.plugIcon} />
				</span>
				<input
					value={host}
					onChange={(event) => {
						onHostChange(event.target.value);
					}}
					className={styles.input}
				/>
			</div>
			<div className={styles.actions}>
				<button
					type="button"
					onClick={onTestConnection}
					disabled={disabled}
					className={styles.testButton}
				>
					{isChecking ? 'Checking...' : 'Test Connection'}
				</button>
			</div>
			<p className={styles.helperText}>{helperText}</p>
		</section>
	);
}
