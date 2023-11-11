declare module '*.vue' {
  const Component: any
  export default Component
}
declare module '*.svg' {
  const imageUrl: string
  export default imageUrl
}

// Vite-specific
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly POSTGRES_URL: string;
  readonly POSTGRES_PRISMA_URL: string;
  readonly POSTGRES_URL_NON_POOLING: string;
  readonly POSTGRES_USER: string;
  readonly POSTGRES_HOST: string;
  readonly POSTGRES_PASSWORD: string;
  readonly POSTGRES_DATABASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}