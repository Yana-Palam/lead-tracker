import js from '@eslint/js'
import globals from 'globals'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
    {
        ignores: ['.next', 'dist', 'build', 'node_modules'],
    },
    js.configs.recommended,
    ...nextVitals,
    ...tseslint.configs.recommended,
    reactRefresh.configs.next,
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
            'react-refresh/only-export-components': 'off',
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
            eqeqeq: 'error',
        },
    },
    eslintConfigPrettier,
]

export default eslintConfig
