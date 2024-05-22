// https://vike.dev/onRenderClient
import type { OnRenderClientAsync, PageContextClient } from "vike/types";
import { config } from "@fortawesome/fontawesome-svg-core";
import { hydrate } from "@tanstack/vue-query";
import type { VikeApp } from "@/types/vike";
import { getPageTitle } from "@/utilities";
import { createApp } from "./app";

const onBeforeMount = (pageContext: PageContextClient) => {
  const { pinia, queryClient, fromBeforeRender } = pageContext;
  const { piniaInitialState, vueQueryInitialState } = fromBeforeRender;

  // Sets the Pinia store's state to the initial one passed from server-side
  pinia.state.value = piniaInitialState;

  // Hydrates queryClient with dehydrated vueQueryInitialState from server-side
  hydrate(queryClient, vueQueryInitialState);

  // Disable the automatic insertion of CSS into the head of the document (it is already inserted on server-side)
  config.autoAddCss = false;
}

let app: VikeApp;
const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  if (!app) {
    // First rendering/hydration
    app = createApp(pageContext);
    onBeforeMount(pageContext);
    app.mount("#app");
  } else {
    // Client-side navigation
    await app.changePage(pageContext);
  }
  document.title = getPageTitle(pageContext);
}

export { onRenderClient }