type CurrentIntelligenceCardProps = {
	modelDisplayName: string;
	description: string;
};

export function CurrentIntelligenceCard({ modelDisplayName, description }: CurrentIntelligenceCardProps) {
	return (
		<section className="rounded-[22px] border border-white/[0.05] bg-[linear-gradient(180deg,rgba(255,140,58,0.10),rgba(255,255,255,0.03))] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.34)]">
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7a72]">
						Current Intelligence
					</p>
					<h2 className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-[#f3ede5]">
						{modelDisplayName}
					</h2>
				</div>
				<span className="rounded-full border border-[#10B981]/18 bg-[#10B981]/12 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#10B981]">
					active
				</span>
			</div>
			<p className="mt-3 text-[12px] leading-5 text-[#a3928a]">{description}</p>
		</section>
	);
}
