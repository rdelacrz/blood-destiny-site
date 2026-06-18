<script setup lang="ts">
/* =====================================================================
   Characters — playable + supporting rosters rendered from the canonical
   roster. Each card is a <router-link> to its dedicated detail page
   (/characters/:id); there is no longer an in-page modal.
   ===================================================================== */
import BreadCrumb from "../components/BreadCrumb.vue";
import {
  accentFor,
  cardHook,
  cardPortrait,
  playableCharacters,
  supportingCharacters,
} from "../data/characters";

const playable = playableCharacters;
const supporting = supportingCharacters;

const badge = (role: string): string => role.split("·")[0].trim();
</script>

<template>
  <div class="route-host">
    <div class="wrap page-head">
      <BreadCrumb here="Characters" />
      <div class="label" style="margin-top: 1.4rem">The Roster</div>
      <h1>Those who walk into the dark</h1>
      <p class="lead page-intro">
        Mercenaries, casters and Synchronizers of Olympia &mdash; each carrying their own ambitions,
        grief and secrets into the world of 2245.
      </p>
    </div>

    <section class="section" style="padding-top: 1rem">
      <div class="wrap">
        <div class="group-label">
          <span class="label">Playable Characters</span><span class="line"></span>
        </div>
        <div class="char-grid" v-reveal="{ sel: '.char-card', stagger: 70, y: 34 }">
          <router-link
            v-for="c in playable"
            :key="c.id"
            class="char-card"
            :class="{ ice: accentFor(c) === 'ice' }"
            :to="`/characters/${c.id}`"
            :aria-label="'View ' + c.name"
          >
            <img class="char-card__img" :src="cardPortrait(c)" :alt="c.name" loading="lazy" />
            <div class="char-card__scrim"></div>
            <div class="char-card__glow"></div>
            <span class="char-card__badge">{{ badge(c.role) }}</span>
            <div class="char-card__body">
              <div class="char-card__rank">{{ c.role }}</div>
              <div class="char-card__name">{{ c.name }}</div>
              <p class="char-card__hook">{{ cardHook(c) }}</p>
              <div class="char-card__more">Read More <span>&rarr;</span></div>
            </div>
          </router-link>
        </div>

        <div class="group-label" style="margin-top: 3rem">
          <span class="label label-steel">Supporting Characters</span><span class="line"></span>
        </div>
        <div class="char-grid" v-reveal="{ sel: '.char-card', stagger: 70, y: 34 }">
          <router-link
            v-for="c in supporting"
            :key="c.id"
            class="char-card"
            :class="{ ice: accentFor(c) === 'ice' }"
            :to="`/characters/${c.id}`"
            :aria-label="'View ' + c.name"
          >
            <img class="char-card__img" :src="cardPortrait(c)" :alt="c.name" loading="lazy" />
            <div class="char-card__scrim"></div>
            <div class="char-card__glow"></div>
            <span class="char-card__badge">{{ badge(c.role) }}</span>
            <div class="char-card__body">
              <div class="char-card__rank">{{ c.role }}</div>
              <div class="char-card__name">{{ c.name }}</div>
              <p class="char-card__hook">{{ cardHook(c) }}</p>
              <div class="char-card__more">Read More <span>&rarr;</span></div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
