import { Module } from 'vuex';
import { Update } from '@/models';
import RootState from '@/store/state';

import PLACEHOLDER from '@/assets/images/graphics/updates/update_cover.png';

export interface UpdatesModuleState {
  updates: Update[];
}

export const UpdatesModule: Module<UpdatesModuleState, RootState> = {
  namespaced: true,
  state: {
    updates: [
      {
        postId: 4,
        title: 'Project Update #4',
        date: new Date('2019-11-19'),
        description: '<p>The dialogue is mostly written now! :)</p><p>More updates soon!</p>',
        coverImage: PLACEHOLDER,
      },
      {
        postId: 3,
        title: 'Project Update #3',
        date: new Date('2019-11-18'),
        description: '<p>More of the website has been built!</p>',
        coverImage: PLACEHOLDER,
      },
      {
        postId: 2,
        title: 'Project Update #2',
        date: new Date('2019-11-12'),
        description: '<p>Some soundtrack has been composed!</p>',
        coverImage: PLACEHOLDER,
      },
      {
        postId: 1,
        title: 'Project Update #1',
        date: new Date('2019-11-10'),
        description: `<p>We've started on the project!</p>`,
        coverImage: PLACEHOLDER,
      }
    ],
  },
  getters: {
  },
  mutations: {
    setUpdates(state, updates: Update[]) {
      state.updates = updates;    // Assumed to be new set of data every time it is invoked
    }
  },
  actions: {
  }
}