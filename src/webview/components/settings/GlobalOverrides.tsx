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
		<section className="rounded-[20px] border border-white/[0.05] bg-white/[0.03] p-4">
			<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7a72]">Global Overrides</p>
			<div className="mt-3 flex flex-wrap gap-2">
				{OVERRIDE_OPTIONS.map((option) => {
					const isActive = value === option.id;

					return (
						<button
							key={option.id}
							type="button"
							onClick={() => {
								onChange(option.id);
							}}
							className={`rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
								isActive
									? 'border-[#ff9d4d]/28 bg-[#ff8d38]/12 text-[#ffb07a] shadow-[0_0_20px_rgba(255,132,38,0.12)]'
									: 'border-white/[0.05] bg-[#1a1716] text-[#b7a69b] hover:bg-[#201b1a]'
							}`}
						>
							{option.label}
						</button>
					);
				})}
			</div>
		</section>
	);
}
