import type { Config } from "vike/types";
import { onHydrationEnd, onPageTransitionStart, onPageTransitionEnd } from "./onPageTransitionHooks";

// https://vike.dev/config
export default {
  passToClient: ["title", "routeParams",  "piniaInitialState", "vueQueryState"],
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
    queryFn: {
      env: { server: true },   // Backend queryFn should not be exposed to client side
    },
    queryKey: {
      env: { server: true, client: true },
    },
  }
} satisfies Config
