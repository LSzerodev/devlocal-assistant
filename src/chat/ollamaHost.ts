export const DEFAULT_OLLAMA_HOST = 'http://localhost:11434';

export function normalizeOllamaHost(host: string | undefined): string {
	const normalizedHost = host?.trim().replace(/\/+$/, '');

	return normalizedHost || DEFAULT_OLLAMA_HOST;
}
