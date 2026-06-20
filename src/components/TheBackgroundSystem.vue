<template>
  <div
    class="bg-system"
    aria-hidden="true"
  >
    <div
      v-if="prev"
      class="bg-layer"
      :style="{ backgroundImage: `url(${prev})` }"
      :class="{ 'is-active': !active }"
    />
    <div
      v-if="cur"
      class="bg-layer"
      :style="{ backgroundImage: `url(${cur})` }"
      :class="{ 'is-active': active }"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview BackgroundSystem — cross-fades a full-bleed background image per route
 * (route.meta.bg → ASSETS.bg key). Keeps the previous layer mounted for
 * one tick so the new one can fade in over it.
 */
import { nextTick, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ASSETS } from '@/data/site';
import type { BackgroundKey } from '@/data/site';

const route = useRoute();
const bgMap = ASSETS.bg;

const cur = ref<string | null>(null);
const prev = ref<string | null>(null);
const active = ref(false);

watch(() => route.path, () => swap());
onMounted(() => swap());

const keyFor = (): BackgroundKey =>
  (route.meta.bg as BackgroundKey | undefined) ?? 'tower';

const swap = (): void => {
  const next = bgMap[keyFor()] ?? bgMap.tower;
  if (next === cur.value) return;
  prev.value = cur.value;
  cur.value = next;
  active.value = false;
  nextTick(() => requestAnimationFrame(() => (active.value = true)));
};
</script>

<style scoped lang="scss">
.bg-system {
  position: fixed;
  inset: 0;
  z-index: -2;
  background: var(--bd-black);
  overflow: hidden;
}

.bg-layer {
  position: absolute;
  inset: -4%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.1s ease, transform 1.1s var(--ease-out);
  transform: scale(1.04);
  will-change: opacity, transform;
}

.bg-layer.is-active {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .bg-layer {
    transition: opacity .4s ease;
    transform: scale(1.02);
  }
}
</style>
