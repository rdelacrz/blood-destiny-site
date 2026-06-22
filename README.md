# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Updates feed & deployment

The Updates timeline (`/#/updates`) renders live devlog entries fetched from a
JSON endpoint configured by `VITE_UPDATES_API_URL` (build-time inlined). With no
endpoint it falls back to the bundled seed entries in `src/data/updates.ts`.

Per-mode defaults are committed, so it works out of the box:

| Mode | `VITE_UPDATES_API_URL` | Source |
| --- | --- | --- |
| `.env.development` | `http://localhost:8787/updates` | local shim (`scripts/updates-proxy.mjs`) |
| `.env.production` | `/api/updates` | same-origin serverless function (`api/updates.js`) |

### Local dev

```bash
npm run updates:proxy   # terminal 1 — relays the live deploy as CORS JSON on :8787
npm run dev             # terminal 2 — SPA reads the shim
```

Skip the proxy to develop against the seed entries (the feed just shows the
error state with a Retry until the shim is up — or blank `VITE_UPDATES_API_URL`
in a local `.env.development.local` to force the seed fallback).

### Production (Vercel)

`api/updates.js` is a serverless function that runs the Postgres query and
serves the feed same-origin at `/api/updates` (no CORS needed). One setup step:

1. **Attach Postgres** to the Vercel project so the function can read
   `POSTGRES_URL` — Dashboard → Storage → your Postgres store → **Connect
   Project** (or `vercel env add POSTGRES_URL`). This is a **server-side secret**
   — never a `VITE_` var, never in the client bundle.
2. Deploy. The SPA calls `/api/updates` on its own origin.

To run the real function locally instead of the shim:
`vercel env pull .env.local` then `vercel dev`.

> `VITE_*` values are inlined at **build** time, so changing the endpoint
> requires a rebuild/redeploy.
