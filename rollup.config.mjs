import fs from 'node:fs';
import path from 'node:path';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';

function cssModules() {
	const cssById = new Map();

	return {
		name: 'devlocal-css-modules',
		resolveId(source, importer) {
			if (!source.endsWith('.css') || !importer) {
				return null;
			}

			return path.resolve(path.dirname(importer), source);
		},
		load(id) {
			if (!id.endsWith('.css')) {
				return null;
			}

			const css = fs.readFileSync(id, 'utf8');

			if (!id.endsWith('.module.css')) {
				cssById.set(id, css);
				return 'export default undefined;';
			}

			const classMap = createCssModuleClassMap(css, id);
			const scopedCss = scopeCssModuleClasses(css, classMap);
			cssById.set(id, scopedCss);

			return `export default ${JSON.stringify(classMap)};`;
		},
		generateBundle() {
			this.emitFile({
				type: 'asset',
				fileName: 'main.css',
				source: Array.from(cssById.values()).join('\n\n'),
			});
		},
	};
}

function createCssModuleClassMap(css, id) {
	const classNames = new Set();
	const classNamePattern = /\.([A-Za-z_][A-Za-z0-9_-]*)/g;
	let match;

	while ((match = classNamePattern.exec(css)) !== null) {
		classNames.add(match[1]);
	}

	const scopeName = getScopeName(id);

	return Object.fromEntries(
		Array.from(classNames).map((className) => [className, `${scopeName}_${className}`])
	);
}

function scopeCssModuleClasses(css, classMap) {
	return css.replace(/\.([A-Za-z_][A-Za-z0-9_-]*)/g, (match, className) => {
		return classMap[className] ? `.${classMap[className]}` : match;
	});
}

function getScopeName(id) {
	const relativePath = path.relative(process.cwd(), id).replace(/\\/g, '/');
	const withoutExtension = relativePath.replace(/\.module\.css$/, '');
	const readableName = withoutExtension.replace(/[^A-Za-z0-9_]/g, '_');
	const hash = hashString(relativePath);

	return `${readableName}_${hash}`;
}

function hashString(value) {
	let hash = 0;

	for (let index = 0; index < value.length; index += 1) {
		hash = (hash << 5) - hash + value.charCodeAt(index);
		hash |= 0;
	}

	return Math.abs(hash).toString(36);
}

export default {
	input: './src/webview/main.tsx',
	output: {
		file: './media/webview/main.js',
		format: 'iife',
		name: 'DevLocalAIWebview',
	},
	plugins: [
		url({
			include: ['**/*.svg'],
		}),
		cssModules(),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		nodeResolve({
			browser: true,
		}),
		commonjs(),
		typescript({
			tsconfig: false,
			jsx: 'react-jsx',
			lib: ['ES2022', 'DOM'],
			module: 'ESNext',
			moduleResolution: 'Bundler',
			target: 'ES2020',
		}),
	],
};
