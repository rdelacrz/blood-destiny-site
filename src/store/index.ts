import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import RootState from './state';
import { AudioModule, CharactersModule, ContactModule, UpdatesModule } from './modules';
import { AlertParam } from '@/models';

export const store = createStore<RootState>({
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

export const storeKey: InjectionKey<Store<RootState>> = Symbol();

export const useStore = () => {
  return baseUseStore(storeKey);
}

export default store;
