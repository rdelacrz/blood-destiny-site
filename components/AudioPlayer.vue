<template>
  <div class='audio-player-wrapper'>
    <audio ref='audioElem' :src='currentSong ? currentSong.file : undefined' @play='handleAudioPlayingChange'
      @pause='handleAudioPlayingChange' @timeupdate="handleAudioCurrentTimeChange" 
      @durationchange='handleAudioDurationChange' @volumechange='handleAudioVolumeChange'
      @canplay='handleCanPlayChange' @ended='handleEnded' 
    />
    <div class='song-info-content-wrapper'>
      <button class='icon-button control' @click='handleToggleFavorite'>
        <img class='heart-icon' :src='favoriteIcon' alt='Heart Icon' height='24' width='27' />
      </button>
      <div class='song-info-container'>
        <div class='song-name'>{{currentSong ? currentSong.title : ''}}</div>
        <div class='song-artist'>by {{currentSong ? currentSong.artist : ''}}</div>
      </div>
    </div>
    <div class='main-content-wrapper'>
      <div class='main-controls-wrapper'>
        <button class='icon-button shuffle-button control' @click='handleShuffle'>
          <img class='shuffle-icon' :src='shuffleIcon' alt='Shuffle Song Icon' height='15' width='25' />
        </button>
        <button class='icon-button prev-button control' @click='handlePrev'>
          <img class='previous-icon' :src='icons.previous' alt='Previous Song Icon' height='15' width='15' />
        </button>
        <button class='icon-button play-button control' @click='togglePlay'
          @focus='handlePlayPulseFocus(true)' @blur='handlePlayPulseFocus(false)'
          @mouseover='handlePlayPulseHover(true)' @mouseleave='handlePlayPulseHover(false)'
        >
          <font-awesome-icon class='play-icon' :icon="playing ? 'pause-circle' : 'play-circle'" aria-hidden='true' 
            :beat='playButtonState.allowPulse' />
        </button>
        <button class='icon-button next-button control' @click='handleNext'>
          <img class='next-icon' :src='icons.next' alt='Next Song Icon' height='15' width='15' />
        </button>
        <button class='icon-button repeat-button control' @click='handleRepeat'>
          <img class='repeat-icon' :src='repeatIcon' alt='Repeat Song Icon' height='18' width='20' />
        </button>
      </div>
      <div class='song-time-control-container'>
        <div class='time-display current-time'>{{convertSecondsToTime(timeParam.currentTime)}}</div>
        <Slider class='song-time-slider' :value='timeParam.currentTime' @update='handleSliderUpdate' :max='timeParam.duration'  />
        <div class='time-display duration'>{{convertSecondsToTime(timeParam.duration)}}</div>
      </div>
    </div>
    <div class='volume-content-wrapper'>
      <div class='volume-button-container'>
        <button class='icon-button volume-button control' @click='toggleMute'>
          <img class='volume-icon' :src='volumeIcon' alt='Volume Icon' />
        </button>
      </div>
      <Slider class='volume-slider' :value='volumeParam.currentVolume' @update='handleVolumeUpdate' max='1' step='0.01' sliderColor='#FB0000' />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import Slider from '@/components/Slider.vue';
import { AudioModuleState, AudioModuleGetters, AudioModuleActions, AudioModuleMutations } from '@/store/modules';

// Primary Audio Player Icons
import heart from '@/assets/images/icons/icon_heart.png';
import heartFilled from '@/assets/images/icons/icon_heart_filled.png';
import previous from '@/assets/images/icons/icon_previous.png';
import next from '@/assets/images/icons/icon_next.png';
import shuffle from '@/assets/images/icons/icon_shuffle.png';
import shuffleActive from '@/assets/images/icons/icon_shuffle_active.png';
import repeat from '@/assets/images/icons/icon_repeat.png';
import repeatActive from '@/assets/images/icons/icon_repeat_active.png';

// Volume Icons
import volumeMute from '@/assets/images/icons/icon_volume_mute.png';
import volumeOff from '@/assets/images/icons/icon_volume_off.png';
import volumeDown from '@/assets/images/icons/icon_volume_down.png';
import volume from '@/assets/images/icons/icon_volume.png';
import volumeUp from '@/assets/images/icons/icon_volume_up.png';

export default defineComponent({
  name: 'audio-player',
  components: {
    Slider
  },
  setup() {
    const { useState, useGetters, useMutations } = createNamespacedHelpers<
      AudioModuleState, 
      AudioModuleGetters, 
      AudioModuleActions, 
      AudioModuleMutations
    >('AudioModule');

    const { selectPreviousSong, selectNextSong, selectRandomSong } = useMutations([
      'selectPreviousSong', 'selectNextSong', 'selectRandomSong'
    ]);
    const { playlist, playlistIndex } = useState(['playlist', 'playlistIndex']);
    const { currentSong } = useGetters(['currentSong']);
    const { toggleFavorite } = useMutations(['toggleFavorite']);
    return {
      audioElem: ref<HTMLAudioElement>(),
      playlist,
      playlistIndex,
      currentSong,
      selectPreviousSong,
      selectNextSong,
      selectRandomSong,
      toggleFavorite,
    };
  },
  data() {
    return {
      playing: false,
      shuffle: false,
      repeat: false,
      hadFirstPlay: false,
      icons: {
        heart,
        heartFilled,
        previous,
        next,
        shuffle,
        shuffleActive,
        repeat,
        repeatActive,
        
        // Volume icons
        volumeMute,
        volumeOff,
        volumeDown,
        volume,
        volumeUp,
      },
      timeParam: {
        currentTime: 0,
        duration: 0,
      },
      volumeParam: {
        currentVolume: 1,
        muted: false,
      },
      playButtonState: {
        allowPulse: false,
        focus: false,
        hover: false,
      },
    };
  },
  props: {
    wrapperClass: String,
  },
  computed: {
    favoriteIcon() {
      return this.currentSong && this.currentSong.favorite ? this.icons.heartFilled : this.icons.heart;
    },
    shuffleIcon() {
      return this.shuffle ? this.icons.shuffleActive : this.icons.shuffle;
    },
    repeatIcon() {
      return this.repeat ? this.icons.repeatActive : this.icons.repeat;
    },
    volumeIcon() {
      if (this.volumeParam.muted) {
        return this.icons.volumeMute;
      } else if (this.volumeParam.currentVolume === 1) {
        return this.icons.volumeUp;
      } else if (this.volumeParam.currentVolume === 0) {
        return this.icons.volumeOff;
      } else if (this.volumeParam.currentVolume < 0.5) {
        return this.icons.volumeDown;
      } else {
        return this.icons.volume;
      }
    }
  },
  mounted() {
    this.$emit('mounted', this.audioElem);
  },
  methods: {
    togglePlay() {
      if (this.audioElem) {
        if (this.audioElem.paused) {
          this.audioElem.play();
        } else {
          this.audioElem.pause();
        }
        this.playButtonState.allowPulse = false;
      }
    },
    toggleMute() {
      if (this.audioElem) {
        this.audioElem.muted = !this.volumeParam.muted;
        this.volumeParam.muted = !this.volumeParam.muted;
      }
    },
    handlePrev() {
      if (this.audioElem && this.playlist?.length) {
        if (this.repeat) {
          this.audioElem.load();
        } else if (this.shuffle) {
          this.selectRandomSong();
        } else {
          this.selectPreviousSong();
        }
      }
    },
    handleNext() {
      if (this.audioElem && this.playlist?.length) {
        if (this.repeat) {
          this.audioElem.load();
        } else if (this.shuffle) {
          this.selectRandomSong();
        } else {
          this.selectNextSong();
        }
      }
    },
    handleShuffle() {
      this.shuffle = !this.shuffle;
    },
    handleRepeat() {
      this.repeat = !this.repeat;
    },
    convertSecondsToTime(seconds: number) {
      const totalSeconds = Math.floor(seconds);
      const minutes = Math.floor(totalSeconds / 60);
      const displayedSeconds = (totalSeconds - (minutes * 60)).toString().padStart(2, '0');
      return `${minutes}:${displayedSeconds}`;
    },
    handleSliderUpdate(value: number) {
      if (this.audioElem) {
        this.audioElem.currentTime = value;   // Changes audio time based on new slider value
      }
    },
    handleVolumeUpdate(value: number) {
      if (this.audioElem) {
        this.audioElem.volume = value;
      }
    },
    handlePlayPulseFocus(focus: boolean) {
      // Toggles play button pulsing when focus state changes
      if (this.playButtonState.focus !== focus) {
        if (focus) {
          this.playButtonState.allowPulse = true;
        } else {
          this.playButtonState.allowPulse = false;
        }
      }
      this.playButtonState.focus = focus;
    },
    handlePlayPulseHover(hover: boolean) {
      // Toggles play button pulsing when hover state changes
      if (this.playButtonState.hover !== hover) {
        if (hover) {
          this.playButtonState.allowPulse = true;
        } else {
          this.playButtonState.allowPulse = false;
        }
      }
      this.playButtonState.hover = hover;
    },

    // The following handlers are for the <audio> HTML object's events
    handleAudioPlayingChange(event: Event) {
      this.playing = !(event.target as any).paused;
      if (this.playing) {
        this.hadFirstPlay = true;
      }
    },
    handleCanPlayChange(event: Event) {
      // Means a new song has been traversed to while previous one was still playing
      if (this.audioElem && this.hadFirstPlay && this.playing) {
        this.audioElem.play();
      }
      this.$emit('onCanPlay', true);
    },
    handleEnded(event: Event) {
      if (this.audioElem) {
        if (this.repeat) {
          this.audioElem.load();
          this.audioElem.play();
        } else if (this.shuffle) {
          this.playing = true;    // Set this so that when canplay is triggered, this condition will allow play() to be called
          this.selectRandomSong();
        } else if (this.playlist && this.playlistIndex < this.playlist.length - 1) {
          this.playing = true;    // Set this so that when canplay is triggered, this condition will allow play() to be called
          this.selectNextSong();
        } else {
          this.timeParam.currentTime = 0;
        }
      }
    },
    handleAudioCurrentTimeChange(event: Event) {
      this.timeParam.currentTime = (event.target as any).currentTime;
    },
    handleAudioDurationChange(event: Event) {
      this.timeParam.duration = (event.target as any).duration;
    },
    handleAudioVolumeChange(event: Event) {
      this.volumeParam.currentVolume = (event.target as any).volume;
    },
    handleToggleFavorite(event: Event) {
      this.toggleFavorite();
    }
  }
});
</script>

<style scoped lang='scss'>

.audio-player-wrapper {
  background: rgba(#4A0404, 0.88);
  box-sizing: border-box;
  display: flex;
  min-height: 120px;
  padding: 20px 40px;
  width: 100%;
  .song-info-content-wrapper {
    display: flex;
    align-items: center;
    width: 25%;
    .song-info-container {
      font-family: 'Montserrat';
      font-size: 1.125em;
      margin-left: 20px;
      .song-name {
        font-weight: bold;
      }
    }
  }
  .main-content-wrapper {
    display: flex;
    flex-direction: column;
    width: 50%;
    .main-controls-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .song-time-control-container {
      display: flex;
      align-items: center;
      .time-display {
        font-family: 'Montserrat';
        font-size: 0.875em;
        line-height: 14px;
        min-width: 60px;
        &.current-time {
          text-align: right;
        }
      }
      .song-time-slider {
        -webkit-appearance: none;
        flex: 1;
        margin: 0 20px;
      }
    }
  }
  .volume-content-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
    width: 25%;
    .volume-button-container {
      display: flex;
      margin-right: 10px;
      min-width: 45px;
      text-align: left;
    }
    .volume-slider {
      max-width: 160px;
      width: 100%;
    }
  }
  .control {
    &.prev-button {
      margin-left: 20px;
    }
    &.play-button {
      margin: 0 30px;
    }
    &.next-button {
      margin-right: 20px;
    }
    // For IE display
    img {
      &.heart-icon {
        height: 24px;
        width: 27px;
      }
      &.previous-icon, &.next-icon {
        height: 15px;
        width: 15px;
      }
      &.shuffle-icon {
        height: 15px;
        width: 25px;
      }
      &.repeat-icon {
        height: 18px;
        width: 20px;
      }
    }
  }
}
</style>
