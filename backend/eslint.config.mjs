// @ts-check

import eslint from '@eslint/js';
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const eslintConfig = [
	{
		ignores: ['eslint.config.mjs'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			sourceType: 'commonjs',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: __dirname,
			},
		},
	},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser,
		},
		rules: {
			curly: ['error', 'all'],
			'padding-line-between-statements': [
				'error',
				{
					blankLine: 'never',
					prev: ['const', 'let', 'var'],
					next: ['const', 'let', 'var'],
				},
				{
					blankLine: 'always',
					prev: ['const', 'let', 'var'],
					next: ['if', 'block-like', 'multiline-block-like', 'expression', 'return'],
				},
				{
					blankLine: 'always',
					prev: '*',
					next: ['multiline-const', 'multiline-let', 'multiline-var'],
				},
				{
					blankLine: 'always',
					prev: ['multiline-const', 'multiline-let', 'multiline-var'],
					next: '*',
				},
				{ blankLine: 'always', prev: ['block-like', 'multiline-block-like'], next: '*' },
				{ blankLine: 'always', prev: '*', next: 'return' },
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
				},
			],
			'@typescript-eslint/explicit-function-return-type': [
				'warn',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
				},
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unsafe-call': 'off',
			eqeqeq: 'error',
		},
	},
	eslintConfigPrettier,
]

export default eslintConfig