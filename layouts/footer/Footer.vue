<template>
  <footer class="container mx-auto bg-crimson rounded-tl-[80px] rounded-tr-[80px] min-h-10 px-8 pt-8 pb-4">
    <div class="pb-8">
      <img class="mx-auto" :src="logoWhite" alt="White Blood Destiny Logo" width="200" />
    </div>
    <div class="flex justify-between border-t border-white pt-2">
      <div class="leading-8">Copyright &#169; 2024</div>
      <div>
        <AppIconLink href="https://twitter.com/BloodDestinyVN" target="_blank" :icon="icons.twitter" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import AppIconLink from "@/components/clickable-elements/AppIconLink.vue";

import logoWhite from "@/assets/images/graphics/blood_destiny_logo_white.png";

const icons = {
  twitter: faXTwitter,
};
</script>