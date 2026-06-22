<template>
  <div class="route-host">
    <audio
      ref="audioEl"
      :src="cur.audioUrl"
      :loop="repeat"
      preload="none"
      crossorigin="anonymous"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTime"
      @ended="onEnded"
    />
    <div class="wrap page-head">
      <BreadCrumb here="Soundtrack" />
      <div
        class="label"
        style="margin-top: 1.4rem"
      >
        Original Soundtrack
      </div>
      <h1>
        The sound of Blood Destiny
      </h1>
      <p class="lead page-intro">
        The soundtrack of Blood Destiny can be listened to here. This page will be updated as more
        music is produced &mdash; the OST is mostly produced by
        <span class="text-crimson">BlooD.</span>
      </p>
    </div>

    <section
      class="section"
      style="padding-top: 1rem"
    >
      <div
        class="wrap"
        style="display: grid; gap: 1.6rem"
      >
        <div
          v-reveal="{ y: 24 }"
          class="surface player"
        >
          <div class="player__top">
            <button
              class="player__btn"
              :aria-label="playing ? 'Pause' : 'Play'"
              @click="toggle"
            >
              <svg
                v-if="!playing"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
              </svg>
            </button>
            <div class="player__meta">
              <div class="player__title">
                {{ cur.title }}
              </div>
              <div class="player__artist">
                {{ cur.artist }}
              </div>
            </div>
            <div class="player__controls">
              <button
                class="player__ctrl"
                :class="{ 'is-active': shuffle }"
                :aria-pressed="shuffle"
                aria-label="Shuffle"
                title="Shuffle"
                @click="shuffle = !shuffle"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                </svg>
              </button>
              <button
                class="player__ctrl"
                :class="{ 'is-active': repeat }"
                :aria-pressed="repeat"
                aria-label="Repeat one"
                title="Repeat song"
                @click="repeat = !repeat"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z" />
                </svg>
              </button>
              <button
                class="player__ctrl"
                :class="{ 'is-copied': copied }"
                :aria-label="copied ? 'Link copied' : 'Copy link to this song'"
                :title="copied ? 'Link copied' : 'Copy link to this song'"
                @click="share"
              >
                <svg
                  v-if="copied"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
                <span
                  v-if="copied"
                  class="player__toast"
                >Link copied</span>
              </button>
            </div>
            <div class="vol">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
              </svg>
              <input
                v-model.number="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                aria-label="Volume"
              >
            </div>
          </div>
          <canvas
            ref="canvas"
            class="player__viz"
            aria-hidden="true"
          />
          <div class="player__seek">
            <span>{{ curTime }}</span>
            <div
              class="seek-bar"
              role="slider"
              :aria-valuenow="Math.round(progress * 100)"
              aria-label="Seek"
              @click="seek"
            >
              <div
                class="seek-bar__fill"
                :style="{ width: progress * 100 + '%' }"
              />
              <div
                class="seek-bar__knob"
                :style="{ left: progress * 100 + '%' }"
              />
            </div>
            <span>{{ cur.duration }}</span>
          </div>
        </div>

        <div
          v-reveal="{ y: 24, delay: 100 }"
          class="surface"
          style="padding: 0.4rem 0.6rem"
        >
          <table class="tracklist">
            <tbody>
              <tr
                v-for="(t, i) in tracks"
                :key="t.n"
                :class="{ 'is-playing': i === current && playing }"
                @click="select(i)"
              >
                <td class="t-n">
                  <span
                    v-if="i === current && playing"
                    class="eq"
                  >
                    <span /><span /><span /><span />
                  </span>
                  <template v-else>
                    {{ pad2(t.n) }}
                  </template>
                </td>
                <td>
                  <span class="t-title">{{ t.title }}</span>
                </td>
                <td class="t-artist">
                  {{ t.artist }}
                </td>
                <td class="t-time">
                  {{ t.duration }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Soundtrack — player + tracklist with a canvas spectrum visualizer.
 *
 * The prototype ships no real audio files, so playback is a UI-only
 * preview: a synthetic crimson→steel equalizer plus a progress ticker
 * driven by each track's listed duration. The visualizer is written to be
 * AnalyserNode-ready — when real `audioUrl`s land (see data/soundtrack.ts)
 * create an AudioContext + MediaElementSource + AnalyserNode for an
 * HTMLAudioElement and feed getByteFrequencyData() into draw().
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { prefersReducedMotion } from '@/utils/atmosphere';
import { TRACKS } from '@/data/soundtrack';

const route = useRoute();
const router = useRouter();

const tracks = TRACKS;
const trackNumberById: Record<string, number> = Object.fromEntries(
  tracks.map((track) => [track.id, track.n]),
);
const current = ref(0);
const playing = ref(false);
const progress = ref(0.0);
const volume = ref(0.8);
const shuffle = ref(false);
/** Repeat-one: when on, the current track loops instead of advancing. */
const repeat = ref(false);
/** Transient "Link copied" feedback for the share button. */
const copied = ref(false);
const canvas = ref<HTMLCanvasElement | null>(null);
const audioEl = ref<HTMLAudioElement | null>(null);

let raf: number | null = null;
let t0 = 0;

// Web Audio analyser (lazily built on first real playback)
let audioCtx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let freq: Uint8Array<ArrayBuffer> | null = null;

// Visualizer (synthetic spectrum; AnalyserNode-ready)
const BARS = 48;

// Progress ticker — drives the UI-only preview for tracks without audioUrl
let tick: number | null = null;

// Auto-clears the "Link copied" share feedback after a short delay
let copiedTimer: number | null = null;

const cur = computed(() => tracks[current.value]);
/** True when the current track has a real, self-hosted audio file. */
const hasAudio = computed(() => Boolean(cur.value.audioUrl));
const durSec = computed(() => {
  const [m, s] = cur.value.duration.split(':').map(Number);
  return m * 60 + s;
});
const curTime = computed(() => fmt(progress.value * durSec.value));

watch(playing, () => {
  if (playing.value) startViz();
});
watch(volume, (v) => {
  if (audioEl.value) audioEl.value.volume = v;
});

onMounted(() => {
  sizeCanvas();
  if (audioEl.value) audioEl.value.volume = volume.value;
  window.addEventListener('resize', sizeCanvas);
  document.addEventListener('visibilitychange', onVis);
  startViz();
  runTick();
  openSharedTrack();
});
onUnmounted(() => {
  stopViz();
  stopTick();
  if (copiedTimer) clearTimeout(copiedTimer);
  audioEl.value?.pause();
  void audioCtx?.close();
  window.removeEventListener('resize', sizeCanvas);
  document.removeEventListener('visibilitychange', onVis);
});

/**
 * Honor a `?track=id` deep link (from the share button): select that track and
 * try to autoplay. Browsers may block autoplay until a user gesture, in which
 * case the track is simply cued up paused (playReal swallows the rejection).
 */
const openSharedTrack = (): void => {
  const id = route.query.track;
  if (typeof id !== 'string') return;
  const n = trackNumberById[id];
  if (!n) return;
  const idx = tracks.findIndex((t) => t.n === n);
  if (idx < 0) return;
  current.value = idx;
  progress.value = 0;
  nextTick(() => {
    if (hasAudio.value) void playReal();
    else playing.value = true;
  });
};

const fmt = (sec: number): string => {
  const v = Math.max(0, Math.floor(sec));
  return Math.floor(v / 60) + ':' + String(v % 60).padStart(2, '0');
};

const draw = (now: number): void => {
  const c = canvas.value;
  if (!c) {
    raf = null;
    return;
  }
  const ctx = c.getContext('2d');
  if (!ctx) {
    raf = null;
    return;
  }
  const w = c.width;
  const h = c.height;
  ctx.clearRect(0, 0, w, h);
  const t = (now - t0) / 1000;
  const gap = 2;
  const bw = (w - gap * (BARS - 1)) / BARS;
  // Real spectrum from the AnalyserNode when audio is actually playing.
  if (analyser && freq && playing.value) analyser.getByteFrequencyData(freq);
  for (let i = 0; i < BARS; i++) {
    const p = i / BARS;
    let amp: number;
    if (analyser && freq && playing.value) {
      const idx = Math.floor(p * freq.length * 0.7);
      amp = (freq[idx] / 255) * (0.45 + 0.55 * Math.sin(p * Math.PI));
    } else if (playing.value && !prefersReducedMotion()) {
      amp =
        (Math.sin(t * 3 + i * 0.5) * 0.5 + 0.5) *
        (Math.sin(t * 1.7 + i * 0.22) * 0.4 + 0.6) *
        (0.35 + 0.65 * Math.sin(p * Math.PI));
    } else {
      amp = 0.12 + 0.06 * Math.sin(p * Math.PI);
    }
    const bh = Math.max(2, amp * h * 0.92);
    const x = i * (bw + gap);
    const grad = ctx.createLinearGradient(0, h, 0, h - bh);
    grad.addColorStop(0, '#C8102E');
    grad.addColorStop(1, '#7FB5D6');
    ctx.fillStyle = grad;
    ctx.fillRect(x, h - bh, bw, bh);
  }
  raf = requestAnimationFrame(draw);
};
const startViz = (): void => {
  if (!raf) {
    t0 = performance.now();
    raf = requestAnimationFrame(draw);
  }
};
const stopViz = (): void => {
  if (raf) {
    cancelAnimationFrame(raf);
    raf = null;
  }
};

const nextTrack = (): void => {
  if (shuffle.value && tracks.length > 1) {
    // Pick a random track other than the current one.
    let n = current.value;
    while (n === current.value) n = Math.floor(Math.random() * tracks.length);
    current.value = n;
  } else {
    current.value = (current.value + 1) % tracks.length;
  }
};

// Real audio playback (used when the track has audioUrl)
/** Build the AudioContext → AnalyserNode graph once, on first real play. */
const ensureGraph = (): void => {
  if (audioCtx || !audioEl.value) return;
  const Ctx =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  audioCtx = new Ctx();
  const srcNode = audioCtx.createMediaElementSource(audioEl.value);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 128;
  freq = new Uint8Array(analyser.frequencyBinCount);
  srcNode.connect(analyser);
  analyser.connect(audioCtx.destination);
};
const playReal = async (): Promise<void> => {
  const el = audioEl.value;
  if (!el) return;
  ensureGraph();
  if (audioCtx?.state === 'suspended') await audioCtx.resume();
  try {
    await el.play();
  } catch {
    // Autoplay blocked until a user gesture — ignore
  }
};

const stopTick = (): void => {
  if (tick) cancelAnimationFrame(tick);
  tick = null;
};
const runTick = (): void => {
  stopTick();
  let last = performance.now();
  const step = (n: number): void => {
    const dt = (n - last) / 1000;
    last = n;
    if (playing.value && !hasAudio.value) {
      progress.value += dt / durSec.value;
      if (progress.value >= 1) {
        progress.value = 0;
        if (!repeat.value) nextTrack(); // repeat-one: stay on the same track
      }
    }
    tick = requestAnimationFrame(step);
  };
  tick = requestAnimationFrame(step);
};

const sizeCanvas = (): void => {
  const c = canvas.value;
  if (!c) return;
  const r = c.getBoundingClientRect();
  c.width = r.width * (window.devicePixelRatio || 1);
  c.height = r.height * (window.devicePixelRatio || 1);
};

const toggle = (): void => {
  if (hasAudio.value) {
    if (playing.value) audioEl.value?.pause();
    else void playReal();
  } else {
    playing.value = !playing.value;
  }
};
const select = (i: number): void => {
  audioEl.value?.pause();
  current.value = i;
  progress.value = 0;
  // Wait for :src to update to the newly selected track before playing
  nextTick(() => {
    if (hasAudio.value) void playReal();
    else playing.value = true;
  });
};
const seek = (e: MouseEvent): void => {
  const bar = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (e.clientX - bar.left) / bar.width));
  progress.value = ratio;
  const el = audioEl.value;
  if (hasAudio.value && el && el.duration) el.currentTime = ratio * el.duration;
};

/** Absolute, shareable deep link that autoplays the current track (?track=id). */
const shareUrl = (): string =>
  window.location.origin +
  router.resolve({ name: 'soundtrack', query: { track: cur.value.id } }).href;

/** Copy a deep link to the current song to the clipboard, with a fallback. */
const share = async (): Promise<void> => {
  const url = shareUrl();
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // Clipboard API needs a secure context — fall back to a hidden textarea.
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch {
      // Nothing more we can do; leave the user without feedback.
    }
    document.body.removeChild(ta);
  }
  copied.value = true;
  if (copiedTimer) clearTimeout(copiedTimer);
  copiedTimer = window.setTimeout(() => (copied.value = false), 1600);
};

// Audio element event handlers
const onPlay = (): void => {
  playing.value = true;
  startViz();
};
const onPause = (): void => {
  playing.value = false;
};
const onTime = (): void => {
  const el = audioEl.value;
  if (!el) return;
  const d = el.duration || durSec.value;
  if (d) progress.value = Math.min(1, el.currentTime / d);
};
const onEnded = (): void => {
  nextTrack();
  nextTick(() => {
    progress.value = 0;
    if (hasAudio.value) void playReal();
    else playing.value = true; // Continue into the preview-only track
  });
};

const onVis = (): void => {
  if (document.hidden) stopViz();
  else startViz();
};

const pad2 = (n: number): string => String(n).padStart(2, '0');
</script>

<style scoped lang="scss">
// ===== Player =====
.player {
  padding: clamp(1.3rem, 3vw, 2rem);
  display: grid;
  gap: 1.3rem;
}

.player__top {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.player__btn {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 1px solid var(--bd-crimson);
  background: rgba(200,16,46,0.1);
  color: var(--bd-bone);
  display: grid;
  place-items: center;
  flex: none;
  transition: all .3s ease;
}

.player__btn:hover {
  background: var(--bd-crimson);
  box-shadow: 0 0 26px -4px var(--bd-crimson);
}

.player__btn svg {
  width: 22px;
  height: 22px;
}

.player__meta {
  flex: 1;
  min-width: 180px;
}

.player__title {
  font-family: var(--f-display);
  font-size: 1.5rem;
  line-height: 1;
}

.player__artist {
  font-size: 0.8rem;
  color: var(--bd-bone-mute);
  font-family: var(--f-ui);
  letter-spacing: 0.1em;
}

.player__controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.player__ctrl {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: transparent;
  color: var(--bd-bone-mute);
  display: grid;
  place-items: center;
  flex: none;
  cursor: pointer;
  transition: color .25s ease, background .25s ease, border-color .25s ease;
}

.player__ctrl:hover {
  color: var(--bd-bone);
  background: rgba(200,16,46,0.08);
}

.player__ctrl.is-active {
  color: var(--bd-crimson-hi);
  border-color: rgba(200,16,46,0.5);
  background: rgba(200,16,46,0.12);
}

.player__ctrl.is-copied {
  color: var(--bd-crimson-hi);
}

.player__ctrl svg {
  width: 18px;
  height: 18px;
}

.player__toast {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: var(--bd-charcoal);
  color: var(--bd-bone);
  font-family: var(--f-ui);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.34rem 0.55rem;
  border-radius: var(--rad);
  border: 1px solid var(--bd-ash-line);
  pointer-events: none;
}

.player__viz {
  width: 100%;
  height: 90px;
  display: block;
  border-radius: var(--rad);
  background: linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1));
}

.player__seek {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--f-ui);
  font-size: 0.72rem;
  color: var(--bd-bone-mute);
}

.seek-bar {
  flex: 1;
  height: 4px;
  background: var(--bd-ash);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}

.seek-bar__fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, var(--bd-oxblood), var(--bd-crimson));
  border-radius: 4px;
}

.seek-bar__knob {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bd-bone);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(200,16,46,0.7);
}

.vol {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--bd-bone-mute);
}

.vol input {
  accent-color: var(--bd-crimson);
  width: 90px;
}

// ===== Tracklist =====
.tracklist {
  width: 100%;
  border-collapse: collapse;
}

.tracklist tr {
  border-bottom: 1px solid var(--bd-ash);
  transition: background .25s ease;
  cursor: pointer;
}

.tracklist tr:hover {
  background: rgba(200,16,46,0.06);
}

.tracklist tr.is-playing {
  background: rgba(200,16,46,0.1);
}

.tracklist td {
  padding: 0.85rem 0.8rem;
  font-size: 0.92rem;
}

.tracklist .t-n {
  width: 46px;
  color: var(--bd-bone-mute);
  font-family: var(--f-ui);
}

.tracklist .t-title {
  font-weight: 600;
}

.tracklist .t-artist {
  color: var(--bd-bone-mute);
  font-size: 0.84rem;
}

.tracklist .t-time {
  text-align: right;
  color: var(--bd-bone-dim);
  font-family: var(--f-ui);
  width: 70px;
}

.eq {
  display: inline-flex;
  gap: 2px;
  align-items: flex-end;
  height: 14px;
  margin-right: 0.6rem;
  vertical-align: middle;
}

.eq span {
  width: 3px;
  background: var(--bd-crimson-hi);
  border-radius: 2px;
  height: 30%;
}

.is-playing .eq span {
  animation: eqbar 0.9s ease-in-out infinite;
}

.is-playing .eq span:nth-child(2) {
  animation-delay: .2s;
}

.is-playing .eq span:nth-child(3) {
  animation-delay: .4s;
}

.is-playing .eq span:nth-child(4) {
  animation-delay: .1s;
}

@keyframes eqbar {
  0%,100% {
    height: 25%;
  }
  50% {
    height: 95%;
  }
}

@media (max-width: 620px) {
  .player__seek {
    flex-wrap: wrap;
  }
}
</style>
