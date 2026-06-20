<template>
  <footer class="footer">
    <div class="wrap footer__row">
      <router-link
        class="footer__brand"
        to="/"
        aria-label="Home"
      >
        <img
          class="footer__logo"
          :src="logoWhite"
          alt="Blood Destiny"
        >
      </router-link>
      <div class="footer__center">
        <p class="footer__meta">
          Copyright &copy; {{ year }} &middot; Ashes Aflame &middot; All rights reserved
        </p>
        <p class="footer__credit">
          Site powered by
          <a
            href="https://devmddesign.com"
            target="_blank"
            rel="noopener"
          >DevMD</a>
        </p>
      </div>
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
/** @fileoverview Footer — logo, copyright line and the X / Twitter handle. */
import { ASSETS, SOCIAL } from '@/data/site';
import XIcon from '@/components/XIcon.vue';

const year = new Date().getFullYear();
const logoWhite = ASSETS.logoWhite;
const social = SOCIAL;
</script>

<style scoped lang="scss">
.footer {
  position: relative;
  z-index: 2;
  border-top: 1px solid var(--bd-ash);
  margin-top: var(--stack);
  background: rgba(10,10,12,0.7);
  backdrop-filter: blur(6px);
}

// 1fr | auto | 1fr keeps the center column truly centred on the page,
// regardless of the differing widths of the logo and the X handle.
.footer__row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.4rem;
  padding-block: 2.4rem;
}

.footer__brand {
  justify-self: start;
}

.footer__logo {
  display: block;
  height: 30px;
  opacity: 0.92;
}

.footer__center {
  display: grid;
  gap: 0.35rem;
  justify-items: center;
  text-align: center;
}

.footer__meta {
  font-family: var(--f-ui);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--bd-bone-mute);
}

.footer__credit {
  font-family: var(--f-ui);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: var(--bd-bone-mute);
}

.footer__credit a {
  color: var(--bd-bone-dim);
  transition: color .3s;
}

.footer__credit a:hover {
  color: var(--bd-crimson-hi);
}

.footer__x {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-family: var(--f-ui);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--bd-bone-dim);
  transition: color .3s;
}

.footer__x:hover {
  color: var(--bd-crimson-hi);
}

.footer__x svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 620px) {
  .footer__row {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
  .footer__brand, .footer__x {
    justify-self: center;
  }
}
</style>
