import { aliases } from './vite.config.cjs';

const mapAliases = object.entries(aliases).map((entry) => entry);

module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'ES5',
		sourceType: 'module',
		extraFileExtensions: ['.svelte'],
	},
	ignorePatterns: ['node_modules/*', 'dist', 'examples', 'lib'],
	rules: {
		'prettier/prettier': ['error'],
		'no-param-reassign': ['error', { props: false }],
		'no-underscore-dangle': 0,
	},
	settings: {
		// import/resolver` 는 `eslint-plugin-import` 의 경로 설정 옵션
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
			alias: {
				map: mapAliases,
				extensions: ['.js', '.ts'],
			},
		},
	},
};
