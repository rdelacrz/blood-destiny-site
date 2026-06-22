<template>
  <div class="route-host">
    <div class="wrap page-head">
      <BreadCrumb here="Characters" />
      <div
        class="label"
        style="margin-top: 1.4rem"
      >
        The Roster
      </div>
      <h1>
        Those who walk into the dark
      </h1>
      <p class="lead page-intro">
        Mercenaries, casters and Synchronizers of Olympia &mdash; each carrying their own ambitions,
        grief and secrets into the world of 2245.
      </p>
    </div>

    <section
      class="section"
      style="padding-top: 1rem"
    >
      <div class="wrap">
        <div class="group-label">
          <span class="label">Playable Characters</span><span class="line" />
        </div>
        <div
          v-reveal="{ sel: '.char-card', stagger: 70, y: 34 }"
          class="char-grid"
        >
          <router-link
            v-for="c in playable"
            :key="c.id"
            class="char-card"
            :class="{ ice: accentFor(c) === 'ice' }"
            :to="`/characters/${c.id}`"
            :aria-label="'View ' + c.name"
          >
            <img
              class="char-card__img"
              :src="cardPortrait(c)"
              :alt="c.name"
              loading="lazy"
            >
            <div class="char-card__scrim" />
            <div class="char-card__glow" />
            <span class="char-card__badge">{{ badge(c.role) }}</span>
            <div class="char-card__body">
              <div class="char-card__rank">
                {{ c.role }}
              </div>
              <div class="char-card__name">
                {{ c.name }}
              </div>
              <p class="char-card__hook">
                {{ cardHook(c) }}
              </p>
              <div class="char-card__more">
                Read More <span>&rarr;</span>
              </div>
            </div>
          </router-link>
        </div>

        <div
          class="group-label"
          style="margin-top: 3rem"
        >
          <span class="label label-steel">Supporting Characters</span><span class="line" />
        </div>
        <div
          v-reveal="{ sel: '.char-card', stagger: 70, y: 34 }"
          class="char-grid"
        >
          <router-link
            v-for="c in supporting"
            :key="c.id"
            class="char-card"
            :class="{ ice: accentFor(c) === 'ice' }"
            :to="`/characters/${c.id}`"
            :aria-label="'View ' + c.name"
          >
            <img
              class="char-card__img"
              :src="cardPortrait(c)"
              :alt="c.name"
              loading="lazy"
            >
            <div class="char-card__scrim" />
            <div class="char-card__glow" />
            <span class="char-card__badge">{{ badge(c.role) }}</span>
            <div class="char-card__body">
              <div class="char-card__rank">
                {{ c.role }}
              </div>
              <div class="char-card__name">
                {{ c.name }}
              </div>
              <p class="char-card__hook">
                {{ cardHook(c) }}
              </p>
              <div class="char-card__more">
                Read More <span>&rarr;</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Characters — playable + supporting rosters rendered from the canonical
 * roster. Each card is a <router-link> to its dedicated detail page
 * (/characters/:id); there is no longer an in-page modal.
 */
import BreadCrumb from '@/components/BreadCrumb.vue';
import {
  accentFor,
  cardHook,
  cardPortrait,
  playableCharacters,
  supportingCharacters,
} from '@/data/characters';

const playable = playableCharacters;
const supporting = supportingCharacters;

const badge = (role: string): string => role.split('·')[0].trim();
</script>

<style scoped lang="scss">
// ===== Character cards =====
// Flex (not grid) so an incomplete last row stays CENTERED rather than
// left-aligned. Cards take a fixed fraction of the row via --cols, so every
// card is the same width and full rows fill edge-to-edge; the remainder row
// centers via justify-content. --cols steps down responsively.
.char-grid {
  --grid-gap: clamp(0.9rem, 2vw, 1.4rem);
  --cols: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--grid-gap);
}

@media (max-width: 900px) {
  .char-grid {
    --cols: 2;
  }
}

@media (max-width: 560px) {
  .char-grid {
    --cols: 1;
  }
}

.char-card {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--rad);
  background: var(--bd-charcoal);
  border: 1px solid var(--bd-ash);
  aspect-ratio: 3 / 4.2;
  cursor: pointer;
  flex: 0 0 auto;
  width: calc((100% - (var(--cols) - 1) * var(--grid-gap)) / var(--cols));
}

a.char-card, button.char-card {
  font: inherit;
  color: inherit;
  text-align: left;
  padding: 0;
}

.char-card__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform .6s var(--ease-out), filter .6s ease;
  filter: saturate(0.85) brightness(0.82);
}

.char-card__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 30%, rgba(10,10,12,0.55) 62%, rgba(10,10,12,0.96) 100%);
}

.char-card__glow {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px transparent;
  transition: box-shadow .5s ease;
  pointer-events: none;
}

.char-card__body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem;
  z-index: 2;
}

.char-card__rank {
  font-family: var(--f-ui);
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--bd-crimson-hi);
}

.char-card.ice .char-card__rank {
  color: var(--bd-steel);
}

.char-card__name {
  font-family: var(--f-display);
  font-size: 1.35rem;
  line-height: 1.05;
  margin-top: 0.2rem;
  position: relative;
  display: inline-block;
}

.char-card__name::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  height: 1.5px;
  width: 100%;
  background: var(--bd-crimson);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .4s var(--ease-out);
}

.char-card__hook {
  margin-top: 0.55rem;
  font-size: 0.82rem;
  color: var(--bd-bone-dim);
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height .5s var(--ease-out), opacity .4s ease, margin .4s ease;
}

.char-card__badge {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  z-index: 3;
  font-family: var(--f-ui);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bd-bone);
  padding: 0.35em 0.7em;
  border-radius: 3px;
  background: rgba(200,16,46,0.85);
  backdrop-filter: blur(4px);
  transform: translateY(-130%);
  opacity: 0;
  transition: transform .45s var(--ease-out), opacity .35s ease;
}

.char-card.ice .char-card__badge {
  background: rgba(58,107,140,0.9);
}

.char-card__more {
  margin-top: 0.7rem;
  font-family: var(--f-ui);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--bd-bone-mute);
  display: flex;
  align-items: center;
  gap: 0.4em;
}

.char-card:hover .char-card__img, .char-card:focus-visible .char-card__img {
  transform: scale(1.07);
  filter: saturate(1) brightness(0.95);
}

.char-card:hover .char-card__glow, .char-card:focus-visible .char-card__glow {
  box-shadow: inset 0 0 0 1px var(--bd-crimson), 0 0 40px -6px rgba(200,16,46,0.55);
}

.char-card.ice:hover .char-card__glow, .char-card.ice:focus-visible .char-card__glow {
  box-shadow: inset 0 0 0 1px var(--bd-steel), 0 0 40px -6px rgba(127,181,214,0.5);
}

.char-card:hover .char-card__name::after, .char-card:focus-visible .char-card__name::after {
  transform: scaleX(1);
}

.char-card:hover .char-card__hook, .char-card:focus-visible .char-card__hook {
  max-height: 7rem;
  opacity: 1;
  margin-top: 0.55rem;
}

.char-card:hover .char-card__badge, .char-card:focus-visible .char-card__badge {
  transform: translateY(0);
  opacity: 1;
}

.char-card:hover .char-card__more, .char-card:focus-visible .char-card__more {
  color: var(--bd-crimson-hi);
}

.group-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: clamp(1.4rem,3vw,2.4rem) 0 1.3rem;
}

.group-label .line {
  flex: 1;
  height: 1px;
  background: var(--bd-ash-line);
}
</style>
