// https://vike.dev/onBeforeRender

import { App } from "vue";
import { renderToNodeStream } from "@vue/server-renderer";
import type { OnBeforeRenderAsync } from "vike/types"
import { dehydrate, DehydratedState } from "@tanstack/vue-query";
import { createApp } from "./app";

// Modified to run on both server and client-side
const renderToNodeStreamWithErrorHandling = (app: App) => {
  let returned = false;
  let err: unknown;
  /*app.config.errorHandler = (err_) => {
    if (returned) {
      console.error(err_);
    } else {
      err = err_;
    }
  }*/
  const appHtml = renderToNodeStream(app);
  returned = true;
  if (err) throw err;
  return appHtml;
}
  
export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const { app, pinia, queryClient } = createApp(pageContext);
  
  const htmlStream = renderToNodeStreamWithErrorHandling(app);
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
