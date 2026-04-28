import styles from './CommitChangesButton.module.css';

type CommitChangesButtonProps = {
	onCommit: () => void;
	disabled?: boolean;
	isSaving?: boolean;
};

export function CommitChangesButton({ onCommit, disabled = false, isSaving = false }: CommitChangesButtonProps) {
	return (
		<button
			type="button"
			onClick={onCommit}
			disabled={disabled}
			className={styles.button}
		>
			{isSaving ? 'Saving...' : 'Commit Changes'}
		</button>
	);
}
