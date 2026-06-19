<template>
  <footer class="footer">
    <div class="wrap footer__row">
      <router-link
        to="/"
        aria-label="Home"
      >
        <img
          class="footer__logo"
          :src="logoWhite"
          alt="Blood Destiny"
        >
      </router-link>
      <p class="footer__meta">
        Copyright &copy; {{ year }} &middot; Ashes Aflame &middot; All rights reserved
      </p>
      <a
        class="footer__x"
        :href="social.url"
        target="_blank"
        rel="noopener"
      >
        <span><XIcon /></span> {{ social.handle }}
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
/* Footer — logo, copyright line and the X / Twitter handle. */
import { ASSETS, SOCIAL } from '@/data/site';
import XIcon from '@/components/XIcon.vue';

const year = new Date().getFullYear();
const logoWhite = ASSETS.logoWhite;
const social = SOCIAL;
</script>

<style scoped>
.footer { position: relative; z-index: 2; border-top: 1px solid var(--bd-ash); margin-top: var(--stack); background: rgba(10,10,12,0.7); backdrop-filter: blur(6px); }
.footer__row { display: flex; align-items: center; justify-content: space-between; gap: 1.4rem; flex-wrap: wrap; padding-block: 2.4rem; }
.footer__logo { height: 30px; opacity: 0.92; }
.footer__meta { font-family: var(--f-ui); font-size: 0.72rem; letter-spacing: 0.1em; color: var(--bd-bone-mute); }
.footer__x { display: inline-flex; align-items: center; gap: 0.6em; font-family: var(--f-ui); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--bd-bone-dim); transition: color .3s; }
.footer__x:hover { color: var(--bd-crimson-hi); }
.footer__x svg { width: 16px; height: 16px; }

@media (max-width: 620px) {
  .footer__row { justify-content: center; text-align: center; }
}
</style>
