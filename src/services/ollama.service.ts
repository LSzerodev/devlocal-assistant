import type { ChatResponse, OllamaCatalogModel, OllamaModel, SendChat } from '../chat/protocol';
import { normalizeOllamaHost } from '../chat/ollamaHost';

type OllamaGenerateRequest = SendChat;

interface OllamaApiModel {
	name?: unknown;
	model?: unknown;
	modified_at?: unknown;
	size?: unknown;
	details?: {
		family?: unknown;
		parameter_size?: unknown;
		quantization_level?: unknown;
	};
}

interface OllamaTagsResponse {
	models?: OllamaApiModel[];
}

interface OllamaGenerateResponse {
	model?: unknown;
	response?: unknown;
}

interface OllamaPullResponse {
	status?: unknown;
	digest?: unknown;
	total?: unknown;
	completed?: unknown;
	error?: unknown;
}

const REQUEST_TIMEOUT_MS = 6000;

export function getOllamaApiUrl(host: string | undefined, endpoint: string): string {
	const normalizedHost = normalizeOllamaHost(host);
	const apiBaseUrl = normalizedHost.endsWith('/api') ? normalizedHost : `${normalizedHost}/api`;
	const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

	return `${apiBaseUrl}${normalizedEndpoint}`;
}

export async function fetchOllamaModels(host: string | undefined): Promise<OllamaModel[]> {
	const response = await fetchWithTimeout(getOllamaApiUrl(host, '/tags'));

	if (!response.ok) {
		throw new Error(`Ollama models request failed: ${response.status} ${response.statusText}`);
	}

	const data = (await response.json()) as OllamaTagsResponse;

	return (data.models ?? []).map(toOllamaModel).filter((model): model is OllamaModel => model !== null);
}

export async function ollamaFetch({ host, model, prompt }: OllamaGenerateRequest): Promise<ChatResponse> {
	if (!model) {
		throw new Error('Select an Ollama model before sending a message.');
	}

	const response = await fetchWithTimeout(getOllamaApiUrl(host, '/generate'), {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			model,
			prompt,
			stream: false,
		}),
	});

	if (!response.ok) {
		throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
	}

	const data = (await response.json()) as OllamaGenerateResponse;

	return {
		model: typeof data.model === 'string' ? data.model : model,
		response: typeof data.response === 'string' ? data.response : '',
	};
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
	const controller = new AbortController();
	const timeout = setTimeout(() => {
		controller.abort();
	}, REQUEST_TIMEOUT_MS);

	try {
		return await fetch(url, {
			...init,
			signal: controller.signal,
		});
	} finally {
		clearTimeout(timeout);
	}
}

function toOllamaModel(model: OllamaApiModel): OllamaModel | null {
	const name = stringValue(model.name) ?? stringValue(model.model);

	if (!name) {
		return null;
	}

	return {
		name,
		model: stringValue(model.model),
		modifiedAt: stringValue(model.modified_at),
		size: numberValue(model.size),
		family: stringValue(model.details?.family),
		parameterSize: stringValue(model.details?.parameter_size),
		quantizationLevel: stringValue(model.details?.quantization_level),
	};
}

function stringValue(value: unknown): string | undefined {
	return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function numberValue(value: unknown): number | undefined {
	return typeof value === 'number' ? value : undefined;
}

export const LOCAL_OLLAMA_MODELS: OllamaCatalogModel[] = [
	{ name: 'qwen3.6:35b', sizeGb: 24 },
	{ name: 'qwen3:32b', sizeGb: 20 },
	{ name: 'deepseek-r1:32b', sizeGb: 20 },
	{ name: 'qwen2.5-coder:32b', sizeGb: 20 },
	{ name: 'gemma3:27b', sizeGb: 17 },
	{ name: 'gpt-oss:20b', sizeGb: 14 },
	{ name: 'qwen3:14b', sizeGb: 9.3 },
	{ name: 'deepseek-r1:14b', sizeGb: 9 },
	{ name: 'qwen2.5-coder:14b', sizeGb: 9 },
	{ name: 'gemma3:12b', sizeGb: 8.1 },
	{ name: 'qwen3:8b', sizeGb: 5.2 },
	{ name: 'deepseek-r1:8b', sizeGb: 5.2 },
	{ name: 'llama3.1:8b', sizeGb: 4.9 },
	{ name: 'qwen2.5-coder:7b', sizeGb: 4.7 },
	{ name: 'mistral:7b', sizeGb: 4.1 },
	{ name: 'granite4.1:3b', sizeGb: 2.1 },
	{ name: 'llama3.2:3b', sizeGb: 2 },
	{ name: 'phi4-mini:3.8b', sizeGb: 2.5 },
	{ name: 'qwen3:1.7b', sizeGb: 1.4 },
	{ name: 'deepseek-r1:1.5b', sizeGb: 1.1 },
];

export const CLOUD_OLLAMA_MODELS: OllamaCatalogModel[] = [
	{ name: 'deepseek-v4-pro:cloud' },
	{ name: 'deepseek-v4-flash:cloud' },
	{ name: 'kimi-k2.6:cloud' },
	{ name: 'gpt-oss:120b-cloud' },
	{ name: 'qwen3-coder-next:cloud' },
];

export function getOllamaModelCatalog() {
	return {
		localModels: LOCAL_OLLAMA_MODELS,
		cloudModels: CLOUD_OLLAMA_MODELS,
	};
}

export async function downloadModels(
	host: string | undefined,
	model: string,
	onProgress: (percent: number) => void
): Promise<void> {
	if (!LOCAL_OLLAMA_MODELS.some((item) => item.name === model)) {
		throw new Error('This model is not available for local download.');
	}

	const response = await fetch(getOllamaApiUrl(host, '/pull'), {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: model,
			stream: true,
		}),
	});

	if (!response.ok) {
		throw new Error(`Ollama model download failed: ${response.status} ${response.statusText}`);
	}

	if (!response.body) {
		throw new Error('Ollama did not return download progress.');
	}

	onProgress(0);
	await readPullStream(response.body, onProgress);
	onProgress(100);
}

async function readPullStream(
	body: ReadableStream<Uint8Array>,
	onProgress: (percent: number) => void
): Promise<void> {
	const reader = body.getReader();
	const decoder = new TextDecoder();
	const layers = new Map<string, { completed: number; total: number }>();
	let buffer = '';

	while (true) {
		const { value, done } = await reader.read();

		if (done) {
			break;
		}

		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split('\n');
		buffer = lines.pop() ?? '';

		for (const line of lines) {
			handlePullLine(line, layers, onProgress);
		}
	}

	buffer += decoder.decode();
	handlePullLine(buffer, layers, onProgress);
}

function handlePullLine(
	line: string,
	layers: Map<string, { completed: number; total: number }>,
	onProgress: (percent: number) => void
): void {
	const trimmedLine = line.trim();

	if (!trimmedLine) {
		return;
	}

	const data = parsePullLine(trimmedLine);

	if (!data) {
		return;
	}

	const error = stringValue(data.error);

	if (error) {
		throw new Error(error);
	}

	if (stringValue(data.status) === 'success') {
		onProgress(100);
		return;
	}

	const digest = stringValue(data.digest);
	const total = numberValue(data.total);
	const completed = numberValue(data.completed);

	if (!digest || !total || completed === undefined) {
		return;
	}

	layers.set(digest, { completed, total });
	onProgress(getPullPercent(layers));
}

function parsePullLine(line: string): OllamaPullResponse | null {
	try {
		return JSON.parse(line) as OllamaPullResponse;
	} catch {
		return null;
	}
}

function getPullPercent(layers: Map<string, { completed: number; total: number }>): number {
	let completed = 0;
	let total = 0;

	for (const layer of layers.values()) {
		completed += layer.completed;
		total += layer.total;
	}

	if (total === 0) {
		return 0;
	}

	return Math.min(99, Math.max(0, Math.round((completed / total) * 100)));
}
