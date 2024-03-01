import type { OnAfterRenderSSRAppAsync } from "vike-vue"
import { dehydrate, DehydratedState } from "@tanstack/vue-query";
  
export const onAfterRenderSSRApp: OnAfterRenderSSRAppAsync = async (pageContext): ReturnType<OnAfterRenderSSRAppAsync> => {
  const { queryClient } = pageContext;
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
    vueQueryState,
  }
}
