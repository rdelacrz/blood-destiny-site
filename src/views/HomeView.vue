<template>
  <div>
    <section
      ref="hero"
      class="hero"
    >
      <div class="hero__parallax">
        <div
          ref="bg"
          class="hero__bg"
          :style="{ backgroundImage: `url(${A.bg.tower})` }"
        />
      </div>
      <div
        ref="hazeHost"
        style="position: absolute; inset: 0; z-index: 1; pointer-events: none"
      />
      <div class="hero__scrim" />
      <div
        ref="emberHost"
        style="position: absolute; inset: 0; z-index: 2; pointer-events: none"
      />

      <div
        ref="content"
        class="hero__content"
      >
        <div class="hero__present label">
          Ashes Aflame Presents
        </div>
        <!-- The logo image carries the brand visually; this visually-hidden
             <h1> gives the home page a real, crawlable page heading for SEO. -->
        <h1 class="sr-only">
          Blood Destiny — A Visual Novel by Ashes Aflame
        </h1>
        <img
          class="hero__logo"
          :src="A.logoColor"
          alt="Blood Destiny"
        >
        <p class="hero__tag">
          {{ tagline }}
        </p>
        <div class="wip">
          <span class="wip__dot" /> Work In Progress&hellip;
        </div>
      </div>

      <button
        class="scroll-ind"
        aria-label="Scroll down"
        @click="scrollDown"
      >
        <span class="scroll-ind__mouse" />
        <span>Scroll</span>
      </button>
    </section>

    <div id="teaser-anchor" />
    <section class="section teaser">
      <div class="wrap">
        <div class="teaser__grid">
          <div v-reveal="{ stagger: 90 }">
            <div class="label">
              The World of 2245
            </div>
            <h2
              class="display"
              style="font-size: var(--t-h2); margin: 0.8rem 0 1rem; text-wrap: balance"
            >
              Two centuries after the world broke, four supernations rule what remains.
            </h2>
            <p
              class="lead"
              style="max-width: 54ch"
            >
              A young mercenary named Jack Smith hunts supernatural threats for the organization
              Olympia &mdash; and is drawn toward legendary creatures, lost civilizations, and the
              unsolved mysteries of his own past.
            </p>
            <div class="cta-row">
              <router-link
                to="/about"
                class="btn btn-primary"
              >
                Enter the Story <span class="arr">&rarr;</span>
              </router-link>
              <router-link
                to="/characters"
                class="btn"
              >
                Meet the Cast <span class="arr">&rarr;</span>
              </router-link>
            </div>
          </div>
          <div
            v-reveal="{ y: 30, delay: 120 }"
            class="surface year-card"
          >
            <div class="label label-steel">
              Anno Bellum
            </div>
            <div class="big">
              22<span class="em">45</span>
            </div>
            <hr
              class="rule"
              style="margin: 1.2rem 0"
            >
            <p
              class="muted"
              style="font-size: 0.92rem"
            >
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

<script setup lang="ts">
/**
 * @fileoverview Home — the hero centerpiece (parallax background, drifting embers +
 * red haze, word-reveal tagline) followed by the world teaser section.
 */
import { onMounted, onUnmounted, ref } from 'vue';
import {
  mountEmbers,
  mountHaze,
  mountParallax,
  pauseWhenOffscreen,
  prefersReducedMotion,
  revealWords,
} from '@/utils/atmosphere';
import type { FxController, SimpleController } from '@/utils/atmosphere';
import { ASSETS, TAGLINE } from '@/data/site';

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
  // Atmosphere (anime.js — decorative; degrades to static if rAF is frozen)
  haze = mountHaze(hazeHost.value);
  embers = mountEmbers(emberHost.value, 60);

  // Parallax: bg, haze, embers, content move at different rates
  plx = mountParallax(hero.value, [{
    el: bg.value,
    depth: 26,
    scrollFactor: 0.18
  }, {
    el: hazeHost.value,
    depth: 16,
    scrollFactor: 0.12
  }, {
    el: emberHost.value,
    depth: -12,
    scrollFactor: -0.05
  }, {
    el: content.value,
    depth: -8,
    scrollFactor: 0.06
  }]);

  // Pause embers when hero scrolled away
  offio = pauseWhenOffscreen(hero.value, embers);

  // Entrance (CSS-transition driven; frozen-rAF safe)
  const tag = hero.value?.querySelector<HTMLElement>('.hero__tag') ?? null;
  revealWords(tag, { stagger: 45, delay: 600 });
  window.setTimeout(() => hero.value?.classList.add('is-revealed'), 80);
});

onUnmounted(() => {
  embers?.destroy();
  haze?.destroy();
  plx?.destroy();
  offio?.destroy();
});

const scrollDown = (): void => {
  const t = document.getElementById('teaser-anchor');
  if (t)
    window.scrollTo({
      top: t.offsetTop - 60,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
};
</script>

<style scoped lang="scss">
// Visually hide the SEO <h1> while keeping it available to crawlers and
// screen readers (standard sr-only / clip pattern).
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// ===== Hero =====
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: center;
  overflow: hidden;
}

.hero__parallax {
  position: absolute;
  inset: -6%;
  z-index: 0;
}

.hero__bg {
  position: absolute;
  inset: -8%;
  background-size: cover;
  background-position: 50% 30%;
  will-change: transform;
}

// Soft dark radial scrim behind the hero text cluster (static; keeps art visible)
.hero__scrim {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    radial-gradient(ellipse 72% 58% at 50% 46%,
      rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.5) 32%, rgba(0,0,0,0.26) 56%, transparent 74%),
    linear-gradient(180deg, transparent 60%, rgba(8,6,8,0.45) 100%);
}

.hero__content {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: var(--maxw);
  margin-inline: auto;
  padding-inline: var(--gut);
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 1.2rem;
  padding-top: var(--nav-h);
}

.hero__present {
  opacity: 0;
  color: var(--bd-bone);
  text-shadow: 0 2px 14px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.6);
}

.hero__logo {
  width: min(78vw, 540px);
  opacity: 0;
  // Tight dark halo so the crimson "BLOOD" reads on the bright planet, + soft ambient
  filter:
    drop-shadow(0 0 2px rgba(0,0,0,0.92))
    drop-shadow(0 0 6px rgba(0,0,0,0.7))
    drop-shadow(0 0 22px rgba(0,0,0,0.55))
    drop-shadow(0 14px 44px rgba(0,0,0,0.6));
}

.hero__tag {
  max-width: 30ch;
  font-family: var(--f-display);
  font-size: var(--t-lead);
  font-style: italic;
  color: var(--bd-bone);
  line-height: 1.5;
  text-shadow: 0 2px 16px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.7);
}

.wip {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-family: var(--f-ui);
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--bd-crimson-hi);
  padding: 0.55em 1.2em;
  border: 1px solid rgba(200,16,46,0.65);
  border-radius: 100px;
  background: rgba(10,10,12,0.66);
  backdrop-filter: blur(6px);
  box-shadow: 0 6px 22px -8px rgba(0,0,0,0.7);
  opacity: 0;
}

.wip__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--bd-crimson);
  box-shadow: 0 0 10px 2px var(--bd-crimson);
}

// Scroll indicator
.scroll-ind {
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  z-index: 4;
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  opacity: 0;
  font-family: var(--f-ui);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--bd-bone-mute);
}

.scroll-ind__mouse {
  width: 22px;
  height: 34px;
  border: 1.5px solid var(--bd-bone-mute);
  border-radius: 12px;
  position: relative;
}

.scroll-ind__mouse::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 6px;
  width: 3px;
  height: 6px;
  background: var(--bd-crimson-hi);
  border-radius: 2px;
  transform: translateX(-50%);
}

// Hero entrance (CSS-driven; frozen-rAF safe)
.hero__present, .hero__logo, .wip {
  transform: translateY(16px);
  transition: opacity 1s var(--ease-out), transform 1s var(--ease-out);
}

.scroll-ind {
  transition: opacity 1s ease;
}

.hero.is-revealed .hero__present {
  opacity: 1;
  transform: none;
  transition-delay: .25s;
}

.hero.is-revealed .hero__logo {
  opacity: 1;
  transform: none;
  transition-delay: .5s;
}

.hero.is-revealed .wip {
  opacity: 1;
  transform: none;
  transition-delay: 1.05s;
}

.hero.is-revealed .scroll-ind {
  opacity: 1;
  transition-delay: 1.35s;
}

@media (prefers-reduced-motion: no-preference) {
  .wip__dot {
    animation: wipPulse 1.25s ease-in-out infinite alternate;
  }
  .scroll-ind__mouse::after {
    animation: scrollDot 1.7s ease-in-out infinite;
  }
}

@keyframes wipPulse {
  from {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 10px 2px rgba(200,16,46,0.9);
  }
  to {
    transform: scale(1.5);
    opacity: .4;
    box-shadow: 0 0 18px 5px rgba(200,16,46,0.2);
  }
}

@keyframes scrollDot {
  0% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  70% {
    transform: translate(-50%, 11px);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, 0);
    opacity: 0;
  }
}

// ===== Teaser strip / CTA (below hero) =====
.teaser {
  position: relative;
  z-index: 2;
}

.teaser__grid {
  display: grid;
  gap: clamp(1.5rem, 4vw, 3rem);
  grid-template-columns: 1fr;
  align-items: center;
}

@media (min-width: 880px) {
  .teaser__grid {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.6rem;
}

.year-card {
  padding: clamp(1.4rem, 3vw, 2.4rem);
}

.year-card .big {
  font-family: var(--f-display);
  font-size: clamp(3.4rem, 9vw, 6rem);
  line-height: 0.9;
  color: var(--bd-bone);
}

.year-card .big .em {
  color: var(--bd-crimson-hi);
}
</style>
