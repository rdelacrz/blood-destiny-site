// https://vike.dev/onBeforeRender

import { DehydratedState, QueryClient, dehydrate } from '@tanstack/query-core';
import { renderToNodeStream } from '@vue/server-renderer'
import type { OnBeforeRenderAsync } from 'vike/types';
import { setQueryClientContext } from '@/contexts';
import { createApp } from '@/renderer/app';
import { getUpdatePosts } from './onGetUpdatePosts.telefunc';

const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const { app, store } = createApp(pageContext);
  
  const INITIAL_STATE = store.state;

  // Handles query (if any) using the fetchData export (see https://vike.dev/exports)
  let vueQueryState: DehydratedState = {
    mutations: [],
    queries: [],
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['getUpdatePosts'],
    queryFn: getUpdatePosts,
  });
  vueQueryState = dehydrate(queryClient);
  setQueryClientContext(app, vueQueryState);

  const htmlStream = renderToNodeStream(app);

  return {
    pageContext: {
      INITIAL_STATE,
      htmlStream,
      pageProps: {
        vueQueryState,
      },
    },
  }
}

export { onBeforeRender }