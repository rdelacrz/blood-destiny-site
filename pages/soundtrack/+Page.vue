<template>
  <div class="pt-[150px] pb-20">
    <div class="relative text-center flex flex-col justify-center before:absolute before:block before:h-[300px] before:w-full
        before:bg-gradient-radial before:from-crimson before:from-1% before:to-70% before:opacity-40">
      <h2 class="relative text-6xl">Blood Destiny OST</h2>
    </div>
    <div class="relative text-lg text-center my-8">The official soundtrack of Blood Destiny, mostly produced by Doommaker</div>
    <div class="flex justify-center mb-10">
      <AppButton id="playSongBtn" @click="() => playSoundtrack()">Play</AppButton>
    </div>

    <table class="w-full text-left">
      <thead>
        <tr class="uppercase text-xl">
          <th class="py-2 border-b-2 border-white pl-9">Title</th>
          <th class="py-2 border-b-2 border-white">Artist</th>
          <th class="py-2 border-b-2 border-white">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in playlist" :key="index" @click="() => playSong(index)" 
          @keydown.enter="() => playSong(index)" tabindex="0"
          class="text-xl cursor-pointer hover:bg-white-hover"
        >
          <td class="py-4 border-b border-white pl-9">
            <div class="relative flex items-center">
              <img v-show="isActive && playlistIndex === index" :src="icons.voice" alt="Playing Icon" height="18" width="18"
                class="absolute left-[-25px]"
              />
              <button class="mr-4" @click="() => toggleFavorite(index)" 
                  @mouseover="() => setAllowPlayFlag(false)" @mouseout="() => setAllowPlayFlag(true)"
                  @focus="() => setAllowPlayFlag(false)" @blur="() => setAllowPlayFlag(true)">
                <img class="" :src="getFavoriteIcon(index)" alt="Heart Icon" height="15" width="17" />
              </button>
              <span class="">{{song.title}}</span>
            </div>
          </td>
          <td class="py-4 border-b border-white">{{song.artist}}</td>
          <td class="py-4 border-b border-white">{{song.length}}</td>
        </tr>
      </tbody>
    </table>

    <AudioPlayer
      v-model="songIndex" 
      :isActive="isActive"
      :songList="playlist" 
      @close="deactivateAudioPlayer" 
    />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { AudioModuleState, AudioModuleGetters, AudioModuleActions, AudioModuleMutations } from "@/store/modules";

import voice from "@/assets/images/icons/icon_voice.png";
import heart from "@/assets/images/icons/icon_heart.png";
import heartFilled from "@/assets/images/icons/icon_heart_filled.png";

export default defineComponent({
  name: "soundtrack",
  components: {
    AudioPlayer: defineAsyncComponent(() => import("@/components/AudioPlayer.vue")),
    AppButton: defineAsyncComponent(() => import("@/components/clickable-elements/AppButton.vue")),
  },
  setup() {
    const { useState, useMutations } = createNamespacedHelpers<
      AudioModuleState,
      AudioModuleGetters,
      AudioModuleActions,
      AudioModuleMutations
    >("AudioModule");

    const { isActive, playlist, playlistIndex } = useState(["isActive", "playlist", "playlistIndex"]);
    const { activateAudioPlayer, deactivateAudioPlayer, selectSong, toggleFavorite } = useMutations(
      ["activateAudioPlayer", "deactivateAudioPlayer", "toggleFavorite", "selectSong"]
    );

    return {
      isActive,
      playlist,
      playlistIndex,
      activateAudioPlayer,
      deactivateAudioPlayer,
      selectSong,
      toggleFavorite,
    };
  },
  data() {
    return {
      icons: {
        voice,
        heart,
        heartFilled,
      },
      allowPlay: true,    // Only false when focusing/clicking favorite button
    }
  },
  computed: {
    songIndex: {
      get() {
        return this.playlistIndex;
      },
      set(playlistIndex: number) {
        this.selectSong(playlistIndex);
      }
    },
  },
  methods: {
    playSoundtrack() {
      if (this.playlistIndex >= 0) {
        this.playSong(this.playlistIndex);
      } else {
        this.playSong(0);
      }
    },
    playSong(playlistIndex: number) {
      if (this.allowPlay) {
        this.activateAudioPlayer();
        this.selectSong(playlistIndex);
      }
    },
    getFavoriteIcon(playlistIndex: number) {
      if (this.playlist && playlistIndex < this.playlist.length) {
        const song = this.playlist[playlistIndex];
        return song.favorite ? this.$data.icons.heartFilled : this.$data.icons.heart;
      }
      return this.$data.icons.heart;
    },
    setAllowPlayFlag(allowPlay: boolean) {
      this.allowPlay = allowPlay;
    },
  },
});
</script>
