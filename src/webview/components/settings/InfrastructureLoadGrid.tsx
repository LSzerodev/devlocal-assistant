import styles from './InfrastructureLoadGrid.module.css';

type InfrastructureLoad = 'low' | 'standard' | 'ideal' | 'max';

type InfrastructureLoadGridProps = {
	selected: InfrastructureLoad;
	onSelect: (value: InfrastructureLoad) => void;
};

const LOAD_OPTIONS: Array<{
	id: InfrastructureLoad;
	label: string;
	ram: string;
}> = [
	{ id: 'low', label: 'Low-Spec', ram: '< 4 GB' },
	{ id: 'standard', label: 'Standard', ram: '8 GB' },
	{ id: 'ideal', label: 'Ideal', ram: '16 GB' },
	{ id: 'max', label: 'Max', ram: '32 GB+' },
];

export function InfrastructureLoadGrid({ selected, onSelect }: InfrastructureLoadGridProps) {
	return (
		<section className={styles.section}>
			<p className={styles.eyebrow}>Infrastructure Load</p>
			<div className={styles.grid}>
				{LOAD_OPTIONS.map((option) => {
					const isActive = selected === option.id;

					return (
						<button
							key={option.id}
							type="button"
							onClick={() => {
								onSelect(option.id);
							}}
							className={`${styles.optionButton} ${isActive ? styles.activeOption : ''}`}
						>
							<div className={styles.optionLabel}>{option.label}</div>
							<div className={styles.optionMeta}>{option.ram}</div>
						</button>
					);
				})}
			</div>
		</section>
	);
}
