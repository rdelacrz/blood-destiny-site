import type { OnBeforeMountAppAsync } from "vike-vue";
import { config } from "@fortawesome/fontawesome-svg-core";
import { hydrate } from "@tanstack/vue-query";
  
export const onBeforeMountApp: OnBeforeMountAppAsync = async (pageContext): ReturnType<OnBeforeMountAppAsync> => {
  const { queryClient, fromHtmlRenderer } = pageContext;

  // Disable the automatic insertion of CSS into the head of the document (it is already inserted on server-side)
  config.autoAddCss = false;

  // Hydrates queryClient with dehydrated vueQueryState from server-side
  if (fromHtmlRenderer?.vueQueryState) {
    hydrate(queryClient, fromHtmlRenderer.vueQueryState);
  }
}
