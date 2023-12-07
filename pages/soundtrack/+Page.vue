<template>
  <div class='soundtrack-wrapper container'>
    <div class='playlist-details-wrapper'>
      <img class='album-cover' :src='albumCover' alt='Blood Destiny Album Cover' height='200' width='200' />
      <div class='playlist-description-container'>
        <div class='playlist-text'>Playlist</div>
        <div class='album-title'>Blood Destiny OST</div>
        <div class='album-description'>The official soundtrack of Blood Destiny, mostly produced by Doommaker</div>
        <AppButton id='playSoundtrackBtn' :backgroundSrc='playButtonBackground' @click='() => playSoundtrack()'>Play</AppButton>
      </div>
    </div>

    <table class='playlist-table-content-wrapper'>
      <thead>
        <tr>
          <th class='title-table-header'>Title</th>
          <th class='artist-table-header'>Artist</th>
          <th class='duration-table-header'>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(song, index) in playlist' :key='index' @click='() => playSoundtrack(index)' 
            @keydown.enter='() => playSoundtrack(index)' tabindex='0'>
          <td class='title-cell'>
            <div class='title-cell-content'>
              <img v-show='isActive && playlistIndex === index' class='playing-icon' :src='icons.voice' alt='Playing Icon' 
                height='18' width='18' />
              <button class='favorite-button' @click='() => toggleFavorite(index)' 
                  @mouseover='() => setAllowPlayFlag(false)' @mouseout='() => setAllowPlayFlag(true)'
                  @focus='() => setAllowPlayFlag(false)' @blur='() => setAllowPlayFlag(true)'>
                <img class='heart-icon' :src='getFavoriteIcon(index)' alt='Heart Icon' height='15' width='17' />
              </button>
              <span class='title-text'>{{song.title}}</span>
            </div>
          </td>
          <td class='artist-cell'>{{song.artist}}</td>
          <td class='duration-cell'>{{song.length}}</td>
        </tr>
      </tbody>
    </table>

    <AudioPlayer :class='soundtrackPlayerClass' @mounted='setAudioElement' @onCanPlay='handleCanPlay' />
  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { AudioModuleState, AudioModuleGetters, AudioModuleActions, AudioModuleMutations } from '@/store/modules';

import buttonPlay from '@/assets/images/backgrounds/buttons/button_play.png';
//import albumCover from '@/assets/images/graphics/blood_destiny_album_cover.jpg';
import albumCover from '@/assets/images/graphics/updates/update_cover.png';
import voice from '@/assets/images/icons/icon_voice.png';
import heart from '@/assets/images/icons/icon_heart.png';
import heartFilled from '@/assets/images/icons/icon_heart_filled.png';

export default defineComponent({
  name: 'soundtrack',
  components: {
    AudioPlayer: defineAsyncComponent(() => import('@/components/AudioPlayer.vue')),
    AppButton: defineAsyncComponent(() => import('@/components/clickable-elements/AppButton.vue')),
  },
  setup() {
    const { useState, useGetters, useMutations } = createNamespacedHelpers<
      AudioModuleState,
      AudioModuleGetters,
      AudioModuleActions,
      AudioModuleMutations
    >('AudioModule');

    const { selectSpecificSong } = useMutations(['selectSpecificSong']);
    const { isActive, playlist, playlistIndex } = useState(['isActive', 'playlist', 'playlistIndex']);
    const { currentSong } = useGetters(['currentSong']);
    const { toggleFavorite, activateAudioPlayer } = useMutations(['toggleFavorite', 'activateAudioPlayer']);

    return {
      audioElem: ref<HTMLAudioElement>(),
      isActive,
      playlist,
      playlistIndex,
      currentSong,
      activateAudioPlayer,
      selectSpecificSong,
      toggleFavorite,
    };
  },
  data() {
    return {
      playButtonBackground: buttonPlay,
      albumCover,
      icons: {
        voice,
        heart,
        heartFilled,
      },
      allowPlay: true,    // Only false when focusing/clicking favorite button
      canPlay: false,     // Typically determined by whether audio data has been loaded
      pendingPlay: false, // Only set to true if play was attempted while canPlay was set to false
    }
  },
  computed: {
    favoriteIcon() {
      return this.currentSong?.favorite ? this.icons.heartFilled : this.icons.heart;
    },
    soundtrackPlayerClass() {
      return 'soundtrack-player' + (this.isActive ? ' active' : '');
    },
  },
  methods: {
    setAudioElement(audioElem: HTMLAudioElement) {
      this.audioElem = audioElem;
    },
    handleCanPlay() {
      this.canPlay = true;
      if (this.pendingPlay) {
        this.audioElem?.play();
        this.pendingPlay = false;
      }
    },
    playSoundtrack(playlistIndex = 0) {
      if (this.allowPlay) {
        if (!this.isActive) {
          this.activateAudioPlayer();
        }

        this.selectSpecificSong(playlistIndex);
        this.togglePlay();
      }
    },
    togglePlay() {
      if (this.audioElem) {
        if (this.audioElem.paused) {
          // If canPlay is false, waits for handleCanPlay to be called before playing
          if (this.canPlay) {
            this.audioElem.play();
          } else {
            this.pendingPlay = true;
          }
        } else {
          this.audioElem.pause();
        }
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

<style scoped lang='scss'>
.soundtrack-wrapper {
  font-size: 18px;
  .playlist-details-wrapper {
    margin-bottom: 47px;
    .album-cover {
      margin-right: 43px;
    }
    .playlist-description-container {
      display: inline-block;
      padding-top: 20px;
      vertical-align: top;
      .playlist-text {
        font-family: 'Copperplate Gothic';
        font-weight: 300;
      }
      .album-title {
        font-family: 'Broadway';
        font-size: 3em;
        line-height: 48px;
      }
      .album-description {
        font-family: 'Montserrat';
        margin: 10px 0 15px;
      }
      #playSoundtrackBtn {
        font-size: 1.125em;
        min-width: 84px;
      }
    }
  }
  table {
    border-collapse: collapse;
    font-family: 'Montserrat';
    margin-bottom: 1.875em;
    width: 100%;
    tr {
      th {
        border-bottom: solid 2px #8D8E91;
        color: #7B7B7B;
        padding-bottom: 5px;
        text-transform: uppercase;
        text-align: left;
      }
      td {
        border-bottom: solid 1px hsl(225, 2%, 33%);
        padding: 1em 0;

        .title-cell-content {
          position: relative;
          .playing-icon {
            position: absolute;
            top: 5px;
            left: -64px;
            height: 18px;
            width: 18px;
          }
          .favorite-button {
            position: absolute;
            top: 5px;
            left: -34px;
            background: none;
            border: none;
            cursor: pointer;
            display: inline-flex;
            outline: none;
            vertical-align: middle;
            z-index: 999;
            img {
              transition: inherit;
            }
            &:hover, &:focus {
              img {
                filter: drop-shadow(0 0 4px white);
              }
            }
            // For IE display
            img {
              &.heart-icon {
                height: 15px;
                width: 17px;
              }
            }
          }
        }
        .title-text {
          vertical-align: middle;
        }
      }
      .title-table-header, .title-cell {
        padding-left: 75px;
      }
    }
    tbody > tr {
      cursor: pointer;
      &:hover, &:focus {
        background-color: rgba(white, 0.2);
        outline: none;
      }
    }
  }
  .soundtrack-player {
    position: fixed;
    bottom: -120px;
    left: 0;
    transition: bottom 0.1s ease;
    &.active {
      bottom: 0;
    }
  }
}
</style>

<!-- Won't work unless scope is removed -->
<style lang='scss'>
.soundtrack-wrapper {
  margin-bottom: 120px;
}

</style>