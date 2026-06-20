import pluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';
import tsdoc from 'eslint-plugin-tsdoc';
import jsdoc from 'eslint-plugin-jsdoc';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

/**
 * @fileoverview Flat ESLint config encoding the project's Vue 3 conventions:
 *
 * - template-above-script block order
 * - single-quote strings + semicolons in script
 * - one attribute per line once an element has more than one
 * - Vue's canonical attributes-order, PascalCase component tags
 * - arrow callbacks
 *
 * Prettier is intentionally NOT used, so the bespoke template formatting below
 * is the single source of truth.
 */
export default defineConfigWithVueTs(
  {
    name: 'app/ignores',
    ignores: ['dist/**', 'node_modules/**', '_design-export/**', 'public/**'],
  },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    name: 'app/rules',
    files: ['**/*.{ts,vue,js}'],
    plugins: { '@stylistic': stylistic },
    rules: {
      // Script style
      quotes: 'off',
      '@stylistic/quotes': ['error', 'single', { avoidEscape: false, allowTemplateLiterals: 'always' }],
      semi: 'off',
      '@stylistic/semi': ['error', 'always'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Single-file-component block order: template first
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],

      // Template formatting
      // One attribute per line as soon as an element has more than one.
      'vue/max-attributes-per-line': [
        'error',
        { singleline: { max: 1 }, multiline: { max: 1 } },
      ],
      // First attribute drops below the tag once the tag spans multiple lines.
      'vue/first-attribute-linebreak': [
        'error',
        { singleline: 'ignore', multiline: 'below' },
      ],
      // Multi-line (multi-attribute) tags drop the closing bracket onto its own
      // line, aligned with the opening '<'; single-attribute tags keep it inline.
      'vue/html-closing-bracket-newline': [
        'error',
        { singleline: 'never', multiline: 'always' },
      ],
      // Content + closing tag drop onto their own lines, including for
      // attribute-less elements (ignoreWhenNoAttributes: false). The rule's
      // default `ignores` is kept, so genuinely inline elements (span, a, code,
      // …) and whitespace-sensitive pre/textarea stay on one line.
      'vue/singleline-html-element-content-newline': [
        'error',
        { ignoreWhenNoAttributes: false, ignoreWhenEmpty: true },
      ],
      'vue/attributes-order': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': ['error', { ignores: ['App'] }],
    },
  },
  {
    // Validate TSDoc syntax in doc comments. `@fileoverview` is declared as a
    // custom block tag in tsdoc.json so the project's module overviews pass.
    name: 'app/tsdoc',
    files: ['**/*.ts', '**/*.vue'],
    plugins: { tsdoc },
    rules: {
      'tsdoc/syntax': 'warn',
    },
  },
  {
    // Plain-JS surfaces (Vercel function + dev scripts) carry JSDoc *with* types.
    // Validate what's present without forcing tags onto every function.
    name: 'app/jsdoc',
    files: ['api/**/*.js', 'scripts/**/*.mjs'],
    plugins: { jsdoc },
    // The project documents modules with @fileoverview (not JSDoc's default @file).
    settings: { jsdoc: { tagNamePreference: { file: 'fileoverview' } } },
    rules: {
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/check-tag-names': 'warn',
      'jsdoc/check-types': 'warn',
      'jsdoc/no-multi-asterisks': 'warn',
      'jsdoc/no-undefined-types': 'warn',
      'jsdoc/require-param-type': 'warn',
      'jsdoc/require-returns-type': 'warn',
    },
  },
);
