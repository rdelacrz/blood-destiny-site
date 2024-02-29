// https://vike.dev/onRenderClient

import type { OnRenderClientAsync } from "vike/types";
import { config } from "@fortawesome/fontawesome-svg-core";
import { getPageTitle } from "@/utilities";
import { createApp } from "./app";

import "@/styles/global.scss";

let createAppProps: ReturnType<typeof createApp>;
const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  if (!createAppProps) {
    // First rendering/hydration
    
    createAppProps = createApp(pageContext);
    const { app } = createAppProps;
    
    // Disable the automatic insertion of CSS into the head of the document (it is already inserted on server-side)
    config.autoAddCss = false;

    app.mount("#app");
  } else {
    // Client-side navigation
    const { app } = createAppProps;
    await app.changePage(pageContext);
  }
  document.title = getPageTitle(pageContext);
}

export { onRenderClient }