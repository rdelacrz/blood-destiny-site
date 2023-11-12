import { InjectionKey } from 'vue';
import { createStore as baseCreateStore, Store, useStore as baseUseStore } from 'vuex';
import RootState, { VueQueryData } from './state';
import { AudioModule, CharactersModule, ContactModule } from './modules';
import { AlertParam } from '@/models';

export const createStore = () => {
  const store = baseCreateStore<RootState>({
    state: {
      popupParam: null,
      vueQueryData: {
        updates: [],
      },
    },
    mutations: {
      setPopupState: (state, popupParam?: AlertParam) => {
        state.popupParam = popupParam ? {...popupParam} : null;
      },
      setVueQueryData: (state, vueQueryData: VueQueryData) => {
        state.vueQueryData = vueQueryData;
      },
    },
    actions: {
  
    },
    modules: {
      AudioModule,
      CharactersModule,
      ContactModule,
    },
  });

  return store;
}

export const storeKey: InjectionKey<Store<RootState>> = Symbol();

export const useStore = () => {
  return baseUseStore(storeKey);
}

