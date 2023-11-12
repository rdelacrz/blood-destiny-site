// https://vike.dev/onBeforeRender

import { renderToNodeStream } from '@vue/server-renderer'
import type { OnBeforeRenderAsync } from 'vike/types';
import { createApp } from './app'

const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const { app, store } = createApp(pageContext);
  
  const INITIAL_STATE = store.state;
  const htmlStream = renderToNodeStream(app);

  return {
    pageContext: {
      INITIAL_STATE,
      htmlStream
    }
  }
}

export { onBeforeRender }