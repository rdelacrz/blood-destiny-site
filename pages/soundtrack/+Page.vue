<template>
  <div class="pt-[150px] pb-20">
    <div class="relative text-center flex flex-col justify-center before:absolute before:block before:h-[248px] before:w-full
        before:bg-gradient-radial before:from-crimson before:from-1% before:to-70%">
      <h2 class="relative font-prosto-one text-[4rem] leading-tight">Blood Destiny OST</h2>
    </div>
    <div class="relative font-poppins text-lg text-center my-4">The official soundtrack of Blood Destiny, mostly produced by BlooD.</div>
    <div class="flex justify-center mb-10">
      <AppButton id="playSongBtn" @click="() => playSoundtrack()">Play</AppButton>
    </div>

    <table class="w-full font-poppins text-left">
      <thead>
        <tr class="uppercase text-xl">
          <th class="py-2 border-b-2 border-[#D9D9D9] pl-9">Title</th>
          <th class="py-2 border-b-2 border-[#D9D9D9]">Artist</th>
          <th class="py-2 border-b-2 border-[#D9D9D9]">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in playlist" :key="index" @click="() => playSong(index)" 
          @keydown.enter="() => playSong(index)" tabindex="0"
          class="text-xl cursor-pointer hover:bg-white-hover"
        >
          <td class="py-5 border-b border-[#D9D9D9] pl-9">
            <div class="relative flex items-center">
              <img v-show="isActive && currentSongIndex === index" :src="icons.voice" alt="Playing Icon" height="18" width="18"
                class="absolute left-[-25px]"
              />
              <AppIconButton class="mr-4" @click="() => copyShareLink(song.file)" 
                @mouseover="() => setAllowPlayFlag(false)" @mouseout="() => setAllowPlayFlag(true)"
                @focus="() => setAllowPlayFlag(false)" @blur="() => setAllowPlayFlag(true)"
                :title="`Share link to ${song.title}`"
              >
                <FontAwesomeIcon :icon="faShareNodes" size="xs" />
              </AppIconButton>
              <span class="mr-4">{{song.title}}</span>
            </div>
          </td>
          <td class="py-4 border-b border-white">{{song.artist}}</td>
          <td class="py-4 border-b border-white">{{song.length}}</td>
        </tr>
      </tbody>
    </table>
    <v-snackbar
      :timeout="1500"
      color="primary"
      location="top"
      elevation="24"
      v-model="shareSnackbar"
    >
      <p class="text-white">
        Song link <a target="_blank" :href="shareSongLink" class="underline">
          {{ shareSongLink }}
        </a> copied to clickboard.
      </p>
    </v-snackbar>

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
    <AudioPlayer
      :currentSong="currentSong"
      :isPlaying="isPlaying"
      :isActive="isActive"
      :triggeredByUser="triggeredByUser"
      :timeParam="timeParam"
      :volumeParam="volumeParam"
      :playSettings="playSettings"
      @previous="handlePreviousSong"
      @playOrPause="handlePlayOrPauseSong"
      @next="handleNextSong"
      @timeUpdate="handleTimeSliderUpdate"
      @repeat="handleRepeat"
      @shuffle="handleShuffle"
      @volumeToggle="handleVolumeToggle"
      @volumeUpdate="handleVolumeUpdate"
      @close="handleClose"
      @onMounted="handleAudioPlayerOnMounted"
    />
  </div>
</template>

<script setup lang="ts">

import { computed, defineAsyncComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import copy from "clipboard-copy";
import { usePageContext } from "@/hooks";
import { playlist } from "@/utilities";

import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

import voice from "@/assets/images/icons/icon_voice.png";
import heart from "@/assets/images/icons/icon_heart.png";
import heartFilled from "@/assets/images/icons/icon_heart_filled.png";

// Needs to be loaded synchronously for Snackbar functionality to work
import AppIconButton from "@/components/clickable-elements/AppIconButton.vue";

const AudioPlayer = defineAsyncComponent(() => import("@/components/AudioPlayer.vue"));
const AppButton = defineAsyncComponent(() => import("@/components/clickable-elements/AppButton.vue"));


const icons = {
  heart,
  heartFilled,
  voice,
};

const pageContext = usePageContext();

/* Refs */
const audioElem = ref<HTMLAudioElement>();
const isActive = ref<boolean | undefined>(undefined);
const triggeredByUser = ref<boolean | undefined>(false);    // Audio cannot play without user interaction
const allowPlay = ref(true);    // Only false when focusing/clicking share button
const isPlaying = ref(false);
const currentSongIndex = ref(-1);
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
const shareSnackbar = ref(false);
const shareSongLink = ref("");


/* Computed variables */

const currentSong = computed(() => {
  if (currentSongIndex.value >= 0 && currentSongIndex.value < playlist.length) {
    return playlist[currentSongIndex.value];
  } else {
    return undefined;
  }
});

const fileToIndexMap = computed(() => {
  const songMap = playlist.reduce((songMap, song, index) => {
    songMap[song.file] = index;
    return songMap;
  }, {} as {[id: string]: number});
  return songMap;
});


/* Main page callbacks */

const playSoundtrack = () => {
  if (currentSongIndex.value >= 0) {
    playSong(currentSongIndex.value);
  } else {
    playSong(0);
  }
}

const playSong = (songIndex: number) => {
  triggeredByUser.value = true;
  if (allowPlay.value) {
    isActive.value = true;
    if (currentSongIndex.value === songIndex) {
      audioElem.value?.play()
    } else {
      currentSongIndex.value = songIndex;
    }
  }
}

const copyShareLink = (songFile: string) => {
  const encodedFileName = encodeURIComponent(songFile);
  shareSongLink.value = `${window.location.origin}${pageContext.urlPathname}?playOnLoad=${encodedFileName}`;
  shareSnackbar.value = true;
  copy(shareSongLink.value);
}

const setAllowPlayFlag = (allowPlayFlag: boolean) => {
  allowPlay.value = allowPlayFlag;
}


/* Audio player callbacks */

const handlePreviousSong = () => {
  if (currentSongIndex.value > 0) {
    currentSongIndex.value--;
  } else if (playlist.length) {
    currentSongIndex.value = playlist.length - 1;
  }
}

const handlePlayOrPauseSong = () => {
  triggeredByUser.value = true;
  if (isPlaying.value) {
    audioElem.value?.pause();
  } else {
    // Means song has not been loaded yet
    if (currentSongIndex.value < 0) {
      currentSongIndex.value = 0;
    } else {
      audioElem.value?.play();
    }
  }
  updateIsPlayingState();
}

const handleNextSong = () => {
  if (currentSongIndex.value + 1 < playlist.length) {
    currentSongIndex.value++;
  } else {
    currentSongIndex.value = 0;
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

const handleRepeat = () => {
  if (audioElem.value) {
    setRepeatFlag(!audioElem.value.loop);
    // Sets shuffle to off if repeat is on now
    if (audioElem.value.loop && playSettings.value.shuffle) {
      playSettings.value.shuffle = false;
    }
  }
}

const handleShuffle = () => {
  playSettings.value.shuffle = !playSettings.value.shuffle;
  // Sets repeat to off if shuffle is on now
  if (playSettings.value.shuffle && audioElem.value?.loop) {
    setRepeatFlag(false);
  }
}

const handleClose = () => {
  isActive.value = false;
  audioElem.value?.pause();
}

/* Audio element callbacks */

const handleCanPlayChange = () => {
  // Means either a new song has been traversed to while previous one was still playing, or no song has been played yet
  if (triggeredByUser.value) {
    audioElem.value?.play();
    updateIsPlayingState();
  }
}

const handleEnded = () => {
  if (playSettings.value.shuffle) {
    // Ensures that random new index is different from previous one
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * playlist.length);
    } while (newIndex === currentSongIndex.value);

    currentSongIndex.value = newIndex;
  } else if (!playSettings.value.repeat) {
    // Unlike next button behavior, will not loop back to the beginning if on last song
    if (currentSongIndex.value + 1 < playlist.length) {
      currentSongIndex.value++;
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

const handleAudioPlayerOnMounted = () => {
  const playOnLoadParams = pageContext.urlParsed.searchAll["playOnLoad"];
  if (playOnLoadParams?.length) {
    const decodedFile = decodeURIComponent(playOnLoadParams[0]);
    const songIndex = fileToIndexMap.value[decodedFile];
    if (!Number.isNaN(songIndex) && songIndex < playlist.length) {
      isActive.value = true;
      currentSongIndex.value = songIndex;
    }
  }
}


/* Utility functions */

const updateIsPlayingState = () => {
  isPlaying.value = !audioElem.value?.paused;
}

const setRepeatFlag = (repeatFlag: boolean) => {
  if (audioElem.value) {
    audioElem.value.loop = repeatFlag;
    playSettings.value.repeat = repeatFlag;
  }
}

</script>