import type { ChatResponse, OllamaConnectionStatus, OllamaModel } from '../../../chat/protocol';
import { EmptyState } from '../sidebar/EmptyState';
import styles from './ChatPanel.module.css';

type ChatPanelProps = {
	status: OllamaConnectionStatus;
	models: OllamaModel[];
	selectedModel: string;
	response: ChatResponse | null;
	error: string | null;
	isLoading: boolean;
};

export function ChatPanel({ status, models, selectedModel, response, error, isLoading }: ChatPanelProps) {
	if (status === 'checking') {
		return (
			<EmptyState
				title="Checking local Ollama connection..."
				description="Settings stays available while DevLocal AI verifies the local runtime and model list."
			/>
		);
	}

	if (status === 'disconnected') {
		return (
			<EmptyState
				title="Ollama is not available"
				description={error ?? 'Install or start Ollama locally, then test the connection in Settings.'}
			/>
		);
	}

	if (models.length === 0) {
		return (
			<EmptyState
				title="No local models found"
				description="Pull a model with Ollama, then refresh the connection from Settings."
			/>
		);
	}

	if (isLoading) {
		return (
			<EmptyState
				title="Generating response..."
				description="Your local model is processing the current request."
			/>
		);
	}

	if (error) {
		return <EmptyState title="Something went wrong" description={error} />;
	}

	if (response) {
		return (
			<article className={styles.responseCard}>
				<header className={styles.responseHeader}>
					<div>
						<p className={styles.eyebrow}>Local Response</p>
						<h2 className={styles.responseModel}>{response.model}</h2>
					</div>
				</header>
				<p className={styles.responseText}>{response.response}</p>
			</article>
		);
	}

	return (
		<EmptyState
			title="Ready to chat"
			description={`Using ${selectedModel || models[0].name}. Send a prompt when you are ready.`}
		/>
	);
}
