
import { renderToNodeStream } from "@vue/server-renderer";
import type { PageContextServer } from "vike/types"
import { dehydrate, DehydratedState } from "@tanstack/vue-query";
import { createApp } from "./app";

export async function onBeforeRenderHtml(pageContext: PageContextServer) {
  const { app, pinia, queryClient } = createApp(pageContext);
  
  const htmlStream = renderToNodeStream(app);
  const piniaInitialState = pinia.state.value;
  let vueQueryState: DehydratedState | undefined = undefined;

  // Prefetches query data (if any queryFn is provided on page level)
  if (pageContext.config.queryFn) {
    await queryClient.prefetchQuery({
      queryKey: [pageContext.config.queryKey],
      queryFn: async () => {
        if (pageContext.config.queryFn) {
          return await pageContext.config.queryFn(pageContext.config.queryArgs);
        }
      },
    });
  
    vueQueryState = dehydrate(queryClient);
  }

  return {
    pageContext: {
      htmlStream,
      piniaInitialState,
      vueQueryState,
    }
  }
}