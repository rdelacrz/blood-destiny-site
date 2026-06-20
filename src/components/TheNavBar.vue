<template>
  <v-app-bar
    class="site-bar"
    :class="{ 'is-solid': solid, 'is-ready': ready }"
    :height="solid ? 64 : 76"
    flat
    :elevation="0"
    :scroll-behavior="undefined"
  >
    <div class="bar-row">
      <router-link
        to="/"
        class="nav__brand"
        aria-label="Blood Destiny — home"
        @click="close"
      >
        <img
          class="brand-logo"
          :src="logoWhite"
          alt="Blood Destiny"
        >
      </router-link>
      <nav
        class="nav__links"
        aria-label="Primary"
      >
        <router-link
          v-for="l in nav"
          :key="l.to"
          :to="l.to"
          class="nav__link"
          :class="{ 'is-active': route.path === l.to }"
        >
          {{ l.label }}
        </router-link>
        <a
          class="nav__x"
          :href="social.url"
          target="_blank"
          rel="noopener"
          :aria-label="'Twitter / X — ' + social.handle"
        >
          <XIcon />
        </a>
      </nav>
      <v-app-bar-nav-icon
        class="bar-toggle"
        :aria-expanded="open"
        aria-label="Menu"
        @click="open = !open"
      />
    </div>
  </v-app-bar>

  <v-navigation-drawer
    v-model="open"
    class="site-drawer"
    temporary
    location="right"
    :width="320"
  >
    <nav
      class="drawer-menu"
      aria-label="Mobile"
    >
      <router-link
        v-for="(l, i) in nav"
        :key="l.to"
        :to="l.to"
        :class="{ 'is-active': route.path === l.to }"
        @click="close"
      >
        <span class="num">{{ pad2(i) }}</span>{{ l.label }}
      </router-link>
      <a
        class="drawer-x"
        :href="social.url"
        target="_blank"
        rel="noopener"
      >
        <span class="drawer-x__icon"><XIcon /></span>{{ social.handle }}
      </a>
    </nav>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
/**
 * @fileoverview NavBar — Vuetify v-app-bar that stays transparent over the hero and
 * turns solid on scroll, with a v-navigation-drawer mobile menu
 * (replacing the hand-rolled hamburger overlay). Desktop link styling
 * reuses the bespoke global .nav__link* classes.
 */
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { NAV, SOCIAL, ASSETS } from '@/data/site';
import XIcon from '@/components/XIcon.vue';

const route = useRoute();
const nav = NAV;
const social = SOCIAL;
const logoWhite = ASSETS.logoWhite;

const solid = ref(false);
const open = ref(false);
const ready = ref(false);

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  // CSS-driven logo entrance (frozen-rAF safe)
  window.setTimeout(() => (ready.value = true), 90);
});
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const onScroll = (): void => {
  solid.value = window.scrollY > 40;
};

const close = (): void => {
  open.value = false;
};

const pad2 = (i: number): string => String(i + 1).padStart(2, '0');
</script>

<style scoped lang="scss">
// Bar shell: transparent over hero → solid on scroll
.site-bar {
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease,
    height 0.4s ease;
}

.site-bar.is-solid {
  background: rgba(10, 10, 12, 0.78);
  backdrop-filter: blur(14px) saturate(1.1);
  border-bottom-color: rgba(200, 16, 46, 0.28);
}

.site-bar :deep(.v-toolbar__content) {
  width: 100%;
  padding: 0;
}

// Constrained row identical to the bespoke .nav__row
.bar-row {
  width: 100%;
  max-width: var(--maxw);
  margin-inline: auto;
  padding-inline: var(--gut);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

// Logo + entrance (matches old .nav__logo)
.brand-logo {
  height: 34px;
  width: auto;
  opacity: 0;
  transform: translateX(-12px);
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.6));
  transition: height 0.4s ease, opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out);
}

.site-bar.is-ready .brand-logo {
  opacity: 1;
  transform: none;
}

.site-bar.is-solid .brand-logo {
  height: 30px;
}

// Mobile toggle: shown only at the bespoke ≤860px breakpoint
.bar-toggle {
  display: none;
  color: var(--bd-bone);
}

@media (max-width: 860px) {
  .bar-toggle {
    display: inline-flex;
  }
}

// Mobile drawer menu (echoes the old .nav__overlay)
.site-drawer :deep(.v-navigation-drawer__content) {
  background: linear-gradient(180deg, rgba(12, 4, 7, 0.97), rgba(10, 10, 12, 0.99));
  backdrop-filter: blur(8px);
}

.drawer-menu {
  display: grid;
  align-content: center;
  gap: 1.4rem;
  min-height: 100%;
  padding: 2rem 1.6rem;
}

.drawer-menu a {
  font-family: var(--f-display);
  font-size: clamp(1.8rem, 7vw, 2.6rem);
  color: var(--bd-bone);
  letter-spacing: 0.02em;
}

.drawer-menu a .num {
  font-family: var(--f-ui);
  font-size: 0.7rem;
  color: var(--bd-crimson-hi);
  letter-spacing: 0.3em;
  margin-right: 0.8rem;
  vertical-align: super;
}

.drawer-menu a.is-active {
  color: var(--bd-crimson-hi);
}

.drawer-x {
  margin-top: 1rem;
  display: flex;
  gap: 0.7rem;
  align-items: center;
  color: var(--bd-bone-mute);
  font-family: var(--f-ui);
  letter-spacing: 0.2em;
  font-size: 0.74rem;
}

.drawer-x__icon {
  width: 16px;
  display: inline-flex;
}

// Brand + desktop links (reused by the bar shell above)
.nav__brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(0.6rem, 1.6vw, 1.6rem);
}

.nav__link {
  position: relative;
  font-family: var(--f-ui);
  font-weight: 500;
  font-size: 0.74rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bd-bone-dim);
  padding: 0.5rem 0.1rem;
  transition: color .3s ease;
}

.nav__link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1.5px;
  background: var(--bd-crimson);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .35s var(--ease-out);
}

.nav__link:hover {
  color: var(--bd-bone);
}

.nav__link:hover::after, .nav__link.is-active::after {
  transform: scaleX(1);
}

.nav__link.is-active {
  color: var(--bd-bone);
}

.nav__x {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--bd-ash-line);
  border-radius: 50%;
  color: var(--bd-bone-dim);
  transition: all .3s ease;
  margin-left: 0.4rem;
}

.nav__x:hover {
  color: var(--bd-bone);
  border-color: var(--bd-crimson);
  box-shadow: 0 0 18px -4px var(--bd-crimson);
}

.nav__x svg {
  width: 16px;
  height: 16px;
}

// Desktop links collapse into the v-navigation-drawer below this width
@media (max-width: 860px) {
  .nav__links {
    display: none;
  }
}
</style>
