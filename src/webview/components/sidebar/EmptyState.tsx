import { EmptyStateIcon } from '../Icons';

export function EmptyState() {
	return (
		<div className="mx-auto flex max-w-[240px] flex-col items-center text-center">
			<div className="mb-6 rounded-[28px] bg-[#ff8124]/10 p-4 text-[#ff8124] shadow-[0_0_40px_rgba(255,129,36,0.12)]">
				<EmptyStateIcon className="h-14 w-14" />
			</div>
			<h1 className="text-[18px] font-semibold tracking-[-0.02em] text-[#f1ebe4]">Pronto para comecar?</h1>
			<p className="mt-3 text-[13px] leading-6 text-[#82766f]">
				Selecione um modelo e envie sua duvida abaixo para validar o fluxo visual do assistente.
			</p>
		</div>
	);
}
