import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function BrandIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				d="M12 4.5 17.25 7.5V13.5L12 16.5 6.75 13.5V7.5L12 4.5Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
			<circle cx="12" cy="10.5" r="1.6" fill="currentColor" />
		</svg>
	);
}

export function EmptyStateIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
			<path
				d="M32 11 47 19.5V36.5L32 45 17 36.5V19.5L32 11Z"
				fill="currentColor"
				fillOpacity="0.2"
				stroke="currentColor"
				strokeWidth="2.6"
				strokeLinejoin="round"
			/>
			<path d="M32 11v13.5m15-5L32 28 17 19.5" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
			<circle cx="32" cy="28.5" r="5.8" fill="#0f0f10" stroke="currentColor" strokeWidth="2.6" />
		</svg>
	);
}

export function SettingsIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
			<path
				d="M19 12a7 7 0 0 0-.08-1l1.48-1.15-1.4-2.42-1.78.53A7 7 0 0 0 15.5 6.8L15 5h-2.8l-.5 1.8a7 7 0 0 0-1.72.58l-1.78-.53-1.4 2.42L8.28 11A7 7 0 0 0 8.2 12c0 .34.03.67.08 1l-1.48 1.15 1.4 2.42 1.78-.53c.54.25 1.12.44 1.72.58L12.2 19H15l.5-1.8c.6-.14 1.18-.33 1.72-.58l1.78.53 1.4-2.42L18.92 13c.05-.33.08-.66.08-1Z"
				stroke="currentColor"
				strokeWidth="1.4"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function SendIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path d="M12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			<path d="m7 11 5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export function ChevronDownIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export function SparkIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path d="m9.9 3.4 1.2 3.1 3.1 1.2-3.1 1.2-1.2 3.1-1.2-3.1-3.1-1.2 3.1-1.2 1.2-3.1Z" fill="currentColor" />
			<path d="m14.9 10.6.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6Z" fill="currentColor" opacity="0.9" />
		</svg>
	);
}

export function BoltIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path d="M10.9 2.6 5.4 10h3l-.4 7.4 5.6-7.5h-3.1l.4-7.3Z" fill="currentColor" />
		</svg>
	);
}

export function ShieldIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path
				d="M10 2.8 15.2 5v4.3c0 3.5-2.1 6.1-5.2 7.9-3.1-1.8-5.2-4.4-5.2-7.9V5L10 2.8Z"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinejoin="round"
			/>
			<path d="m7.8 10 1.5 1.5 3-3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export function ArrowLeftIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path d="M12.5 4.5 7 10l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export function CloseIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path d="M5 5 15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			<path d="M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

export function PlugIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path d="M7 4.5v4m6-4v4m-7.2 0h8.4a.8.8 0 0 1 .8.8v1.4a4.2 4.2 0 0 1-3.5 4.14V18h-3v-3.16A4.2 4.2 0 0 1 5 10.7V9.3a.8.8 0 0 1 .8-.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
		</svg>
	);
}

export function DownloadIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path d="M10 3.5v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			<path d="m6.8 8.8 3.2 3.2 3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.5 15.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

export function CheckIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<circle cx="10" cy="10" r="6.8" stroke="currentColor" strokeWidth="1.5" />
			<path d="m6.9 10.2 2 2 4.2-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export function CloudIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path d="M7.5 15.5h6.4a3 3 0 0 0 .4-6 4.6 4.6 0 0 0-8.6-1.2A3.7 3.7 0 0 0 7.5 15.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
			<path d="m8.2 12 1.4 1.4 3-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export function BookIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
			<path d="M5.5 4.5h8.2a1.8 1.8 0 0 1 1.8 1.8v9.2H7.3a1.8 1.8 0 0 0-1.8 1.8V6.3a1.8 1.8 0 0 1 1.8-1.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
			<path d="M5.5 15.5h8.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
		</svg>
	);
}
