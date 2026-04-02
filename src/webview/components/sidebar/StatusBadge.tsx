import type { OllamaConnectionStatus } from '../../../chat/protocol';

type StatusBadgeProps = {
	status: OllamaConnectionStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
	const badgeState =
		status === 'connected'
			? {
					label: 'connected',
					containerClassName: 'border-emerald-500/12',
					dotClassName: 'bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.65)]',
				}
			: status === 'checking'
				? {
						label: 'checking',
						containerClassName: 'border-amber-500/12',
						dotClassName: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.55)]',
					}
				: {
						label: 'disconnected',
						containerClassName: 'border-rose-500/12',
						dotClassName: 'bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.45)]',
					};

	return (
		<div
			className={`inline-flex items-center gap-2 rounded-full border bg-white/[0.03] px-3 py-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] ${badgeState.containerClassName}`}
		>
			<span className={`h-2 w-2 rounded-full ${badgeState.dotClassName}`} />
			<span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8d1cb]">
				{badgeState.label}
			</span>
		</div>
	);
}
