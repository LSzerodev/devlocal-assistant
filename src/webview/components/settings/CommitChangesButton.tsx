type CommitChangesButtonProps = {
	onCommit: () => void;
};

export function CommitChangesButton({ onCommit }: CommitChangesButtonProps) {
	return (
		<button
			type="button"
			onClick={onCommit}
			className="w-full rounded-[18px] bg-[linear-gradient(180deg,#ff9d4d_0%,#ff7a1f_100%)] px-4 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_0_1px_rgba(255,179,115,0.22),0_0_28px_rgba(255,125,36,0.34)] transition hover:shadow-[0_0_0_1px_rgba(255,179,115,0.28),0_0_34px_rgba(255,125,36,0.42)]"
		>
			Commit Changes
		</button>
	);
}
