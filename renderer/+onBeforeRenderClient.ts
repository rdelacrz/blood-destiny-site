import type { PageContextClient } from "vike/types";
import { hydrate } from "@tanstack/vue-query";
import { createApp } from "./app";

export async function onBeforeRenderClient(pageContext: PageContextClient) {
  const { queryClient, store } = createApp(pageContext);

  // Hydrates queryClient with dehydrated vueQueryState from server-side
  hydrate(queryClient, pageContext.vueQueryState);

  // Sets the Vuex store's state to the initial one passed from server-side
  store.replaceState(pageContext.vuexInitialState);
}