module.exports = {
  parser: '@babel/eslint-parser',
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
  plugins: ['import', 'html', 'prettier'],
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
    'no-underscore-dangle': 'off', // var _foo;
    'no-unused-vars': 'off',
    'max-classes-per-file': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    'no-restricted-syntax': ['off', 'ForOfStatement'], // disallow specified syntax(ex. WithStatement)
    'import/prefer-default-export': 'off',
    'import/extensions': ['off'],
    'prettier/prettier': 'error',
  },
};
