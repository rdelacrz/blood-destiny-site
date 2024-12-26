<template>
  <div class="hidden sm:flex bg-blue-dark py-9">
    <div class="flex justify-between items-center container mx-auto px-4">
      <AppBaseLink href="/">
        <img :src="logoSrc" alt="Blood Destiny Logo" width="132" />
      </AppBaseLink>
      <ul class="flex">
        <li class="mx-1 xl:mx-4">
          <AppLink id="homeLink" to="/">Home</AppLink>
        </li>
        <li class="mx-1 xl:mx-4">
          <AppLink id="aboutLink" to="/about">About</AppLink>
        </li>
        <li class="mx-1 xl:mx-4">
          <AppLink id="charactersLink" to="/characters">Characters</AppLink>
        </li>
        <li class="mx-1 xl:mx-4">
          <AppLink id="soundtrackLink" to="/soundtrack">Soundtrack</AppLink>
        </li>
        <li class="mx-1 xl:mx-4">
          <AppLink id="updatesLink" to="/updates">Updates</AppLink>
        </li>
        <li class="mx-1 xl:mx-4">
          <AppLink id="contactLink" to="/contact">Contact</AppLink>
        </li>
      </ul>
      <ul class="flex">
        <li>
          <AppIconLink href="https://twitter.com/BloodDestinyVN" target="_blank" :icon="icons.twitter" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import AppBaseLink from "@/components/clickable-elements/AppBaseLink.vue";
import AppIconLink from "@/components/clickable-elements/AppIconLink.vue";
import AppLink from "@/components/clickable-elements/AppLink.vue";

import logoSrc from "@/assets/images/graphics/blood_destiny_logo.png";

const icons = {
  twitter: faXTwitter,
};
</script>