import { BoltIcon, ShieldIcon } from '../Icons';

export function FooterMeta() {
	return (
		<footer className="flex items-center justify-center gap-4 px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6f655f]">
			<span className="inline-flex items-center gap-1.5">
				<BoltIcon className="h-3.5 w-3.5" />
				Turbo Enabled
			</span>
			<span className="inline-flex items-center gap-1.5">
				<ShieldIcon className="h-3.5 w-3.5" />
				End-to-End Encrypted
			</span>
		</footer>
	);
}
