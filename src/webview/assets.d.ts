declare module '*.svg' {
	const src: string;
	export default src;
}
declare function acquireVsCodeApi(): {
  postMessage(message: unknown): void;
  setState(state: unknown): void;
  getState(): unknown;
};
