import type { OllamaConnectionStatus } from '../../../chat/protocol';
import { ChevronDownIcon, SendIcon, SparkIcon } from '../Icons';
import styles from './Composer.module.css';

type ComposerProps = {
	model: string;
	options: string[];
	onModelChange: (value: string) => void;
	prompt: string;
	onPromptChange: (value: string) => void;
	onSend: () => void;
	disabled?: boolean;
	status: OllamaConnectionStatus;
};

export function Composer({
	model,
	options,
	onModelChange,
	prompt,
	onPromptChange,
	onSend,
	disabled = false,
	status,
}: ComposerProps) {
	const hasModels = options.length > 0;
	const isDisabled = disabled || !hasModels;
	const modelValue = hasModels && options.includes(model) ? model : '';
	const canSend = !isDisabled && prompt.trim().length > 0;

	return (
		<div className={styles.composer} aria-busy={status === 'checking'}>
			<textarea
				value={prompt}
				onChange={(event) => {
					onPromptChange(event.target.value);
				}}
				placeholder="Escreva sua duvida..."
				disabled={isDisabled}
				className={styles.promptInput}
			/>

			<div className={styles.actions}>
				<div className={styles.modelControl}>
					<span className={styles.leftIcon}>
						<SparkIcon className={styles.sparkIcon} />
					</span>
					<select
						value={modelValue}
						onChange={(event) => {
							onModelChange(event.target.value);
						}}
						disabled={isDisabled}
						className={styles.modelSelect}
					>
						{hasModels ? null : <option value="">No models found</option>}
						{hasModels && modelValue === '' ? <option value="">Select a model</option> : null}
						{options.map((option) => (
							<option key={option} value={option}>
								Model: {option}
							</option>
						))}
					</select>
					<span className={styles.rightIcon}>
						<ChevronDownIcon className={styles.chevronIcon} />
					</span>
				</div>

				<button
					type="button"
					aria-label="Send message"
					onClick={onSend}
					disabled={!canSend}
					className={styles.sendButton}
				>
					<SendIcon className={styles.sendIcon} />
				</button>
			</div>
		</div>
	);
}
