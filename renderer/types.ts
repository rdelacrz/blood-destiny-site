import internal from 'stream';
import type { DehydratedState } from '@tanstack/vue-query';
import type { ComponentPublicInstance } from 'vue';
import { RootState } from '@/store/state';

type Component = ComponentPublicInstance; // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086

type Page = Component;
interface PageProps extends Record<string, unknown> {
  vueQueryState?: DehydratedState;
}

// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      INITIAL_STATE: RootState,   // For Vuex
      htmlStream: internal.Readable;
      Page: Page;
      pageProps?: PageProps;
      config: {
        /** Title defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js) */
        title?: string;
      }
      /** Title defined dynamically by onBeforeRender() */
      title?: string;
      abortReason?: string;
    }
  }

}
export { Component, PageProps }