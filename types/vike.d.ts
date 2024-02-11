import internal from 'stream';
import type { DehydratedState } from '@tanstack/vue-query';
import type { ComponentPublicInstance } from 'vue';
import { Breadcrumb } from "@/models";
import { RootState } from '@/store';

type Component = ComponentPublicInstance; // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086

type Page = Component;

// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      vuexInitialState: RootState,        // For Vuex
      vueQueryState?: DehydratedState;    // For vue-query state
      htmlStream: internal.Readable;
      Page: Page;

      config: {
        /** Flag for whether onBeforeRenderHtml hook is to be used (server-side only) */
        onBeforeRenderHtml: boolean;

        /** Flag for whether onBeforeRenderClient hook is to be used (client-side only) */
        onBeforeRenderClient: boolean;

        /** Title defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js) */
        title?: string;

        /** Shorthand title used within page itself (as opposed to the `title` used to set the title value within the head section of the HTML). */
        pageTitle?: string;

        /** Description of a given page. */
        pageDescription?: string;

        /** Background image class of a given page. */
        pageBackgroundClass?: any;

        /** Generates breadcrumbs for the page. */
        getBreadcrumbs?: (pageContext: PageContext) => Breadcrumb[];

        /** Function used to query data in VueQuery */
        queryFn?: <T>(...args: any[]) => Promise<T[]>;

        /** Arguments passed to queryFn (if any) */
        queryArgs?: any[];

        /** Key used for query in VueQuery */
        queryKey?: string;
      }

      /** Title defined dynamically by onBeforeRender() */
      title?: string;

      abortReason?: string;
    }
  }
}

export { Component }