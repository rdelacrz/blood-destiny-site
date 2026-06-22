/// <reference types="vite/client" />

// Typed Vite client env. Only VITE_-prefixed vars are exposed to the bundle;
// every value here ships publicly, so it must never hold a secret/DB URL.
interface ImportMetaEnv {
  /** Base URL of the updates JSON endpoint. Empty → bundled seed fallback. */
  readonly VITE_UPDATES_API_URL?: string;
  /** Optional base URL prepended to relative cover-image paths. */
  readonly VITE_UPDATES_IMAGE_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
