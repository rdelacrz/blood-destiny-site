import { Module } from 'vuex';
import { Song } from '@/models';
import { RootState } from '@/store';

import ephemeralMemories from '@/assets/audio/ephemeral_memories.mp3';
import darkDays from '@/assets/audio/dark_days.mp3';
import endOfTheDream from '@/assets/audio/end_of_the_dream.mp3';
import calmBeforeTheStorm from '@/assets/audio/calm_before_the_storm.mp3';
import justAnOrdinaryDay from '@/assets/audio/just_an_ordinary_day.mp3';
import shiftingShoreline from '@/assets/audio/shifting_shoreline.mp3';
import theColdNight from '@/assets/audio/the_cold_night.mp3';
import beginningOfTheEnd from '@/assets/audio/beginning_of_the_end.mp3';
import farewell from '@/assets/audio/farewell.mp3';
import vincentVangloriaTheme from '@/assets/audio/vincent_vangloria_theme.mp3';

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
  deactivateAudioPlayer: (state: AudioModuleState) => void;
  toggleFavorite: (state: AudioModuleState, playlistIndex?: number) => void;
  selectSong: (state: AudioModuleState, playlistIndex: number) => void;
}

export type AudioModuleActions = { }

const state: AudioModuleState = {
  playlist: [
    {
      title: 'Ephemeral Memories',
      artist: 'Doommaker',
      length: '2:42',
      file: ephemeralMemories,
      favorite: false,
    },
    {
      title: 'Dark Days',
      artist: 'Doommaker',
      length: '3:20',
      file: darkDays,
      favorite: false,
    },
    {
      title: 'Calm Before the Storm',
      artist: 'Doommaker',
      length: '1:40',
      file: calmBeforeTheStorm,
      favorite: false,
    },
    {
      title: 'Just An Ordinary Day',
      artist: 'Doommaker',
      length: '0:44',
      file: justAnOrdinaryDay,
      favorite: false,
    },
    {
      title: 'End Of The Dream',
      artist: 'Doommaker',
      length: '1:49',
      file: endOfTheDream,
      favorite: false,
    },
    {
      title: 'Shifting Shoreline',
      artist: 'Doommaker',
      length: '0:54',
      file: shiftingShoreline,
      favorite: false,
    },
    {
      title: 'Calm Before The Storm',
      artist: 'Doommaker',
      length: '1:40',
      file: calmBeforeTheStorm,
      favorite: false,
    },
    {
      title: 'The Cold Night',
      artist: 'Doommaker',
      length: '2:20',
      file: theColdNight,
      favorite: false,
    },
    {
      title: 'Beginning of the End',
      artist: 'Doommaker',
      length: '3:33',
      file: beginningOfTheEnd,
      favorite: false,
    },
    {
      title: 'Farewell',
      artist: 'BigRicePiano',
      length: '3:16',
      file: farewell,
      favorite: false,
    },
    {
      title: 'Vincent Vangloria\'s Theme',
      artist: 'Brian R.',
      length: '4:05',
      file: vincentVangloriaTheme,
      favorite: false,
    },
  ],
  playlistIndex: -1,
  isActive: false,
}

const getters: AudioModuleGetters = {
  currentSong: (state) => {
    if (state.playlist && state.playlistIndex >= 0 && state.playlistIndex < state.playlist.length) {
      return state.playlist[state.playlistIndex];
    } else {
      return {title: '', artist: '', file: undefined, favorite: false, length: '0:00'};
    }
  }
}

const mutations: AudioModuleMutations = {
  activateAudioPlayer: state => {
    state.isActive = true;
  },
  deactivateAudioPlayer: state => {
    state.isActive = false;
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
  selectSong: (state, playlistIndex: number) => {
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