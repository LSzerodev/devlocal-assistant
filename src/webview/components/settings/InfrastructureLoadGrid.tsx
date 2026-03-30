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
		<section className="rounded-[20px] border border-white/[0.05] bg-white/[0.03] p-4">
			<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7a72]">Infrastructure Load</p>
			<div className="mt-3 grid grid-cols-2 gap-2">
				{LOAD_OPTIONS.map((option) => {
					const isActive = selected === option.id;

					return (
						<button
							key={option.id}
							type="button"
							onClick={() => {
								onSelect(option.id);
							}}
							className={`rounded-2xl border px-3 py-3 text-left transition ${
								isActive
									? 'border-[#ff9d4d]/30 bg-[linear-gradient(180deg,rgba(255,150,76,0.16),rgba(255,255,255,0.04))] shadow-[0_0_24px_rgba(255,132,38,0.14)]'
									: 'border-white/[0.05] bg-[#1a1716] hover:bg-[#201b1a]'
							}`}
						>
							<div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f1ebe4]">
								{option.label}
							</div>
							<div className="mt-1 text-[12px] text-[#998982]">{option.ram}</div>
						</button>
					);
				})}
			</div>
		</section>
	);
}
