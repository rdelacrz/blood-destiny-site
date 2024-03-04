import { createSSRApp, defineComponent, h, markRaw, nextTick, reactive } from "vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query"
import { createPinia } from "pinia";
import PageShell from "@/layouts/PageShell.vue";
import { setPageContext } from "@/hooks";
import type { Config, PageContext } from "vike/types";
import type { Component, PageContextWithoutExtras } from "@/types/vike";
import { objectAssign } from "@/utilities";
import { vuetify } from './vuetify';

function createApp(pageContext: PageContext) {
  const { Page } = pageContext;

  /* Sets update main Page component with PageShell layout */
  let rootComponent: Component & { Page: Component, config: Config };
  const PageWithWrapper = defineComponent({
    data: () => ({
      Page: markRaw(Page),
      config: markRaw(pageContext.config),
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
    changePage: async (pageContext: PageContext) => {
      let returned = false;
      let err: unknown;
      app.config.errorHandler = (err_) => {
        if (returned) {
          console.error(err_);
        } else {
          err = err_;
        }
      }
      Object.assign(pageContextReactive, pageContext);
      rootComponent.Page = markRaw(pageContext.Page);
      rootComponent.config = markRaw(pageContext.config);
      //await nextTick();
      returned = true;
      if (err) throw err;
    }
  });

  // When doing Client Routing, we mutate pageContext and therefore use a reactive pageContext
  const pageContextReactive = reactive(pageContext as PageContextWithoutExtras);

  // Make `pageContext` accessible from any Vue component
  setPageContext(app, pageContextReactive);

  // Makes app object accessible in page context
  objectAssign(pageContext, { app });

  /* Adds Pinia data store to app */
  const pinia = createPinia();
  app.use(pinia);
  objectAssign(pageContext, { pinia });

  /* Adds Vuetify UI */
  app.use(vuetify);

  /* Adds VueQuery capabilities */
  const queryClient = new QueryClient();
  app.use(VueQueryPlugin, { queryClient });
  objectAssign(pageContext, { queryClient });

  return app;
}

export { createApp }