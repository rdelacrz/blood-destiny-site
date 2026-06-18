<script setup lang="ts">
/* =====================================================================
   BackgroundSystem — cross-fades a full-bleed background image per route
   (route.meta.bg → ASSETS.bg key). Keeps the previous layer mounted for
   one tick so the new one can fade in over it.
   ===================================================================== */
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ASSETS } from "../data/site";
import type { BackgroundKey } from "../data/site";

const route = useRoute();
const bgMap = ASSETS.bg;

const cur = ref<string | null>(null);
const prev = ref<string | null>(null);
const active = ref(false);

const keyFor = (): BackgroundKey =>
  (route.meta.bg as BackgroundKey | undefined) ?? "tower";

const swap = (): void => {
  const next = bgMap[keyFor()] ?? bgMap.tower;
  if (next === cur.value) return;
  prev.value = cur.value;
  cur.value = next;
  active.value = false;
  nextTick(() => requestAnimationFrame(() => (active.value = true)));
};

onMounted(swap);
watch(() => route.path, swap);
</script>

<template>
  <div class="bg-system" aria-hidden="true">
    <div
      class="bg-layer"
      v-if="prev"
      :style="{ backgroundImage: `url(${prev})` }"
      :class="{ 'is-active': !active }"
    ></div>
    <div
      class="bg-layer"
      v-if="cur"
      :style="{ backgroundImage: `url(${cur})` }"
      :class="{ 'is-active': active }"
    ></div>
  </div>
</template>
