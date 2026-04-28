import styles from './GlobalOverrides.module.css';

type GlobalOverride = 'chat' | 'empty' | 'status' | 'error';

type GlobalOverridesProps = {
	value: GlobalOverride;
	onChange: (value: GlobalOverride) => void;
};

const OVERRIDE_OPTIONS: Array<{
	id: GlobalOverride;
	label: string;
}> = [
	{ id: 'chat', label: 'Chat' },
	{ id: 'empty', label: 'Empty' },
	{ id: 'status', label: 'Status' },
	{ id: 'error', label: 'Error' },
];

export function GlobalOverrides({ value, onChange }: GlobalOverridesProps) {
	return (
		<section className={styles.section}>
			<p className={styles.eyebrow}>Global Overrides</p>
			<div className={styles.options}>
				{OVERRIDE_OPTIONS.map((option) => {
					const isActive = value === option.id;

					return (
						<button
							key={option.id}
							type="button"
							onClick={() => {
								onChange(option.id);
							}}
							className={`${styles.optionButton} ${isActive ? styles.activeOption : ''}`}
						>
							{option.label}
						</button>
					);
				})}
			</div>
		</section>
	);
}
