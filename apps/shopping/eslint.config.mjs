import vue from 'eslint-plugin-vue';
import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '../../eslint.config.mjs';
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  ...baseConfig,
  ...vue.configs['flat/recommended'],
  ...compat.extends('@vue/eslint-config-prettier/skip-formatting'),
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: (await import('@typescript-eslint/parser')).default,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      // Add or override other rules as needed
    },
  },
];
