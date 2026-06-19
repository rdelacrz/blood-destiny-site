<template>
  <div
    ref="root"
    class="loader"
  >
    <div class="loader__inner">
      <img
        class="loader__logo"
        :src="logoWhite"
        alt="Blood Destiny"
      >
      <div class="loader__line" />
      <div class="loader__label">
        Ashes Aflame
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* =====================================================================
   Loader — CSS-driven entrance/exit overlay shown until the app is ready.
   Timer-driven (not rAF) so it still finishes if the tab is throttled.
   ===================================================================== */
import { onMounted, onUnmounted, ref } from 'vue';
import { prefersReducedMotion } from '@/composables/atmosphere';
import { ASSETS } from '@/data/site';

const emit = defineEmits<{ done: [] }>();

const root = ref<HTMLElement | null>(null);
const logoWhite = ASSETS.logoWhite;

let done = false;
let safety: number | null = null;
let animT: number | null = null;

onMounted(() => {
  const reduced = prefersReducedMotion();
  animT = window.setTimeout(() => root.value?.classList.add('is-anim'), 60);
  safety = window.setTimeout(finish, reduced ? 800 : 2600);
});

onUnmounted(() => {
  if (safety !== null) clearTimeout(safety);
  if (animT !== null) clearTimeout(animT);
});

const finish = (): void => {
  if (done) return;
  done = true;
  if (safety !== null) {
    clearTimeout(safety);
    safety = null;
  }
  root.value?.classList.add('is-out');
  emit('done');
};
</script>

<style scoped>
/* CSS-driven entrance/exit overlay. `is-anim` / `is-out` are toggled on the
   root element from script setup. */
.loader {
  position: fixed; inset: 0; z-index: 200;
  display: grid; place-items: center;
  background: radial-gradient(120% 120% at 50% 40%, #15060a 0%, var(--bd-black) 60%);
  transition: opacity .6s ease;
}
.loader__inner { display: grid; justify-items: center; gap: 1.4rem; }
.loader__logo { width: min(54vw, 320px); opacity: 0; transform: translateY(12px) scale(0.9); filter: drop-shadow(0 0 28px rgba(200,16,46,0.5)); transition: opacity 1s var(--ease-out), transform 1s var(--ease-out); }
.loader__line { width: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--bd-crimson), transparent); transition: width .8s var(--ease-out) .5s; }
.loader__label { font-family: var(--f-ui); letter-spacing: 0.5em; font-size: 0.66rem; text-transform: uppercase; color: var(--bd-bone-mute); opacity: 0; transition: opacity .8s ease .8s; }
.loader.is-anim .loader__logo { opacity: 1; transform: none; }
.loader.is-anim .loader__line { width: 220px; }
.loader.is-anim .loader__label { opacity: 1; }
.loader.is-out { pointer-events: none; opacity: 0; }
</style>
