import { Module } from 'vuex';
import { Song } from '@/models';
import RootState from '@/store/state';

import vincentVangloriaTheme from '@/assets/audio/vincent_vangloria_theme.mp3';
import ephemeralMemories from '@/assets/audio/ephemeral_memories.ogg';
import darkDays from '@/assets/audio/dark_days.ogg';
import calmBeforeTheStorm from '@/assets/audio/calm_before_the_storm.ogg';
import beginningOfTheEnd from '@/assets/audio/beginning_of_the_end.ogg';

export type AudioModuleState = {
  playlist: Song[];
  playlistIndex: number;
  isActive: boolean;
}

export type AudioModuleGetters = {
  currentSong: (state: AudioModuleState) => Song;
}

export type AudioModuleMutations = {
  activateAudioPlayer: (state: AudioModuleState) => void;
  toggleFavorite: (state: AudioModuleState, playlistIndex?: number) => void;
  selectPreviousSong: (state: AudioModuleState) => void;
  selectNextSong: (state: AudioModuleState) => void;
  selectRandomSong: (state: AudioModuleState) => void;
  selectSpecificSong: (state: AudioModuleState, playlistIndex: number) => void;
}

export type AudioModuleActions = { }

const state: AudioModuleState = {
  playlist: [
    {
      title: 'Vincent Vangloria\'s Theme',
      artist: 'Brian Redmond',
      length: '4:05',
      file: vincentVangloriaTheme,
      favorite: false,
    },
    {
      title: 'Ephemeral Memories',
      artist: 'Roger Delacruz',
      length: '2:42',
      file: ephemeralMemories,
      favorite: false,
    },
    {
      title: 'Dark Days',
      artist: 'Roger Delacruz',
      length: '3:20',
      file: darkDays,
      favorite: false,
    },
    {
      title: 'Calm Before the Storm',
      artist: 'Roger Delacruz',
      length: '1:40',
      file: calmBeforeTheStorm,
      favorite: false,
    },
    {
      title: 'Beginning of the End',
      artist: 'Roger Delacruz',
      length: '3:33',
      file: beginningOfTheEnd,
      favorite: false,
    },
  ],
  playlistIndex: 0,
  isActive: false,
}

const getters: AudioModuleGetters = {
  currentSong: (state) => {
    if (state.playlist && state.playlistIndex < state.playlist.length) {
      return state.playlist[state.playlistIndex];
    } else {
      return {title: '', artist: '', file: undefined, favorite: false, length: '0'};
    }
  }
}

const mutations: AudioModuleMutations = {
  activateAudioPlayer: state => {
    state.isActive = true;
  },
  toggleFavorite: (state, playlistIndex?: number) => {
    const playlistCopy = state.playlist ? state.playlist.slice() : [];   // Prop should not be directly modified

    if (playlistIndex === undefined) {
      playlistIndex = state.playlistIndex;   // Defaults to the current state's playlist index
    }

    // Most efficient way to locate and toggle favorite flag value for current song
    if (state.playlist && playlistIndex < state.playlist.length) {
      let updatedSong = state.playlist[playlistIndex];
      updatedSong = {...updatedSong, favorite: !updatedSong.favorite};
      playlistCopy.splice(playlistIndex, 1, updatedSong);
    }

    state.playlist = playlistCopy;
  },
  selectPreviousSong: state => {
    if (state.playlistIndex === 0) {
      state.playlistIndex = (state.playlist || []).length - 1;
    } else {
      state.playlistIndex--;
    }
  },
  selectNextSong: state => {
    if (state.playlistIndex === (state.playlist || []).length - 1) {
      state.playlistIndex = 0;
    } else {
      state.playlistIndex++;
    }
  },
  selectRandomSong: state => {
    state.playlistIndex = Math.floor(Math.random() * (state.playlist || []).length);
  },
  selectSpecificSong: (state, playlistIndex: number) => {
    state.playlistIndex = playlistIndex;
  },
}

const actions: AudioModuleActions = { }

export const AudioModule: Module<AudioModuleState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}