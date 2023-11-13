// Allows access to Vue QueryClient data in other parts of the application

import { inject } from 'vue';
import type { App, InjectionKey } from 'vue';
import type { DehydratedState } from '@tanstack/vue-query';

const key: InjectionKey<DehydratedState | undefined> = Symbol('VUE_QUERY_STATE');

function useQueryClientContext() {
  return inject(key);
}

function setQueryClientContext(app: App, queryClientState: DehydratedState | undefined) {
  app.provide(key, queryClientState);
}

export { useQueryClientContext, setQueryClientContext };