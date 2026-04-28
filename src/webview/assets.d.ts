declare module '*.svg' {
	const src: string;
	export default src;
}

declare module '*.module.css' {
	const classes: Record<string, string>;
	export default classes;
}

declare module '*.css' {
	const src: string | undefined;
	export default src;
}

declare function acquireVsCodeApi(): {
	postMessage(message: unknown): void;
	setState(state: unknown): void;
	getState(): unknown;
};
