<template>
  <footer class="footer">
    <div class="wrap footer__row">
      <router-link
        to="/"
        aria-label="Home">
        <img
          class="footer__logo"
          :src="logoWhite"
          alt="Blood Destiny">
      </router-link>
      <p class="footer__meta">
        Copyright &copy; {{ year }} &middot; Ashes Aflame &middot; All rights reserved
      </p>
      <a
        class="footer__x"
        :href="social.url"
        target="_blank"
        rel="noopener">
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
