// https://vike.dev/onRenderClient

import { config } from "@fortawesome/fontawesome-svg-core";
import { hydrate } from "@tanstack/vue-query";
import type { OnRenderClientAsync, PageContext } from "vike/types";
import { getPageTitle } from "@/utilities";
import { createApp } from "./app";

import "@/styles/global.scss";


let createAppProps: ReturnType<typeof createApp>;

const onBeforeMount = ({ pinia, queryClient }: ReturnType<typeof createApp>, pageContext: PageContext) => {
  // Disable the automatic insertion of CSS into the head of the document (it is already inserted on server-side)
  config.autoAddCss = false;

  // Hydrates queryClient with dehydrated vueQueryState from server-side
  hydrate(queryClient, pageContext.vueQueryState);

  // Sets the Pinia store's state to the initial one passed from server-side
  pinia.state.value = pageContext.piniaInitialState;
}

export const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  if (!createAppProps) {
    // First rendering/hydration
    createAppProps = createApp(pageContext);
    onBeforeMount(createAppProps, pageContext);
    const { app } = createAppProps;
    app.mount("#app");
  } else {
    // Client-side navigation
    const { app } = createAppProps;
    await app.changePage(pageContext);
  }
  document.title = getPageTitle(pageContext);
}