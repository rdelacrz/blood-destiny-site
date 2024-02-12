import { defineStore } from "pinia";
import { Song } from "@/models";

import ephemeralMemories from "@/assets/audio/ephemeral_memories.mp3";
import darkDays from "@/assets/audio/dark_days.mp3";
import endOfTheDream from "@/assets/audio/end_of_the_dream.mp3";
import calmBeforeTheStorm from "@/assets/audio/calm_before_the_storm.mp3";
import justAnOrdinaryDay from "@/assets/audio/just_an_ordinary_day.mp3";
import shiftingShoreline from "@/assets/audio/shifting_shoreline.mp3";
import theColdNight from "@/assets/audio/the_cold_night.mp3";
import beginningOfTheEnd from "@/assets/audio/beginning_of_the_end.mp3";
import farewell from "@/assets/audio/farewell.mp3";
import vincentVangloriaTheme from "@/assets/audio/vincent_vangloria_theme.mp3";

export type AudioState = {
  songs: Song[];
  songIndex: number;
  isActive: boolean;
}

export type AudioGetters = {
  getCurrentSong: () => Song | undefined;
}

export type AudioActions = {
  activateAudioPlayer: () => void;
  deactivateAudioPlayer: () => void;
  toggleFavorite: (songIndex?: number) => void;
  selectSong: (songIndex: number) => void;
}

export const useAudioStore = defineStore<string, AudioState, AudioGetters, AudioActions>("audio", {
  state: () => ({
    songs: [
      {
        title: "Ephemeral Memories",
        artist: "Doommaker",
        length: "2:42",
        file: ephemeralMemories,
        favorite: false,
      },
      {
        title: "Dark Days",
        artist: "Doommaker",
        length: "3:20",
        file: darkDays,
        favorite: false,
      },
      {
        title: "Calm Before the Storm",
        artist: "Doommaker",
        length: "1:40",
        file: calmBeforeTheStorm,
        favorite: false,
      },
      {
        title: "Just An Ordinary Day",
        artist: "Doommaker",
        length: "0:44",
        file: justAnOrdinaryDay,
        favorite: false,
      },
      {
        title: "End Of The Dream",
        artist: "Doommaker",
        length: "1:49",
        file: endOfTheDream,
        favorite: false,
      },
      {
        title: "Shifting Shoreline",
        artist: "Doommaker",
        length: "0:54",
        file: shiftingShoreline,
        favorite: false,
      },
      {
        title: "Calm Before The Storm",
        artist: "Doommaker",
        length: "1:40",
        file: calmBeforeTheStorm,
        favorite: false,
      },
      {
        title: "The Cold Night",
        artist: "Doommaker",
        length: "2:20",
        file: theColdNight,
        favorite: false,
      },
      {
        title: "Beginning of the End",
        artist: "Doommaker",
        length: "3:33",
        file: beginningOfTheEnd,
        favorite: false,
      },
      {
        title: "Farewell",
        artist: "BigRicePiano",
        length: "3:16",
        file: farewell,
        favorite: false,
      },
      {
        title: "Vincent Vangloria's Theme",
        artist: "Brian R.",
        length: "4:05",
        file: vincentVangloriaTheme,
        favorite: false,
      },
    ],
    songIndex: -1,
    isActive: false,
  }),
  getters: {
    getCurrentSong() {
      if (this.songIndex >= 0 && this.songIndex < (this.songs || []).length) {
        return this.songs[this.songIndex];
      } else {
        return undefined;
      }
    },
  },
  actions: {
    activateAudioPlayer() {
      this.isActive = true;
    },
    deactivateAudioPlayer() {
      this.isActive = false;
    },
    toggleFavorite(songIndex?: number) {
      const songCopy = this.songs ? this.songs.slice() : [];   // Prop should not be directly modified
  
      if (songIndex === undefined) {
        songIndex = this.songIndex;   // Defaults to the current state's song index
      }
  
      // Most efficient way to locate and toggle favorite flag value for current song
      if (this.songs && songIndex < this.songs.length) {
        let updatedSong = this.songs[songIndex];
        updatedSong = {...updatedSong, favorite: !updatedSong.favorite};
        songCopy.splice(songIndex, 1, updatedSong);
      }
  
      this.songs = songCopy;
    },
    selectSong(songIndex: number) {
      this.songIndex = songIndex;
    }
  }
});