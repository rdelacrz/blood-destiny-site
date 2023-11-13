// https://vike.dev/onRenderClient

import type { OnRenderClientAsync } from 'vike/types';
import { setQueryClientContext } from '@/contexts';
import { config } from 'telefunc/client';
import { createApp } from './app';
import { getPageTitle } from './getPageTitle';

config.telefuncUrl = '/api/telefunc';

import './styles/global.scss';

let createAppProps: ReturnType<typeof createApp>;
const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  if (!createAppProps) {
    createAppProps = createApp(pageContext);
    const { app, store } = createAppProps;

    // Sets query client context with vueQueryState set via dehydrate method on server-side
    setQueryClientContext(app, pageContext.pageProps?.vueQueryState);

    // Sets the Vuex store's state to the initial one passed from server-side
    store.replaceState(pageContext.INITIAL_STATE);

    app.mount('#app');
  } else {
    const { app } = createAppProps;
    app.changePage(pageContext);
  }
  document.title = getPageTitle(pageContext);
}

export { onRenderClient }