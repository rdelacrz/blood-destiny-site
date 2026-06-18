import pluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

/* Flat ESLint config encoding the project's Vue 3 conventions:
   - template-above-script block order
   - single-quote strings + semicolons in script
   - one attribute per line once an element has more than one
   - Vue's canonical attributes-order, PascalCase component tags
   - arrow callbacks. Prettier is intentionally NOT used so the bespoke
     template formatting below is the single source of truth. */
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
      /* ---- script style ---- */
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

      /* ---- single-file-component block order: template first ---- */
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],

      /* ---- template formatting ---- */
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
      // Closing bracket stays on the last attribute's line (not its own line).
      'vue/html-closing-bracket-newline': [
        'error',
        { singleline: 'never', multiline: 'never' },
      ],
      'vue/attributes-order': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': ['error', { ignores: ['App'] }],
    },
  },
);
