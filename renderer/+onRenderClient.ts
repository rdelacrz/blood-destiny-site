// https://vike.dev/onRenderClient

import { createApp } from './app';
import { getPageTitle } from './getPageTitle';
import type { OnRenderClientAsync } from 'vike/types';

import './styles/global.scss';

let createAppProps: ReturnType<typeof createApp>;
const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  if (!createAppProps) {
    createAppProps = createApp(pageContext);
    const { app, store } = createAppProps;
    store.replaceState(pageContext.INITIAL_STATE);
    app.mount('#app');
  } else {
    const { app } = createAppProps;
    app.changePage(pageContext);
  }
  document.title = getPageTitle(pageContext);
}

export { onRenderClient }