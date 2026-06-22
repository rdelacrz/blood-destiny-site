# Contributing

## Comment conventions

Comments are standardized for consistency and tool-compatibility. The goal is to
explain intent and the non-obvious *why* — not to narrate what the code already says.

### TypeScript & Vue `<script>` (TSDoc)

- Document every consumer-facing surface (exported functions, classes, types,
  constants, and module overviews) with a `/** … */` block following
  [TSDoc](https://tsdoc.org).
- Do **not** put types in `@param` / `@returns` — the type system carries them.
- Do **not** add tags that duplicate a language keyword (`@private`, `@override`, …).
- Module overviews use `/** @fileoverview … */` (declared as a custom block tag in
  [`tsdoc.json`](tsdoc.json)).
- First line is a one-sentence summary; function descriptions start with a
  third-person verb ("Returns…", "Mounts…"). Bodies are Markdown.
- Implementation notes use `//` line comments — one space after `//`, capitalized,
  no trailing period on single-line notes, on their own line above the code. Stack
  multiple `//` lines for multi-line notes; no `/* … */` blocks, no ASCII banners.

### Plain JavaScript (`api/`, `scripts/`) — JSDoc

- Same as above, but **include types** in JSDoc tags since there is no static
  typing, e.g. `@param {object} req` and `@returns {Promise<void>}`.
- Module overviews use `/** @fileoverview … */`.

### Stylesheets

- **Plain CSS** ([`src/assets/main.css`](src/assets/main.css)) has only `/* … */`
  block comments (always spaced: `/* comment */`). Top-level sections use
  `/* ===== Title ===== */`; sub-sections use a plain `/* Label */`.
- **SCSS** (the `<style scoped lang="scss">` blocks in `.vue` files) uses `//` line
  comments for internal notes (they are stripped from compiled CSS). Banners follow
  `// ===== Title =====` (top-level) and `// Label` (sub-section).
- Comment the non-obvious: magic numbers, `z-index` choices, workarounds and the
  bug they address, browser/Vuetify/Tailwind quirks. Don't restate the property.

### Vue templates

- Use `<!-- … -->` (spaced). These are stripped from production builds, but treat
  them as public: no secrets or sensitive rationale.
- Keep them to structural landmarks (`<!-- LOADING — … -->`) and *why* a wrapper
  exists. Leave functional directives (e.g. `<!-- eslint-disable … -->`) untouched.
- Mark TODOs with the keyword + colon: `<!-- TODO: … -->`.

## Linting

Prettier is intentionally **not** used — `eslint-plugin-vue`'s rules in
[`eslint.config.js`](eslint.config.js) are the single source of truth for template
formatting.

```sh
npm run lint         # eslint --fix (TS/JS/Vue, incl. TSDoc & JSDoc syntax)
npm run lint:check   # eslint, no fixes
npm run lint:css     # stylelint comment rules (CSS + .vue <style>)
npm run lint:css:fix # stylelint --fix
```

Doc-comment syntax is validated by `eslint-plugin-tsdoc` (TS/Vue) and
`eslint-plugin-jsdoc` (`api/`, `scripts/`). Stylelint enforces comment whitespace,
non-empty comments, and blank-line-before in [`.stylelintrc.json`](.stylelintrc.json);
the full `stylelint-config-standard-scss` ruleset is installed and can be opted into
later as a separate formatting pass.
