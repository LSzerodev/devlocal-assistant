import type { ReactNode } from 'react';
import styles from './SidebarShell.module.css';

type SidebarShellProps = {
	header?: ReactNode;
	content: ReactNode;
	footer?: ReactNode;
	contentClassName?: string;
};

export function SidebarShell({ header, content, footer, contentClassName }: SidebarShellProps) {
	return (
		<div className={styles.shell}>
			<div className={styles.frame}>
				<div className={styles.bottomGlow} />
				{header ? <div className={styles.header}>{header}</div> : null}
				<main className={contentClassName ?? styles.content}>{content}</main>
				{footer ? <div className={styles.footer}>{footer}</div> : null}
			</div>
		</div>
	);
}
