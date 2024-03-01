<template>
  <div 
    class="fixed left-0 z-40 bg-audio-player rounded-tl-2xl rounded-tr-2xl p-1 w-full 
      flex items-center transition-all min-h-[88px]"
    :style="{'bottom': isActive ? '0' : '-88px'}"
  >
    <!-- Leave out until artwork for cover is created
    <div class="px-4">
      <div class="h-20 w-20 hidden lg:block">
        Cover
      </div>
    </div>
    -->
    <div class="text-right px-4 min-w-[200px] lg:min-w-[250px]">
      <div class="text-lg font-semibold truncate">{{ currentSong?.title }}</div>
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
      <div class="hidden md:flex items-center px-2">
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
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
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
  currentSong?: Song;
  isPlaying?: boolean;
  isActive?: boolean;
  timeParam: { currentTime: number; duration: number; };
  volumeParam: { currentVolume: number; muted: boolean; };
  playSettings: { repeat: boolean; shuffle: boolean; };
}>();

const emits = defineEmits([
  "previous",
  "playOrPause",
  "next",
  "timeUpdate",
  "repeat",
  "shuffle",
  "volumeToggle",
  "volumeUpdate",
  "close",
]);

const volumeIcon = computed(() => {
  if (props.volumeParam.muted) {
    return volumeMuteIcon;
  } else if (props.volumeParam.currentVolume === 0) {
    return volumeOffIcon;
  } else if (props.volumeParam.currentVolume <= 0.33) {
    return volumeLowIcon;
  } else if (props.volumeParam.currentVolume <= 0.67) {
    return volumeMediumIcon;
  } else {
    return volumeHighIcon;
  }
});


/* Button callbacks */

const handlePreviousSongButton = (event: Event) => {
  emits("previous", event);
}

const handlePlayOrPauseButton = (event: Event) => {
  emits("playOrPause", event);
}

const handleNextSongButton = (event: Event) => {
  emits("next", event);
}

const handleTimeSliderUpdate = (value: number) => {
  emits("timeUpdate", value);
}

const handleRepeatButton = (event: Event) => {
  emits("repeat", event);
}

const handleShuffleButton = (event: Event) => {
  emits("shuffle", event);
}

const handleVolumeToggle = (event: Event) => {
  emits("volumeToggle", event);
}

const handleVolumeUpdate = (value: number) => {
  emits("volumeUpdate", value);
}

const handleClose = (event: Event) => {
  emits("close", event);
}

/* Utility functions */

const convertSecondsToTime = (seconds: number) => {
  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const displayedSeconds = (totalSeconds - (minutes * 60)).toString().padStart(2, '0');
  return `${minutes}:${displayedSeconds}`;
}

</script>