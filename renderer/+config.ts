import type { Config } from "vike/types";

// https://vike.dev/config#pointer-imports
const onHydrationEnd = 'import:./onPageTransitionHooks.ts:onHydrationEnd';
const onPageTransitionStart = 'import:./onPageTransitionHooks.ts:onPageTransitionStart';
const onPageTransitionEnd = 'import:./onPageTransitionHooks.ts:onPageTransitionEnd';

// https://vike.dev/config
export default {
  passToClient: ["title", "routeParams", "fromBeforeRender"],
  clientRouting: true,
  hydrationCanBeAborted: true,
  prefetchStaticAssets: "viewport",   // https://vike.dev/clientRouting#link-prefetching
  onHydrationEnd,
  onPageTransitionStart,
  onPageTransitionEnd,
  // https://vike.dev/meta
  meta: {
    title: {
      env: { server: true, client: true },
    },
    pageTitle: {
      env: { server: true, client: true },
    },
    pageDescription: {
      env: { server: true, client: true },
    },
    pageBackgroundClass: {
      env: { server: true, client: true },
    },
    getBreadcrumbs: {
      env: { server: true, client: true },
    },
  }
} satisfies Config
