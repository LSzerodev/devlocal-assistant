import { ChevronDownIcon, SendIcon, SparkIcon } from '../Icons';

type ComposerProps = {
	model: string;
	options: string[];
	onModelChange: (value: string) => void;
	prompt: string;
	onPromptChange: (value: string) => void;
	onSend: () => void;
	disabled?: boolean;
};

export function Composer({
	model,
	options,
	onModelChange,
	prompt,
	onPromptChange,
	onSend,
	disabled = false,
}: ComposerProps) {
	return (
		<div className="rounded-[18px] border border-white/[0.05] bg-white/[0.035] px-4 pb-4 pt-5 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-md">
			<textarea
				value={prompt}
				onChange={(event) => {
					onPromptChange(event.target.value);
				}}
				placeholder="Escreva sua duvida..."
				className="h-28 w-full resize-none bg-transparent text-[15px] leading-6 text-[#f1ebe4] placeholder:text-[#786d68] focus:outline-none"
			/>

			<div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.05] pt-4">
				<div className="relative min-w-0 flex-1 max-w-[170px]">
					<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#f4a259]">
						<SparkIcon className="h-3.5 w-3.5" />
					</span>
					<select
						value={model}
						onChange={(event) => {
							onModelChange(event.target.value);
						}}
						className="w-full appearance-none rounded-xl border border-white/[0.05] bg-[#26211f] py-2.5 pl-8 pr-9 text-[12px] font-semibold text-[#d7c6ba] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] focus:border-[#ff8c3a]/30 focus:outline-none"
					>
						{options.map((option) => (
							<option key={option} value={option}>
								Model: {option}
							</option>
						))}
					</select>
					<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8e8179]">
						<ChevronDownIcon className="h-4 w-4" />
					</span>
				</div>

				<button
					type="button"
					aria-label="Send message"
					onClick={onSend}
					disabled={disabled}
					className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff9d4d_0%,#ff7a1f_100%)] text-white shadow-[0_0_0_1px_rgba(255,179,115,0.22),0_0_28px_rgba(255,125,36,0.42)] transition hover:scale-[1.02] hover:shadow-[0_0_0_1px_rgba(255,179,115,0.28),0_0_34px_rgba(255,125,36,0.5)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
				>
					<SendIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
}
