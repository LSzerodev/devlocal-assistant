import type { ReactNode } from 'react';

type SidebarShellProps = {
	header?: ReactNode;
	content: ReactNode;
	footer?: ReactNode;
	contentClassName?: string;
};

export function SidebarShell({ header, content, footer, contentClassName }: SidebarShellProps) {
	return (
		<div className="flex h-screen min-h-screen flex-col overflow-hidden px-3 pb-3 pt-3 text-[#f3ede5]">
			<div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-white/[0.04] bg-[radial-gradient(circle_at_top,_rgba(255,145,64,0.08),transparent_26%),linear-gradient(180deg,#111112_0%,#0a0a0b_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_bottom,_rgba(255,132,38,0.12),transparent_58%)]" />
				{header ? <div className="relative px-3 pt-3">{header}</div> : null}
				<main className={`relative min-h-0 flex-1 ${contentClassName ?? 'flex items-center justify-center px-6'}`}>
					{content}
				</main>
				{footer ? <div className="relative px-1 pb-1">{footer}</div> : null}
			</div>
		</div>
	);
}
