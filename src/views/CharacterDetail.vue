<script setup lang="ts">
/* =====================================================================
   CharacterDetail — full-screen, route-based character page
   (/characters/:id). Resolves the character from the canonical roster via
   getCharacter(); the route's beforeEnter guard (router/index.ts) redirects
   unknown ids to /characters, so a mounted view always has one. Full-body
   art on one side, role / name / multi-paragraph bio on the other, with
   prev/next navigation that walks the roster order and loops at the ends.
   Entrance + ambient FX use anime.js and honor prefers-reduced-motion.
   ===================================================================== */
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { animate, stagger } from "animejs";
import {
  mountEmbers,
  mountShards,
  prefersReducedMotion,
} from "../composables/atmosphere";
import type { FxController, SimpleController } from "../composables/atmosphere";
import { accentFor, characters, getCharacter } from "../data/characters";
import type { Character } from "../data/characters";

const route = useRoute();
// Guaranteed present: the route guard redirects unknown ids before we mount.
const char = getCharacter(route.params.id as string) as Character;

const accent = computed<"ice" | "ember">(() => accentFor(char));
const isIce = computed<boolean>(() => accent.value === "ice");

// Walk the roster order, looping at both ends.
const idx = characters.indexOf(char);
const len = characters.length;
const prevC = characters[(idx - 1 + len) % len];
const nextC = characters[(idx + 1) % len];

const portraitEl = ref<HTMLElement | null>(null);
const ambientEl = ref<HTMLElement | null>(null);
const bodyEl = ref<HTMLElement | null>(null);

let ctrl: FxController | SimpleController | null = null;

onMounted(() => {
  // Ambient FX (decorative): ice shards for the ice accent, embers otherwise.
  ctrl = isIce.value
    ? mountShards(ambientEl.value, 9)
    : mountEmbers(ambientEl.value, 30);

  if (prefersReducedMotion()) return;

  // Entrance: staggered text reveal + portrait fade/slide.
  const rv = bodyEl.value
    ? Array.from(bodyEl.value.querySelectorAll<HTMLElement>(".detail__rv"))
    : [];
  if (rv.length)
    animate(rv, {
      opacity: [0.35, 1],
      translateY: [16, 0],
      delay: stagger(60),
      duration: 560,
      ease: "outExpo",
    });
  const img = portraitEl.value?.querySelector<HTMLElement>("img");
  if (img)
    animate(img, {
      opacity: [0, 1],
      translateX: [-24, 0],
      scale: [1.03, 1],
      duration: 720,
      ease: "outExpo",
    });
});

onUnmounted(() => ctrl?.destroy());
</script>

<template>
  <section class="detail route-host" :class="`is-${accent}`">
    <div class="wrap">
      <div class="detail__top">
        <nav class="crumb" aria-label="Breadcrumb">
          <router-link to="/">Home</router-link>
          <span class="sep">/</span>
          <router-link to="/characters">Characters</router-link>
          <span class="sep">/</span>
          <span class="here">{{ char.name }}</span>
        </nav>
        <router-link to="/characters" class="detail__back">
          &larr; All Characters
        </router-link>
      </div>

      <div class="detail__grid">
        <figure class="detail__portrait" ref="portraitEl">
          <div class="detail__ambient" ref="ambientEl" aria-hidden="true"></div>
          <img :src="char.image" :alt="`${char.name} — full character art`" />
          <div class="pscrim"></div>
        </figure>

        <div class="detail__body" ref="bodyEl">
          <div class="detail__rv label" :class="{ 'label-steel': isIce }">
            {{ char.role }}
          </div>
          <h1 class="detail__rv detail__name">{{ char.name }}</h1>
          <div
            class="detail__rv rule-short"
            :style="isIce ? 'background: var(--bd-steel)' : ''"
          ></div>
          <div class="detail__bio">
            <p class="detail__rv" v-for="(p, i) in char.bio" :key="i">{{ p }}</p>
          </div>
        </div>
      </div>

      <nav class="detail__nav" aria-label="Character navigation">
        <router-link :to="`/characters/${prevC.id}`" rel="prev">
          &larr; {{ prevC.name }}
        </router-link>
        <span class="detail__count">{{ idx + 1 }} / {{ len }}</span>
        <router-link :to="`/characters/${nextC.id}`" rel="next">
          {{ nextC.name }} &rarr;
        </router-link>
      </nav>
    </div>
  </section>
</template>
