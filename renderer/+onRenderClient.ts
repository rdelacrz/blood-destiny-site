// https://vike.dev/onRenderClient

import type { OnRenderClientAsync } from 'vike/types';
import { setVueQueryClientContext } from '@/contexts';
import { createApp } from './app';
import { getPageTitle } from './getPageTitle';

import './styles/global.scss';

let createAppProps: ReturnType<typeof createApp>;
const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  if (!createAppProps) {
    createAppProps = createApp(pageContext);
    const { app, store } = createAppProps;

    // Sets query client context with vueQueryState set via dehydrate method on server-side
    setVueQueryClientContext(app, pageContext.pageProps?.vueQueryState);

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