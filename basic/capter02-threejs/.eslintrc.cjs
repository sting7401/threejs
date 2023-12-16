module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	ignorePatterns: ['node_modules/*', 'dist', 'examples', 'lib'],
	rules: {
		'prettier/prettier': ['error'],
		'no-param-reassign': ['error', { props: false }],
		'no-underscore-dangle': 0,
	},
};
