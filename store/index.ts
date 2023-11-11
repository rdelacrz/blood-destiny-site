import { InjectionKey } from 'vue';
import { createStore as baseCreateStore, Store, useStore as baseUseStore } from 'vuex';
import RootState from './state';
import { AudioModule, CharactersModule, ContactModule, UpdatesModule } from './modules';
import { AlertParam } from '@/models';

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
      CharactersModule,
      ContactModule,
      UpdatesModule,
    },
  });

  return store;
}

export const storeKey: InjectionKey<Store<RootState>> = Symbol();

export const useStore = () => {
  return baseUseStore(storeKey);
}

