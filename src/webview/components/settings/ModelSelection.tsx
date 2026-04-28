import { ChevronDownIcon, SparkIcon } from '../Icons';
import styles from './ModelSelection.module.css';

type ModelSelectionProps = {
	model: string;
	options: string[];
	disabled?: boolean;
	error?: string;
	onModelChange: (value: string) => void;
};

export function ModelSelection({ model, options, disabled = false, error, onModelChange }: ModelSelectionProps) {
	const hasOptions = options.length > 0;
	const value = hasOptions && options.includes(model) ? model : '';

	return (
		<section className={styles.section}>
			<p className={styles.eyebrow}>Selection</p>
			<div className={styles.selectWrap}>
				<span className={styles.leftIcon}>
					<SparkIcon className={styles.sparkIcon} />
				</span>
				<select
					value={value}
					onChange={(event) => {
						onModelChange(event.target.value);
					}}
					disabled={disabled}
					className={styles.select}
				>
					{hasOptions ? null : <option value="">No local models found</option>}
					{hasOptions && value === '' ? <option value="">Select a local model</option> : null}
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				<span className={styles.rightIcon}>
					<ChevronDownIcon className={styles.chevronIcon} />
				</span>
			</div>
			{error ? <p className={styles.errorText}>{error}</p> : null}
		</section>
	);
}
