<template>
  <section
    class="detail route-host"
    :class="`is-${accent}`"
  >
    <div class="wrap">
      <div class="detail__top">
        <nav
          class="crumb"
          aria-label="Breadcrumb"
        >
          <router-link to="/">
            Home
          </router-link>
          <span class="sep">/</span>
          <router-link to="/characters">
            Characters
          </router-link>
          <span class="sep">/</span>
          <span class="here">{{ char.name }}</span>
        </nav>
        <router-link
          to="/characters"
          class="detail__back"
        >
          &larr; All Characters
        </router-link>
      </div>

      <div class="detail__grid">
        <figure
          ref="portraitEl"
          class="detail__portrait"
        >
          <div
            ref="ambientEl"
            class="detail__ambient"
            aria-hidden="true"
          />
          <img
            :src="char.image"
            :alt="`${char.name} — full character art`"
          >
          <div class="pscrim" />
        </figure>

        <div
          ref="bodyEl"
          class="detail__body"
        >
          <div
            class="detail__rv label"
            :class="{ 'label-steel': isIce }"
          >
            {{ char.role }}
          </div>
          <h1 class="detail__rv detail__name">
            {{ char.name }}
          </h1>
          <div
            class="detail__rv rule-short"
            :style="isIce ? 'background: var(--bd-steel)' : ''"
          />
          <div class="detail__bio">
            <p
              v-for="(p, i) in char.bio"
              :key="i"
              class="detail__rv"
            >
              {{ p }}
            </p>
          </div>
        </div>
      </div>

      <nav
        class="detail__nav"
        aria-label="Character navigation"
      >
        <router-link
          :to="`/characters/${prevC.id}`"
          rel="prev"
        >
          &larr; {{ prevC.name }}
        </router-link>
        <span class="detail__count">{{ idx + 1 }} / {{ len }}</span>
        <router-link
          :to="`/characters/${nextC.id}`"
          rel="next"
        >
          {{ nextC.name }} &rarr;
        </router-link>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @fileoverview CharacterDetail — full-screen, route-based character page
 * (/characters/:id). Resolves the character from the canonical roster via
 * getCharacter(); the route's beforeEnter guard (router/index.ts) redirects
 * unknown ids to /characters, so a mounted view always has one. Full-body
 * art on one side, role / name / multi-paragraph bio on the other, with
 * prev/next navigation that walks the roster order and loops at the ends.
 * Entrance + ambient FX use anime.js and honor prefers-reduced-motion.
 */
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { animate, stagger } from 'animejs';
import {
  mountEmbers,
  mountShards,
  prefersReducedMotion,
} from '@/utils/atmosphere';
import type { FxController, SimpleController } from '@/utils/atmosphere';
import { accentFor, characters, getCharacter } from '@/data/characters';
import type { Character } from '@/data/characters';

const route = useRoute();
// Guaranteed present: the route guard redirects unknown ids before we mount.
const char = getCharacter(route.params.id as string) as Character;

// Walk the roster order, looping at both ends.
const idx = characters.indexOf(char);
const len = characters.length;
const prevC = characters[(idx - 1 + len) % len];
const nextC = characters[(idx + 1) % len];

const portraitEl = ref<HTMLElement | null>(null);
const ambientEl = ref<HTMLElement | null>(null);
const bodyEl = ref<HTMLElement | null>(null);

let ctrl: FxController | SimpleController | null = null;

const accent = computed<'ice' | 'ember'>(() => accentFor(char));
const isIce = computed<boolean>(() => accent.value === 'ice');

onMounted(() => {
  // Ambient FX (decorative): ice shards for the ice accent, embers otherwise.
  ctrl = isIce.value
    ? mountShards(ambientEl.value, 9)
    : mountEmbers(ambientEl.value, 30);

  if (prefersReducedMotion()) return;

  // Entrance: staggered text reveal + portrait fade/slide.
  const rv = bodyEl.value
    ? Array.from(bodyEl.value.querySelectorAll<HTMLElement>('.detail__rv'))
    : [];
  if (rv.length)
    animate(rv, {
      opacity: [0.35, 1],
      translateY: [16, 0],
      delay: stagger(60),
      duration: 560,
      ease: 'outExpo',
    });
  const img = portraitEl.value?.querySelector<HTMLElement>('img');
  if (img)
    animate(img, {
      opacity: [0, 1],
      translateX: [-24, 0],
      scale: [1.03, 1],
      duration: 720,
      ease: 'outExpo',
    });
});

onUnmounted(() => ctrl?.destroy());
</script>

<style scoped lang="scss">
// ===== Character detail =====
.detail {
  padding-top: calc(var(--nav-h) + clamp(1.5rem, 5vh, 3rem));
  padding-bottom: clamp(2rem, 6vh, 4rem);
  position: relative;
}

.detail__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: clamp(1.4rem, 4vw, 2.6rem);
}

.detail__back {
  font-family: var(--f-ui);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--bd-bone-dim);
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  transition: color .3s;
}

.detail__back:hover {
  color: var(--bd-crimson-hi);
}

.detail.is-ice .detail__back:hover {
  color: var(--bd-steel);
}

.detail__grid {
  display: grid;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  grid-template-columns: 1fr;
  align-items: start;
}

@media (min-width: 900px) {
  .detail__grid {
    grid-template-columns: 0.85fr 1.15fr;
  }
}

// Full-body art: show the WHOLE figure (contain), melted into a themed plinth.
.detail__portrait {
  position: relative;
  border-radius: var(--rad);
  overflow: hidden;
  border: 1px solid var(--bd-ash);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 320px;
  background:
    radial-gradient(120% 78% at 50% 100%, rgba(139,0,0,0.32), transparent 62%),
    linear-gradient(180deg, #0c0c11, #15090c);
}

.detail.is-ice .detail__portrait {
  background:
    radial-gradient(120% 78% at 50% 100%, rgba(58,107,140,0.34), transparent 62%),
    linear-gradient(180deg, #0c0c11, #0b1016);
}

.detail__ambient {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.detail__portrait img {
  position: relative;
  z-index: 1;
  width: auto;
  max-width: 100%;
  max-height: 74vh;
  object-fit: contain;
  object-position: bottom center;
  display: block;
}

.detail__portrait .pscrim {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 66%, rgba(10,10,12,0.6) 90%, rgba(10,10,12,0.92));
}

.detail__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.detail__name {
  font-family: var(--f-display);
  font-size: var(--t-h1);
  line-height: 1;
  margin: 0.4rem 0 0.5rem;
}

.detail__body .rule-short {
  margin-bottom: 1.4rem;
}

.detail__bio p {
  font-size: var(--t-lead);
  color: var(--bd-bone-dim);
}

.detail__bio p + p {
  margin-top: 1.1rem;
}

.detail.is-ice .detail__name {
  text-shadow: 0 0 30px rgba(127,181,214,0.35);
}

.detail.is-ember .detail__name {
  text-shadow: 0 0 30px rgba(200,16,46,0.35);
}

.detail__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: clamp(2rem,5vw,3.5rem);
  padding-top: 1.4rem;
  border-top: 1px solid var(--bd-ash);
  flex-wrap: wrap;
}

.detail__nav a {
  font-family: var(--f-ui);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--bd-bone-dim);
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  transition: color .3s;
}

.detail__nav a:hover {
  color: var(--bd-crimson-hi);
}

.detail.is-ice .detail__nav a:hover {
  color: var(--bd-steel);
}

.detail__count {
  font-family: var(--f-ui);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--bd-bone-mute);
  white-space: nowrap;
}

// Mobile: stacked (image on top), figure scaled so it's fully visible.
@media (max-width: 899px) {
  .detail__portrait {
    min-height: 240px;
  }
  .detail__portrait img {
    max-height: 56vh;
  }
}
</style>
