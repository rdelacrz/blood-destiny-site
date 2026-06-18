<script setup lang="ts">
/* =====================================================================
   Home — the hero centerpiece (parallax background, drifting embers +
   red haze, word-reveal tagline) followed by the world teaser section.
   ===================================================================== */
import { onMounted, onUnmounted, ref } from "vue";
import {
  mountEmbers,
  mountHaze,
  mountParallax,
  pauseWhenOffscreen,
  prefersReducedMotion,
  revealWords,
} from "../composables/atmosphere";
import type { FxController, SimpleController } from "../composables/atmosphere";
import { ASSETS, TAGLINE } from "../data/site";

const A = ASSETS;
const tagline = TAGLINE;

const hero = ref<HTMLElement | null>(null);
const bg = ref<HTMLElement | null>(null);
const emberHost = ref<HTMLElement | null>(null);
const hazeHost = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);

let embers: FxController | null = null;
let haze: FxController | null = null;
let plx: SimpleController | null = null;
let offio: SimpleController | null = null;

onMounted(() => {
  // atmosphere (anime.js — decorative; degrades to static if rAF is frozen)
  haze = mountHaze(hazeHost.value);
  embers = mountEmbers(emberHost.value, 60);

  // parallax: bg, haze, embers, content move at different rates
  plx = mountParallax(hero.value, [
    { el: bg.value, depth: 26, scrollFactor: 0.18 },
    { el: hazeHost.value, depth: 16, scrollFactor: 0.12 },
    { el: emberHost.value, depth: -12, scrollFactor: -0.05 },
    { el: content.value, depth: -8, scrollFactor: 0.06 },
  ]);

  // pause embers when hero scrolled away
  offio = pauseWhenOffscreen(hero.value, embers);

  // entrance (CSS-transition driven; frozen-rAF safe)
  const tag = hero.value?.querySelector<HTMLElement>(".hero__tag") ?? null;
  revealWords(tag, { stagger: 45, delay: 600 });
  window.setTimeout(() => hero.value?.classList.add("is-revealed"), 80);
});

onUnmounted(() => {
  embers?.destroy();
  haze?.destroy();
  plx?.destroy();
  offio?.destroy();
});

const scrollDown = (): void => {
  const t = document.getElementById("teaser-anchor");
  if (t)
    window.scrollTo({
      top: t.offsetTop - 60,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
};
</script>

<template>
  <div>
    <section class="hero" ref="hero">
      <div class="hero__parallax">
        <div
          class="hero__bg"
          ref="bg"
          :style="{ backgroundImage: `url(${A.bg.tower})` }"
        ></div>
      </div>
      <div ref="hazeHost" style="position: absolute; inset: 0; z-index: 1; pointer-events: none"></div>
      <div class="hero__scrim"></div>
      <div ref="emberHost" style="position: absolute; inset: 0; z-index: 2; pointer-events: none"></div>

      <div class="hero__content" ref="content">
        <div class="hero__present label">Ashes Aflame Presents</div>
        <img class="hero__logo" :src="A.logoColor" alt="Blood Destiny" />
        <p class="hero__tag">{{ tagline }}</p>
        <div class="wip"><span class="wip__dot"></span> Work In Progress&hellip;</div>
      </div>

      <button class="scroll-ind" @click="scrollDown" aria-label="Scroll down">
        <span class="scroll-ind__mouse"></span>
        <span>Scroll</span>
      </button>
    </section>

    <div id="teaser-anchor"></div>
    <section class="section teaser">
      <div class="wrap">
        <div class="teaser__grid">
          <div v-reveal="{ stagger: 90 }">
            <div class="label">The World of 2245</div>
            <h2
              class="display"
              style="font-size: var(--t-h2); margin: 0.8rem 0 1rem; text-wrap: balance"
            >
              Two centuries after the world broke, four supernations rule what remains.
            </h2>
            <p class="lead" style="max-width: 54ch">
              A young mercenary named Jack Smith hunts supernatural threats for the organization
              Olympia &mdash; and is drawn toward legendary creatures, lost civilizations, and the
              unsolved mysteries of his own past.
            </p>
            <div class="cta-row">
              <router-link to="/about" class="btn btn-primary"
                >Enter the Story <span class="arr">&rarr;</span></router-link
              >
              <router-link to="/characters" class="btn"
                >Meet the Cast <span class="arr">&rarr;</span></router-link
              >
            </div>
          </div>
          <div class="surface year-card" v-reveal="{ y: 30, delay: 120 }">
            <div class="label label-steel">Anno Bellum</div>
            <div class="big">22<span class="em">45</span></div>
            <hr class="rule" style="margin: 1.2rem 0" />
            <p class="muted" style="font-size: 0.92rem">
              Synchronizers. Mana circuits. Ki energy. Meta-humans bound to the supernations of
              <span class="text-steel">Arc Novelia</span> and the
              <span class="text-crimson">Kyoudan Empire</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
