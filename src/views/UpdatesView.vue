<template>
  <div class="route-host">
    <div class="wrap page-head">
      <BreadCrumb here="Updates" />
      <div
        class="label"
        style="margin-top: 1.4rem"
      >
        Devlog
      </div>
      <h1>
        From behind the scenes
      </h1>
      <p class="lead page-intro">
        Progress notes from the Ashes Aflame team &mdash; new milestones land here as
        development on the world of 2245 continues.
      </p>
    </div>

    <section
      class="section"
      style="padding-top: 1.5rem"
    >
      <div class="wrap">
        <!-- LOADING — skeleton timeline -->
        <div
          v-if="status === 'loading'"
          class="timeline"
          aria-busy="true"
        >
          <span
            class="timeline__line"
            aria-hidden="true"
          />
          <div
            v-for="n in pageSize"
            :key="n"
            class="tl-item tl-item--skeleton"
            :class="{ 'is-right': (n - 1) % 2 === 1 }"
          >
            <span class="tl-item__dot" />
            <div class="tl-item__meta">
              <span class="skeleton skeleton--date" />
            </div>
            <div class="surface tl-item__card">
              <span class="skeleton skeleton--cover" />
              <span class="skeleton skeleton--title" />
              <span class="skeleton skeleton--line" />
              <span class="skeleton skeleton--line short" />
            </div>
          </div>
        </div>

        <!-- ERROR — message + retry -->
        <div
          v-else-if="status === 'error'"
          class="surface state-panel"
        >
          <div class="state-panel__title">
            Couldn't load the devlog
          </div>
          <p class="state-panel__body">
            {{ error }}
          </p>
          <button
            class="btn btn-primary"
            type="button"
            @click="retry"
          >
            Retry
          </button>
        </div>

        <!-- EMPTY -->
        <div
          v-else-if="status === 'empty'"
          class="surface state-panel"
        >
          <div class="state-panel__title">
            No updates yet
          </div>
          <p class="state-panel__body">
            New milestones will appear here as development continues.
          </p>
        </div>

        <!-- SUCCESS — animated timeline -->
        <template v-else>
          <div class="timeline">
            <span
              ref="lineEl"
              class="timeline__line"
              aria-hidden="true"
            />
            <article
              v-for="(u, i) in displayed"
              :key="u.id"
              v-reveal="{ y: 28, delay: revealDelay(i) }"
              class="tl-item"
              :class="{ 'is-right': i % 2 === 1 }"
            >
              <span class="tl-item__dot" />
              <div class="tl-item__meta">
                <span class="tl-item__date">{{ u.date }}</span>
                <span
                  v-if="u.tag"
                  class="tl-item__tag"
                >{{ u.tag }}</span>
              </div>
              <div class="surface tl-item__card">
                <img
                  v-if="u.cover"
                  class="tl-item__cover"
                  :src="u.cover"
                  :alt="`${u.title} cover`"
                  loading="lazy"
                >
                <h3 class="tl-item__title">
                  {{ u.title }}
                </h3>
                <p
                  v-if="u.author"
                  class="tl-item__author"
                >
                  By {{ u.author }}
                </p>
                <!-- First-party CMS content (HTML), matching master's v-html render. -->
                <!-- eslint-disable vue/no-v-html -->
                <div
                  class="tl-item__body"
                  v-html="renderBody(u.body)"
                />
                <!-- eslint-enable vue/no-v-html -->
              </div>
            </article>
          </div>

          <div
            v-if="hasMore"
            class="tl-more"
          >
            <button
              class="btn"
              type="button"
              @click="loadMore"
            >
              Load more
              <span class="tl-more__count">{{ displayed.length }} / {{ total }}</span>
            </button>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Updates — devlog timeline wired to the live feed (useUpdates). Keeps the
 * crimson-connector / ink-panel design: per-item scroll reveal (~60ms
 * stagger), marker pop + connector draw-in, hover lift, all honouring
 * prefers-reduced-motion. Loading / error / empty states and a backend-
 * ordered "Load more" sit on the same reveal. Body copy renders as HTML
 * (first-party CMS content, as on `master`) with any "soundtrack" mention
 * linkified to /soundtrack.
 */
import { nextTick, ref, watch } from 'vue';
import { animate } from 'animejs';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { prefersReducedMotion } from '@/utils/atmosphere';
import { UPDATES_PAGE_SIZE, useUpdates } from '@/composables/useUpdates';

const { displayed, total, status, error, hasMore, pageSize, retry, loadMore } = useUpdates();

const lineEl = ref<HTMLElement | null>(null);

/** Per-item reveal stagger within a page batch (~60ms). */
const revealDelay = (i: number): number => (i % UPDATES_PAGE_SIZE) * 60;

/** Connector draw-in: scale the crimson rail up from the top once entries mount. */
const drawConnector = (): void => {
  const el = lineEl.value;
  if (!el) return;
  if (prefersReducedMotion()) {
    el.style.transform = 'scaleY(1)';
    return;
  }
  animate(el, { scaleY: [0, 1], duration: 700, ease: 'outQuart' });
};

watch(status, (s) => {
  if (s === 'success') nextTick(drawConnector);
});

/**
 * Linkify standalone "soundtrack" mentions to /soundtrack (hash route),
 * transforming only text segments so HTML tags/attributes stay intact.
 */
const SOUNDTRACK_RE = /\bsoundtrack\b/gi;
const renderBody = (body: string): string =>
  body
    .split(/(<[^>]+>)/g)
    .map((seg) =>
      seg.startsWith('<')
        ? seg
        : seg.replace(SOUNDTRACK_RE, '<a href="#/soundtrack" class="ink-link">$&</a>'),
    )
    .join('');
</script>

<style scoped lang="scss">
/* =========================================================
   PAGE ATMOSPHERE — extra scrim tuned to the bright, busy
   temple-entrance art (snow-bright flanks + glowing door).
   Mounts/unmounts with the view, so it's per-route by
   construction: it sits above the shared background system
   (z-index -2) and the global scrim (-1) but below page
   content, darkening only the art the text rides on.
   ========================================================= */
.route-host::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    /* knock the bright snowy top band + foreground down hard */
    linear-gradient(180deg,
      rgba(8, 8, 11, 0.66) 0%, rgba(8, 8, 11, 0.24) 34%,
      rgba(8, 8, 11, 0.3) 64%, rgba(8, 8, 11, 0.62) 100%),
    /* pull shadow into the over-bright snow on the flanks */
    radial-gradient(118% 92% at 50% 32%, transparent 40%, rgba(8, 8, 11, 0.7) 100%);
}

/* =========================================================
   TIMELINE
   ========================================================= */
.timeline {
  position: relative;
  max-width: 880px;
  margin-inline: auto;
}

.timeline__line {
  position: absolute;
  left: 18px;
  top: 0;
  bottom: 0;
  width: 2px;
  /* Hold the rail's lower fade up so the connector still reads where it
     crosses the bright snow; the dark edge keeps it crisp over busy art. */
  background: linear-gradient(180deg, var(--bd-crimson), rgba(200,16,46,0.4));
  box-shadow: 0 0 0 1px rgba(8,8,11,0.55);
  transform-origin: top;
  will-change: transform;
}

.tl-item {
  position: relative;
  padding: 0 0 2.4rem 3.4rem;
}

.tl-item__dot {
  position: absolute;
  left: 11px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bd-black);
  border: 2px solid var(--bd-crimson);
  box-shadow: 0 0 14px rgba(200,16,46,0.6);
  z-index: 1;
}

.tl-item.is-in .tl-item__dot {
  animation: tl-pop 0.5s var(--ease-out) both;
}

@keyframes tl-pop {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

/* The meta row (date + tag) rides directly on the temple art, not on a
   panel — lift the date to bone-dim and give both a dark text-shadow so
   they stay legible over the bright snow. */
.tl-item__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.tl-item__date {
  font-family: var(--f-ui);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--bd-bone-dim);
  text-shadow: 0 1px 4px rgba(8,8,11,0.95);
}

.tl-item__tag {
  display: inline-block;
  font-family: var(--f-ui);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--bd-crimson-hi);
  background: rgba(8,8,11,0.55);
  border: 1px solid rgba(200,16,46,0.45);
  border-radius: 3px;
  padding: 0.15em 0.6em;
  backdrop-filter: blur(2px);
  text-shadow: 0 1px 4px rgba(8,8,11,0.95);
}

/* Card sits over the busy entrance art: push the shared .surface ink to near-
   opaque and deepen the blur so body copy holds high contrast. */
.tl-item__card {
  margin-top: 0.7rem;
  padding: 1.3rem 1.5rem;
  background: linear-gradient(180deg, rgba(18,18,23,0.94), rgba(8,8,11,0.97));
  border-color: rgba(58,58,66,0.85);
  backdrop-filter: blur(10px);
  transition: transform 0.4s var(--ease-out), border-color 0.4s ease, box-shadow 0.4s ease;
}

.tl-item__card:hover {
  transform: translateY(-4px);
  border-color: rgba(200,16,46,0.4);
  box-shadow: 0 14px 34px -16px rgba(0,0,0,0.8), 0 0 26px -10px rgba(200,16,46,0.4);
}

.tl-item__cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--rad);
  border: 1px solid var(--bd-ash);
  filter: saturate(0.9) brightness(0.88);
  margin-bottom: 1rem;
}

.tl-item__title {
  font-family: var(--f-display);
  font-size: 1.5rem;
  margin-bottom: 0.4rem;
}

.tl-item__author {
  font-family: var(--f-ui);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--bd-bone-mute);
  margin-bottom: 0.6rem;
}

.tl-item__body {
  color: var(--bd-bone-dim);
  font-size: 0.95rem;
}

.tl-item__body :deep(p) {
  margin: 0 0 0.7rem;
}

.tl-item__body :deep(p:last-child) {
  margin-bottom: 0;
}

.tl-item__body :deep(a) {
  color: var(--bd-crimson-hi);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.25s ease;
}

.tl-item__body :deep(a:hover) {
  color: var(--bd-bone);
}

/* =========================================================
   ASYNC STATES — error / empty panels + loading skeleton
   ========================================================= */
.state-panel {
  max-width: 600px;
  margin: 1rem auto 0;
  padding: 2.4rem 2rem;
  text-align: center;
}

.state-panel__title {
  font-family: var(--f-display);
  font-size: 1.7rem;
  margin-bottom: 0.6rem;
}

.state-panel__body {
  color: var(--bd-bone-dim);
  margin-bottom: 1.4rem;
  word-break: break-word;
}

.skeleton {
  display: block;
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(245,240,232,0.05), rgba(245,240,232,0.11), rgba(245,240,232,0.05));
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton--date {
  width: 130px;
  height: 12px;
}

.skeleton--cover {
  width: 100%;
  height: 200px;
  border-radius: var(--rad);
  margin-bottom: 1rem;
}

.skeleton--title {
  width: 70%;
  height: 22px;
  margin-bottom: 0.9rem;
}

.skeleton--line {
  width: 100%;
  height: 12px;
  margin-bottom: 0.55rem;
}

.skeleton--line.short {
  width: 55%;
}

/* =========================================================
   LOAD MORE
   ========================================================= */
.tl-more {
  display: flex;
  justify-content: center;
  margin-top: 0.6rem;
}

.tl-more__count {
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  opacity: 0.65;
}

/* =========================================================
   DESKTOP — centered zig-zag rail
   ========================================================= */
@media (min-width: 760px) {
  .timeline__line {
    left: calc(50% - 1px);
  }
  .tl-item {
    width: 50%;
    padding-left: 0;
    padding-right: 3rem;
    text-align: right;
  }
  .tl-item__dot {
    left: auto;
    right: -8px;
  }
  .tl-item__meta {
    justify-content: flex-end;
  }
  .tl-item.is-right {
    margin-left: 50%;
    padding-right: 0;
    padding-left: 3rem;
    text-align: left;
  }
  .tl-item.is-right .tl-item__dot {
    right: auto;
    left: -8px;
  }
  .tl-item.is-right .tl-item__meta {
    justify-content: flex-start;
  }
}

/* =========================================================
   REDUCED MOTION — drop the hover lift / card transition
   ========================================================= */
@media (prefers-reduced-motion: reduce) {
  .tl-item__card {
    transition: none;
  }
  .tl-item__card:hover {
    transform: none;
  }
}
</style>
