import { Pinia, StateTree } from "pinia";
import internal from "stream";
import type { QueryClient } from "@tanstack/vue-query";
import type { ComponentPublicInstance } from "vue";
import { Breadcrumb } from "@/models";
import { RootState } from "@/store";
import { App } from "vue";

type Component = ComponentPublicInstance; // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086

type Page = Component;

type VikeApp = App<Element> & {
  changePage: (pageContext: PageContext) => Promise<void>;
};

type PageContextWithoutExtras = PageContext & { 
  app: undefined,
  queryClient: undefined,
  pinia: undefined,
};

// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      htmlStream: internal.Readable;

      Page: Page;

      app: VikeApp;

      queryClient: QueryClient;

      pinia: Pinia;

      // Set by onBeforeRender
      fromBeforeRender: {
        piniaInitialState: Record<string, StateTree>,       // For Pinia
        vueQueryInitialState?: unknown;                    // For vue-query state
      };

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

        /** URL pointing to background image.  */
        backgroundUrl?: string;

        /** Generates breadcrumbs for the page. */
        getBreadcrumbs?: (pageContext: PageContext) => Breadcrumb[];
      }

      /** Title defined dynamically by onBeforeRender() */
      title?: string;

      abortReason?: string;
    }
  }
}

export { Component, PageContextWithoutExtras, VikeApp }