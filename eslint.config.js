import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import perfectionist from 'eslint-plugin-perfectionist'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '*.config.js', '*.config.ts', 'public'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      perfectionist,
      'jsx-a11y': jsxA11y,
    },

    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2023,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // ===== React 관련 규칙 =====
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // ===== JavaScript/TypeScript 품질 규칙 =====
      'prefer-const': 'warn',
      'no-var': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // ===== TypeScript 규칙 =====
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // ===== React 베스트 프랙티스 =====
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-boolean-value': 'warn',
      'react/jsx-fragments': 'warn',
      'react/jsx-no-useless-fragment': 'warn',

      // ===== 코드 품질 =====
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-duplicate-imports': 'off', // perfectionist가 처리

      // ===== Vite HMR =====
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ===== Perfectionist (import 자동 정렬) =====
      'perfectionist/sort-imports': [
        'warn',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-named-imports': [
        'warn',
        { type: 'natural', order: 'asc' },
      ],

      // ===== a11y (접근성) =====
      ...jsxA11y.configs.recommended.rules,
    },
  },

  prettier
)
