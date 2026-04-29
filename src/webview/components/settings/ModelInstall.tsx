import type { OllamaCatalogModel, OllamaDownloadProgressPayload } from '../../../chat/protocol';
import { CheckIcon, ChevronDownIcon, CloudIcon, DownloadIcon } from '../Icons';
import styles from './ModelInstall.module.css';

type ModelInstallProps = {
	models: OllamaCatalogModel[];
	cloudModels: OllamaCatalogModel[];
	installedModelNames: string[];
	downloadProgress?: OllamaDownloadProgressPayload;
	disabled: boolean;
	onDownload: (model: string) => void;
};

export function ModelInstall({
	models,
	cloudModels,
	installedModelNames,
	downloadProgress,
	disabled,
	onDownload,
}: ModelInstallProps) {
	const isAnyDownloading = downloadProgress?.status === 'downloading';

	return (
		<div className={styles.groups}>
			<details className={styles.section} open>
				<summary className={styles.header}>
					<span className={styles.headerIcon}>
						<DownloadIcon className={styles.headerSvg} />
					</span>
					<span className={styles.headerText}>
						<span className={styles.title}>Local Install</span>
						<span className={styles.subtitle}>Manage offline-capable weights</span>
					</span>
					<ChevronDownIcon className={styles.chevronIcon} />
				</summary>

				<div className={styles.modelList}>
					{models.map((model) => {
						const rowProgress = downloadProgress?.model === model.name ? downloadProgress : undefined;
						const isInstalled = installedModelNames.includes(model.name) || rowProgress?.status === 'complete';
						const isDownloading = rowProgress?.status === 'downloading';

						return (
							<button
								key={model.name}
								type="button"
								className={styles.modelRow}
								disabled={disabled || isInstalled || isAnyDownloading}
								onClick={() => {
									onDownload(model.name);
								}}
							>
								<span className={styles.modelInfo}>
									<span className={styles.modelName}>{model.name}</span>
									<span className={styles.modelSize}>{formatSize(model.sizeGb)} download</span>
								</span>
								<span className={styles.status}>
									{isDownloading ? (
										<>
											<span className={styles.spinner} />
											<span>{rowProgress?.percent ?? 0}%</span>
										</>
									) : isInstalled ? (
										<CheckIcon className={styles.checkIcon} />
									) : (
										<DownloadIcon className={styles.rowIcon} />
									)}
								</span>
							</button>
						);
					})}
				</div>

				{downloadProgress?.status === 'error' ? (
					<p className={styles.errorText}>{downloadProgress.error ?? 'Unable to download this model.'}</p>
				) : null}
			</details>

			<details className={styles.section}>
				<summary className={styles.header}>
					<span className={`${styles.headerIcon} ${styles.cloudIcon}`}>
						<CloudIcon className={styles.headerSvg} />
					</span>
					<span className={styles.headerText}>
						<span className={styles.title}>Cloud Connect</span>
						<span className={styles.subtitle}>API-based enterprise endpoints</span>
					</span>
					<ChevronDownIcon className={styles.chevronIcon} />
				</summary>

				<div className={styles.modelList}>
					{cloudModels.map((model) => (
						<div key={model.name} className={styles.cloudRow}>
							<span className={styles.modelName}>{model.name}</span>
							<span className={styles.modelSize}>Cloud endpoint</span>
						</div>
					))}
				</div>
			</details>
		</div>
	);
}

function formatSize(sizeGb: number | undefined): string {
	if (sizeGb === undefined) {
		return 'Cloud';
	}

	return `${sizeGb}GB`;
}
