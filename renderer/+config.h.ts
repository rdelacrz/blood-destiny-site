import type { Config } from 'vike/types'
import { onHydrationEnd, onPageTransitionStart, onPageTransitionEnd } from './onPageTransitionHooks'

// https://vike.dev/config
export default {
  passToClient: ['INITIAL_STATE', 'pageProps', 'title'],
  clientRouting: true,
  prefetchStaticAssets: 'viewport',   // https://vike.dev/clientRouting#link-prefetching
  onHydrationEnd,
  onPageTransitionStart,
  onPageTransitionEnd,
  // https://vike.dev/meta
  meta: {
    // Create new config 'title'
    title: {
      env: 'server-and-client'
    },
  }
} satisfies Config
