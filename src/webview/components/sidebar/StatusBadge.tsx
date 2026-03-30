export function StatusBadge() {
	return (
		<div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/12 bg-white/[0.03] px-3 py-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
			<span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.65)]" />
			<span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8d1cb]">
				Connected
			</span>
		</div>
	);
}
