import { ChevronDownIcon, SparkIcon } from '../Icons';

type ModelSelectionProps = {
	model: string;
	options: string[];
	onModelChange: (value: string) => void;
};

export function ModelSelection({ model, options, onModelChange }: ModelSelectionProps) {
	return (
		<section className="rounded-[20px] border border-white/[0.05] bg-white/[0.03] p-4">
			<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7a72]">Selection</p>
			<div className="relative mt-3">
				<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#f4a259]">
					<SparkIcon className="h-3.5 w-3.5" />
				</span>
				<select
					value={model}
					onChange={(event) => {
						onModelChange(event.target.value);
					}}
					className="w-full appearance-none rounded-2xl border border-white/[0.05] bg-[#221d1b] py-3 pl-8 pr-10 text-[13px] font-semibold text-[#f1ebe4] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] focus:border-[#ff8c3a]/35 focus:outline-none"
				>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8f8178]">
					<ChevronDownIcon className="h-4 w-4" />
				</span>
			</div>
		</section>
	);
}
