<template>
  <div
    ref="root"
    class="loader">
    <div class="loader__inner">
      <img
        class="loader__logo"
        :src="logoWhite"
        alt="Blood Destiny">
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
