import { BookIcon, PlugIcon } from '../Icons';

type HostGatewayFieldProps = {
	host: string;
	helperText: string;
	onDocs: () => void;
	onHostChange: (value: string) => void;
	onTestConnection: () => void;
};

export function HostGatewayField({
	host,
	helperText,
	onDocs,
	onHostChange,
	onTestConnection,
}: HostGatewayFieldProps) {
	return (
		<section className="rounded-[20px] border border-white/[0.05] bg-white/[0.03] p-4">
			<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7a72]">Host Gateway</p>
			<div className="relative mt-3">
				<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#f09a5e]">
					<PlugIcon className="h-4 w-4" />
				</span>
				<input
					value={host}
					onChange={(event) => {
						onHostChange(event.target.value);
					}}
					className="w-full rounded-2xl border border-white/[0.05] bg-[#221d1b] py-3 pl-9 pr-3 text-[13px] font-medium text-[#f1ebe4] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] focus:border-[#ff8c3a]/35 focus:outline-none"
				/>
			</div>
			<div className="mt-3 flex gap-2">
				<button
					type="button"
					onClick={onTestConnection}
					className="flex-1 rounded-xl border border-white/[0.05] bg-[#2a2421] px-3 py-2.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#f1ebe4] transition hover:border-[#ff9844]/18 hover:bg-[#332b27]"
				>
					Test Connection
				</button>
				<button
					type="button"
					onClick={onDocs}
					className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.03] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d4c1b3] transition hover:bg-white/[0.06]"
				>
					<BookIcon className="h-3.5 w-3.5" />
					Docs
				</button>
			</div>
			<p className="mt-3 text-[11px] leading-5 text-[#8f8178]">{helperText}</p>
		</section>
	);
}
