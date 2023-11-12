import { createSSRApp, defineComponent, h, markRaw, reactive } from 'vue';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import PageShell from '@/layouts/PageShell.vue';
import { setPageContext } from '@/contexts';
import { createStore, storeKey } from '@/store';
import type { PageContext } from 'vike/types';
import type { Component, PageProps } from './types';

function createApp(pageContext: PageContext) {
  const { Page } = pageContext;

  /* Sets update main Page component with PageShell layout and pageProps */
  let rootComponent: Component & { Page: Component; pageProps: PageProps }
  const PageWithWrapper = defineComponent({
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageContext.pageProps || {})
    }),
    created() {
      rootComponent = this;
    },
    render() {
      return h(
        PageShell,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps)
          }
        }
      );
    }
  })

  const app = createSSRApp(PageWithWrapper);

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext);
      rootComponent.Page = markRaw(pageContext.Page);
      rootComponent.pageProps = markRaw(pageContext.pageProps || {});
    }
  })

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext);

  // Make `pageContext` accessible from any Vue component
  setPageContext(app, pageContextReactive);

  /* Adds Vuex data store to app */
  const store = createStore();
  app.use(store, storeKey);

  /* Adds perfect scrollbar */
  app.use(PerfectScrollbar);

  /* Adds VueQuery capabilities */
  const queryClient = new QueryClient();
  app.use(VueQueryPlugin, { queryClient });

  return { app, store };
}

// Same as `Object.assign()` but with type inference
function objectAssign<Obj extends object, ObjAddendum>(
  obj: Obj,
  objAddendum: ObjAddendum
): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum);
}

export { createApp }