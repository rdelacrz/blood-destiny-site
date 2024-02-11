import { InjectionKey } from 'vue';
import { createStore as baseCreateStore, Store, useStore as baseUseStore } from 'vuex';
import { AudioModule } from './modules';
import { AlertParam } from '@/models';

export interface RootState {
  popupParam: AlertParam | null;
}

export const createStore = () => {
  const store = baseCreateStore<RootState>({
    state: {
      popupParam: null,
    },
    mutations: {
      setPopupState: (state, popupParam?: AlertParam) => {
        state.popupParam = popupParam ? {...popupParam} : null;
      },
    },
    actions: {
  
    },
    modules: {
      AudioModule,
    },
  });

  return store;
}

export const storeKey: InjectionKey<Store<RootState>> = Symbol("VUEX_STATE");

export const useStore = () => {
  return baseUseStore(storeKey);
}

