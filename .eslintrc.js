module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		ecmaFeatures: {},
		babelOptions: {
			plugins: [
				'@babel/plugin-proposal-function-bind',
				['@babel/plugin-proposal-pipeline-operator', { proposal: 'fsharp' }],
			],
		},
	},
	rules: {
		'no-undef': 2,
		'no-var': 1,
		'no-console': 1,
		semi: 0,
		'no-unused-vars': 'warn',
		'no-dupe-keys': 'warn',
	},
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es6: true,
		es2017: true,
		es2020: true,
		es2021: true,
	},
}
