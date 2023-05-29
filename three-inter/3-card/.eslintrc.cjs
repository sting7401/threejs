module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['aribnb', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error', // prettier 의 포맷팅 에러를 lint 에러 리포팅으로 볼 수 있도록 하는 규칙
	},
};
