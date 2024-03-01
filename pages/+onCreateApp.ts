import type { OnCreateAppSync } from "vike-vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { vuetify } from "./vuetify";

import "@/styles/global.scss";

export const onCreateApp: OnCreateAppSync = (pageContext): ReturnType<OnCreateAppSync> => {
  const { app } = pageContext;

  /* Adds Vuetify UI */
  app.use(vuetify);

  /* Adds VueQuery capabilities */
  const queryClient = new QueryClient();
  app.use(VueQueryPlugin, { queryClient });
  Object.assign(pageContext, { queryClient });
}