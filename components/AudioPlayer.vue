<template>
  <div 
    class="fixed left-0 z-40 bg-audio-player rounded-2xl p-1 w-full flex items-center transition-all"
    :style="{'bottom': isActive ? '0' : '-88px'}"
  >
    <div class="px-4">
      <div class="h-20 w-20">
        Cover
      </div>
    </div>
    <div class="px-4 min-w-[250px]">
      <div class="text-lg font-semibold">{{ currentSong?.title }}</div>
      <div class="text-md">{{ currentSong?.artist }}</div>
    </div>
    <div class="flex items-center border-l border-white px-2 py-2 w-full">
      <div class="flex items-center px-2">
        <AppIconButton @click="handlePreviousSongButton">
          <FontAwesomeIcon :icon="faBackwardStep" />
        </AppIconButton>
        <AppIconButton @click="handlePlayOrPauseButton">
          <FontAwesomeIcon :icon="isPlaying ? faPause : faPlay" />
        </AppIconButton>
        <AppIconButton @click="handleNextSongButton">
          <FontAwesomeIcon :icon="faForwardStep" />
        </AppIconButton>
      </div>
      <div class="flex-1 flex items-center px-4">
        <span class="pr-4">{{ convertSecondsToTime(timeParam.currentTime) }}</span>
        <Slider :value='timeParam.currentTime' @update='handleTimeSliderUpdate' :max='timeParam.duration' height="6px" />
        <span class="pl-4">{{ convertSecondsToTime(timeParam.duration) }}</span>
      </div>
      <div class="flex items-center px-2">
        <AppIconButton @click="handleRepeatButton">
          <FontAwesomeIcon :class="{'text-crimson': playSettings.repeat}" :icon="faRepeat" />
        </AppIconButton>
        <AppIconButton @click="handleShuffleButton">
          <FontAwesomeIcon :class="{'text-crimson': playSettings.shuffle}"  :icon="faShuffle" />
        </AppIconButton>
      </div>
      <div class="flex items-center px-4">
        <AppIconButton class="mr-1" @click="handleVolumeToggle" size="2.2rem">
          <img :src="volumeIcon" alt="Volume Icon" />
        </AppIconButton>
        <Slider :value='volumeParam.currentVolume' @update='handleVolumeUpdate' max="1" step="0.01" height="4px" hideThumb />
      </div>
    </div>
    <AppIconButton class="absolute top-0 right-0" size="2.2rem" @click="handleClose">
      <FontAwesomeIcon :icon="faXmark" size="lg" />
    </AppIconButton>
  </div>
  <audio
    :src="currentSong?.file"
    ref="audioElem"
    @canplay="handleCanPlayChange"
    @ended="handleEnded"
    @timeupdate="handleAudioCurrentTimeChange" 
    @durationchange="handleAudioDurationChange"
    @volumechange="handleAudioVolumeChange"
  >
    Your browser does not support the <code>audio</code> element.
  </audio>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import { 
  faBackwardStep, 
  faForwardStep, 
  faPause, 
  faPlay,
  faRepeat,
  faShuffle,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Song } from "@/models";

const AppIconButton = defineAsyncComponent(() => import("@/components/clickable-elements/AppIconButton.vue"));
const Slider = defineAsyncComponent(() => import("@/components/Slider.vue"));

// Font Awesome does not have a free icon for medium volume, so custom volume set is used instead
import volumeHighIcon from "@/assets/images/icons/icon_volume_high.svg";
import volumeLowIcon from "@/assets/images/icons/icon_volume_low.svg";
import volumeMediumIcon from "@/assets/images/icons/icon_volume_medium.svg";
import volumeMuteIcon from "@/assets/images/icons/icon_volume_mute.svg";
import volumeOffIcon from "@/assets/images/icons/icon_volume_off.svg";

const props = defineProps<{
  isActive?: boolean;
  songList?: readonly Song[];
}>();

const songIndex = defineModel({ type: Number, default: -1 });

const emits = defineEmits(["close"]);

/* Refs */
const audioElem = ref<HTMLAudioElement>();
const hadFirstPlay = ref(false);
const isPlaying = ref(false);
const timeParam = ref({
  currentTime: 0,
  duration: 0,
});
const volumeParam = ref({
  currentVolume: 1,
  muted: false,
});
const playSettings = ref({
  repeat: false,
  shuffle: false,
});


/* Computed */

const currentSong = computed(() => {
  const songList = props.songList || [];
  if (songIndex.value >= 0 && songIndex.value < songList.length) {
    return songList[songIndex.value];
  } else {
    return undefined;
  }
});

const volumeIcon = computed(() => {
  if (volumeParam.value.muted) {
    return volumeMuteIcon;
  } else if (volumeParam.value.currentVolume === 0) {
    return volumeOffIcon;
  } else if (volumeParam.value.currentVolume <= 0.33) {
    return volumeLowIcon;
  } else if (volumeParam.value.currentVolume <= 0.67) {
    return volumeMediumIcon;
  } else {
    return volumeHighIcon;
  }
});


/* Button callbacks */

const handlePreviousSongButton = () => {
  if (songIndex.value > 0) {
    songIndex.value--;
  } else if (props.songList?.length) {
    songIndex.value = props.songList.length - 1;
  }
}

const handlePlayOrPauseButton = () => {
  if (isPlaying.value) {
    audioElem.value?.pause();
  } else {
    // Means song has not been loaded yet
    if (songIndex.value < 0) {
      songIndex.value = 0;  // emits update:songIndex
    } else {
      audioElem.value?.play();
    }
  }
  updateIsPlayingState();
}

const handleNextSongButton = () => {
  if (props.songList?.length) {
    if (songIndex.value + 1 < props.songList.length) {
      songIndex.value++;
    } else {
      songIndex.value = 0;
    }
  }
}

const handleTimeSliderUpdate = (value: number) => {
  if (audioElem.value) {
    audioElem.value.currentTime = value;   // Changes audio time based on new slider value
  }
}

const handleVolumeToggle = () => {
  if (audioElem.value) {
    audioElem.value.muted = !audioElem.value.muted;
    volumeParam.value.muted = audioElem.value.muted;      // Required for reactivity
  }
}

const handleVolumeUpdate = (value: number) => {
  if (audioElem.value) {
    audioElem.value.volume = value;
  }
}

const handleRepeatButton = () => {
  if (audioElem.value) {
    audioElem.value.loop = !audioElem.value.loop;
    playSettings.value.repeat = audioElem.value.loop;
  }
}

const handleShuffleButton = () => {
  playSettings.value.shuffle = !playSettings.value.shuffle;
}

const handleClose = () => {
  audioElem.value?.pause();
  emits("close");
}

/* Event callbacks */

const handleCanPlayChange = () => {
  // Means either a new song has been traversed to while previous one was still playing, or no song has been played yet
  if (!hadFirstPlay.value || isPlaying.value) {
    hadFirstPlay.value = true;
    audioElem.value?.play();
    updateIsPlayingState();
  }
}

const handleEnded = () => {
  if (playSettings.value.shuffle) {
    songIndex.value = Math.floor(Math.random() * (props.songList || []).length);
  } else if (!playSettings.value.repeat) {
    // Unlike next button behavior, will not loop back to the beginning if on last song
    if (songIndex.value + 1 < (props.songList?.length || 0)) {
      songIndex.value++;
    }
  }
}

const handleAudioCurrentTimeChange = (event: Event) => {
  timeParam.value.currentTime = (event.target as HTMLAudioElement).currentTime;
}

const handleAudioDurationChange = (event: Event) => {
  timeParam.value.duration = (event.target as HTMLAudioElement).duration;
}

const handleAudioVolumeChange = (event: Event) => {
  volumeParam.value.currentVolume = (event.target as HTMLAudioElement).volume;
}


/* Utility functions */

const updateIsPlayingState = () => {
  isPlaying.value = !audioElem.value?.paused;
}

const convertSecondsToTime = (seconds: number) => {
  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const displayedSeconds = (totalSeconds - (minutes * 60)).toString().padStart(2, '0');
  return `${minutes}:${displayedSeconds}`;
}

</script>