// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

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
    ignores: [
      'dist',
      'node_modules',
      '*.config.js',
      '*.config.ts',
      'public',
      '.storybook',
      'vitest.shims.d.ts',
    ],
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
      '@typescript-eslint/no-explicit-any': 'error', // any 금지 (error로 강화)
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // enum 금지 (as const 사용)
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'enum 대신 as const를 사용하세요.',
        },
      ],

      // 타입/인터페이스 네이밍 규칙 (PascalCase)
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'typeProperty',
          format: ['camelCase', 'snake_case'],
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'should', 'can'],
        },
      ],

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
      'no-duplicate-imports': 'off',

      // 주석 뒤 띄어쓰기
      'spaced-comment': [
        'warn',
        'always',
        {
          markers: ['/'],
          exceptions: ['-', '+', '*'],
        },
      ],

      // return 전 빈 줄
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],

      // 화살표 함수 사용 권장
      'prefer-arrow-callback': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],

      // 중괄호 항상 사용
      curly: ['error', 'all'],

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
  prettier,
  storybook.configs['flat/recommended']
)
