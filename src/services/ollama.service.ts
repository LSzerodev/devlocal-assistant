import type { ChatResponse, OllamaModel, SendChat } from '../chat/protocol';
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
