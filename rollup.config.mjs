import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';

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
