<template>
  <div class="route-host">
    <div class="wrap page-head">
      <BreadCrumb here="About" />
      <div
        class="label"
        style="margin-top: 1.4rem"
      >
        About Us
      </div>
      <h1>
        A story years in the making
      </h1>
      <p class="lead page-intro">
        We are a small group of visual novel enthusiasts with a unique set of skill sets, and
        collectively we are known as <strong>Ashes Aflame</strong>. Blood Destiny is a visual novel
        that we have spent years working on behind the scenes.
      </p>
    </div>

    <section class="section">
      <div class="wrap">
        <div
          v-reveal="{}"
          class="sec-head"
        >
          <div class="rule-short" />
          <h2>
            The Story
          </h2>
        </div>
        <div
          class="story"
          style="max-width: 74ch"
        >
          <p
            v-for="(p, i) in story"
            :key="i"
            v-reveal="{ y: 20 }"
            :class="{ drop: i === 0 }"
          >
            {{ p }}
          </p>
        </div>
      </div>
    </section>

    <section class="section promo-section">
      <div class="wrap">
        <figure
          ref="promo"
          v-reveal="{ y: 30 }"
          class="promo-panel"
        >
          <div class="promo-figure">
            <img
              :src="A.promo"
              alt="Jack Smith and Fuyumi Tomoe — promotional key art"
              loading="lazy"
            >
          </div>
          <figcaption class="promo-caption">
            <span class="promo-caption__line" />
            <span class="promo-caption__txt">Jack Smith &amp; Fuyumi Tomoe</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div
          v-reveal="{}"
          class="sec-head center"
        >
          <div class="label">
            What Awaits
          </div>
          <h2>
            More than a story
          </h2>
        </div>
        <div
          v-reveal="{ sel: '.feat', stagger: 90, y: 30 }"
          class="feat-grid"
        >
          <div
            v-for="f in features"
            :key="f.title"
            class="surface feat"
          >
            <svg
              class="feat__icon"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <template v-if="f.motif === 'rune'">
                <path d="M20 4v32M8 12l24 16M32 12L8 28" />
              </template>
              <template v-else-if="f.motif === 'crest'">
                <path d="M20 4l14 6v10c0 9-6 14-14 16-8-2-14-7-14-16V10z" />
              </template>
              <template v-else-if="f.motif === 'blade'">
                <path d="M30 6L14 22l-4 8 8-4L34 10zM12 28l-4 6" />
              </template>
              <template v-else>
                <path d="M6 20h8m12 0h8M20 6v8m0 12v8" />
                <circle
                  cx="20"
                  cy="20"
                  r="6"
                />
              </template>
            </svg>
            <h3>
              {{ f.title }}
            </h3>
            <p>
              {{ f.body }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview About — the studio + story, with a scroll-reactive promo key art and
 * the feature grid (each card draws its own SVG motif).
 */
import { onMounted, onUnmounted, ref } from 'vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { prefersReducedMotion } from '@/utils/atmosphere';
import { ASSETS, FEATURES, STORY } from '@/data/site';

const A = ASSETS;
const story = STORY;
const features = FEATURES;

const promo = ref<HTMLElement | null>(null);
let onScroll: (() => void) | null = null;

onMounted(() => {
  if (!prefersReducedMotion() && promo.value) {
    onScroll = (): void => {
      const host = promo.value;
      if (!host) return;
      const r = host.getBoundingClientRect();
      const off = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const img = host.querySelector<HTMLElement>('img');
      // Keep the parallax shift strictly downward (>= 0): the zoom is anchored
      // to the top edge (see CSS), so any upward shift would lift Jack's hair
      // past the figure's clip. The small baseline also leaves breathing room
      // above his head; scale(1.06) just buries the feet in the bottom fade.
      const shift = Math.max(0, 14 - off * 14);
      if (img) img.style.transform = `translateY(${shift}px) scale(1.06)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});

onUnmounted(() => {
  if (onScroll) window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped lang="scss">
// ===== Section headings =====
.sec-head {
  display: grid;
  gap: 0.9rem;
  margin-bottom: clamp(1.8rem, 4vw, 3rem);
}

.sec-head h2 {
  font-family: var(--f-display);
  font-size: var(--t-h2);
}

.sec-head.center {
  justify-items: center;
  text-align: center;
}

// ===== Feature cards =====
.feat-grid {
  display: grid;
  gap: 1.1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.feat {
  padding: 1.6rem;
  position: relative;
  overflow: hidden;
}

.feat__icon {
  width: 40px;
  height: 40px;
  margin-bottom: 1rem;
  color: var(--bd-crimson-hi);
}

.feat h3 {
  font-family: var(--f-ui);
  font-size: 1rem;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
}

.feat p {
  color: var(--bd-bone-dim);
  font-size: 0.95rem;
}

.feat::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--bd-crimson), transparent);
  opacity: 0.5;
}

// ===== Story + promo =====
.story p + p {
  margin-top: 1.1rem;
}

.story p {
  font-size: var(--t-lead);
  color: var(--bd-bone-dim);
}

.story .drop::first-letter {
  font-family: var(--f-display);
  font-size: 3.4em;
  line-height: 0.7;
  float: left;
  padding: 0.08em 0.14em 0 0;
  color: var(--bd-crimson-hi);
}

// Contained key-art showcase
.promo-section {
  padding-block: clamp(3.5rem, 10vh, 7.5rem);
}

.promo-panel {
  position: relative;
  max-width: 960px;
  margin-inline: auto;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:
    radial-gradient(125% 90% at 50% 102%, rgba(139,0,0,0.5), rgba(110,7,18,0.18) 42%, transparent 68%),
    linear-gradient(180deg, #0c0c11 0%, #15090c 70%, #1a0a0e 100%);
  box-shadow:
    0 50px 120px -36px rgba(0,0,0,0.85),
    0 0 0 1px rgba(200,16,46,0.14),
    0 0 90px -34px rgba(200,16,46,0.45);
}

.promo-figure {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

.promo-figure img {
  max-height: 74vh;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  object-position: bottom center;
  display: block;
  // Anchor the parallax zoom to the top edge: Jack's hair sits flush with the
  // top of the source art, so a center/bottom origin would scale his head out
  // of the clipped figure. Growing downward instead hides the overflow in the
  // bottom fade zone where the feet already melt into the panel.
  transform-origin: center top;
  transition: transform .2s linear;
  will-change: transform;
}

// Melt the figure into the panel: strong bottom fade + soft side vignettes
.promo-figure::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, transparent 68%, rgba(20,10,13,0.6) 88%, rgba(20,10,13,0.95) 100%),
    linear-gradient(90deg, rgba(18,10,13,0.55), transparent 14%, transparent 86%, rgba(18,10,13,0.55));
}

.promo-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(1.1rem, 3.2vh, 2.2rem);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  pointer-events: none;
}

.promo-caption__line {
  width: 56px;
  height: 2px;
  background: var(--bd-crimson);
  opacity: 0.9;
}

.promo-caption__txt {
  font-family: var(--f-ui);
  font-weight: 600;
  font-size: var(--t-label);
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: var(--bd-bone);
  text-shadow: 0 2px 14px rgba(0,0,0,0.85), 0 0 4px rgba(0,0,0,0.7);
}

@media (max-width: 560px) {
  .promo-figure img {
    max-height: 64vh;
  }
  .promo-caption__txt {
    letter-spacing: 0.3em;
    font-size: 0.7rem;
  }
}
</style>
