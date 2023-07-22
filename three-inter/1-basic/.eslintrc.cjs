module.exports = {
	parserOptions: {
		ecmaVersion: 'latest',
		requireConfigFile: 'false',
	},
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es2021: true,
	},
	globals: { _: true },
	plugins: ['import', 'prettier'],
	extends: [
		'airbnb-base',
		'eslint:recommended',
		'plugin:prettier/recommended',
		// "react-app"
	],
	ignorePatterns: ['node_modules/*', 'dist', 'examples', 'lib'],
	rules: {
		// "off" or 0 - turn the rule off
		'no-console': 'warn',
		'no-unused-vars': 'off',
		'max-classes-per-file': 'off',
		'no-restricted-syntax': ['off', 'ForOfStatement'], // disallow specified syntax(ex. WithStatement)
	},
};
