// https://vike.dev/onBeforeRender
import type { OnBeforeRenderAsync } from "vike/types"
import { dehydrate } from "@tanstack/vue-query";
import { renderToNodeStream } from "@vue/server-renderer";
import { createApp } from "./app";

// Modified to run on both server and client-side
export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const app = createApp(pageContext);
  const htmlStream = renderToNodeStream(app);
  const { pinia, queryClient } = pageContext;

  return {
    pageContext: {
      htmlStream,
      fromBeforeRender: {
        piniaInitialState: pinia.state.value,
        vueQueryState: { toJSON: () => dehydrate(queryClient) },
      },
    }
  }
}