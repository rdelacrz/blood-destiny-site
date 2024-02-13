<template>
  <header class="hidden sm:flex bg-blue-dark py-9">
    <div class="flex justify-between items-center container mx-auto px-4">
      <a href="/">
        <img :src="logoSrc" alt="Blood Destiny Logo" width="132" />
      </a>
      <ul class="flex">
        <li class="mx-1 xl:mx-4"><AppLink to="/">Home</AppLink></li>
        <li class="mx-1 xl:mx-4"><AppLink to="/about">About</AppLink></li>
        <li class="mx-1 xl:mx-4"><AppLink to="/characters">Characters</AppLink></li>
        <li class="mx-1 xl:mx-4"><AppLink to="/soundtrack">Soundtrack</AppLink></li>
        <li class="mx-1 xl:mx-4"><AppLink to="/updates">Updates</AppLink></li>
        <li class="mx-1 xl:mx-4"><AppLink to="/contact">Contact</AppLink></li>
      </ul>
      <ul class="flex">
        <li>
          <AppIconLink href="https://twitter.com/BloodDestinyVN" target="_blank" :icon="icons.twitter" />
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import AppIconLink from "@/components/clickable-elements/AppIconLink.vue";
import AppLink from "@/components/clickable-elements/AppLink.vue";

import logoSrc from "@/assets/images/graphics/blood_destiny_logo.png";

const icons = {
  twitter: faXTwitter,
};
</script>