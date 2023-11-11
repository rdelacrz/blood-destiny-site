import { Module } from 'vuex';
import { Update } from '@/models';
import RootState from '@/store/state';

import PLACEHOLDER from '@/assets/images/graphics/updates/update_cover.jpg';

export interface UpdatesModuleState {
  updates: Update[];
}

export const UpdatesModule: Module<UpdatesModuleState, RootState> = {
  namespaced: true,
  state: {
    updates: [
      {
        title: 'Project Update #4',
        date: new Date('2019-11-19'),
        description: '<p>The dialogue is mostly written now! :)</p><p>More updates soon!</p>',
        updateCover: PLACEHOLDER,
      },
      {
        title: 'Project Update #3',
        date: new Date('2019-11-18'),
        description: '<p>More of the website has been built!</p>',
        updateCover: PLACEHOLDER,
      },
      {
        title: 'Project Update #2',
        date: new Date('2019-11-12'),
        description: '<p>Some soundtrack has been composed!</p>',
        updateCover: PLACEHOLDER,
      },
      {
        title: 'Project Update #1',
        date: new Date('2019-11-10'),
        description: `<p>We've started on the project!</p>`,
        updateCover: PLACEHOLDER,
      }
    ],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}