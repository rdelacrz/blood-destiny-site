import { createSSRApp, defineComponent, h, markRaw, reactive } from "vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query"
import PageShell from "@/layouts/PageShell.vue";
import { setPageContext } from "@/hooks";
import { createStore, storeKey } from "@/store";
import type { PageContext } from "vike/types";
import type { Component } from "@/types/vike";
import { objectAssign } from "@/utilities";
import { vuetify } from './vuetify';

function createApp(pageContext: PageContext) {
  const { Page } = pageContext;

  /* Sets update main Page component with PageShell layout */
  let rootComponent: Component & { Page: Component }
  const PageWithWrapper = defineComponent({
    data: () => ({
      Page: markRaw(Page),
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
            return h(this.Page)
          }
        }
      );
    }
  })

  const app = createSSRApp(PageWithWrapper);

  // We use `app.changePage()` to do Client Routing, see `+onRenderClient`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext);
      rootComponent.Page = markRaw(pageContext.Page);
    }
  });

  // When doing Client Routing, we mutate pageContext and therefore use a reactive pageContext
  const pageContextReactive = reactive(pageContext);

  // Make `pageContext` accessible from any Vue component
  setPageContext(app, pageContextReactive);

  /* Adds Vuex data store to app */
  const store = createStore();
  app.use(store, storeKey);

  /* Adds Vuetify UI */
  app.use(vuetify);

  /* Adds VueQuery capabilities */
  const queryClient = new QueryClient();
  app.use(VueQueryPlugin, { queryClient });

  return { app, store, queryClient };
}

export { createApp }