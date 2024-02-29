// https://vike.dev/onBeforeRender

import type { OnBeforeRenderAsync, PageContextClient } from "vike/types";
import { onBeforeRenderClient } from "./+onBeforeRenderClient";
import { onBeforeRenderHtml } from "./+onBeforeRenderHtml";

// Modified to run on both server and client-side
export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  // When run on the client-side
  if (pageContext.config.onBeforeRenderClient) {
    await onBeforeRenderClient(pageContext as PageContextClient);
  }

  // When run on the server-side
  if (pageContext.config.onBeforeRenderHtml) {
    return await onBeforeRenderHtml(pageContext);
  }
}