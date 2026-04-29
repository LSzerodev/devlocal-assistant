import { execFile } from 'child_process';
import { promisify } from 'util';
import { normalizeOllamaHost } from '../chat/ollamaHost';
import type { OllamaStatusPayload } from '../chat/protocol';
import { fetchOllamaModels } from './ollama.service';

export class OllamaChecker {
	private readonly execFileAsync = promisify(execFile);

	public async check(host: string | undefined): Promise<OllamaStatusPayload> {
		const normalizedHost = normalizeOllamaHost(host);
		const isCliAvailable = await this.isInstalled();

		try {
			const models = await fetchOllamaModels(normalizedHost);
			return {
				status: 'connected',
				host: normalizedHost,
				models,
			};
		} catch (error) {
			return {
				status: 'disconnected',
				host: normalizedHost,
				models: [],
				error: this.getConnectionErrorMessage(error, isCliAvailable),
			};
		}
	}

	public async isInstalled(): Promise<boolean> {
		try {
			await this.execFileAsync('ollama', ['--version'], {
				timeout: 3000,
				windowsHide: true,
			});

			return true;
		} catch {
			return false;
		}
	}

	private getConnectionErrorMessage(error: unknown, isCliAvailable: boolean): string {
		if (!isCliAvailable) {
			return 'Ollama was not found. Install Ollama or make sure the CLI is available in PATH.';
		}

		if (error instanceof Error && error.name === 'AbortError') {
			return 'Ollama did not respond in time. Make sure the local Ollama service is running.';
		}

		return 'Ollama is installed, but the local API is not reachable. Start Ollama and try again.';
	}
}
