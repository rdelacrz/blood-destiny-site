<template>
  <header class="block sm:hidden">
    <div class="menu-button-container">
      <button class="menu-button" @click="toggleMenu">
        <FontAwesomeIcon class="text-white" :icon="icons.bars" />
      </button>
    </div>
    <Transition>
      <ul v-show="menuActive" class="header-links-wrapper">
        <li><AppLink to="/" @click="toggleMenu">Home</AppLink></li>
        <li><AppLink to="/about" :backgroundSrc="aboutBackground" @click="toggleMenu">About</AppLink></li>
        <li><AppLink to="/characters" @click="toggleMenu">Characters</AppLink></li>
        <li><AppLink to="/soundtrack" @click="toggleMenu">Soundtrack</AppLink></li>
        <li><AppLink to="/updates" @click="toggleMenu">Updates</AppLink></li>
        <li><AppLink to="/contact" @click="toggleMenu">Contact</AppLink></li>
      </ul>
    </Transition>
  </header>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import buttonAbout from "@/assets/images/backgrounds/buttons/button_about.png";
import buttonCharacters from "@/assets/images/backgrounds/buttons/button_characters.png";
import buttonContactUs from "@/assets/images/backgrounds/buttons/button_contact_us.png";
import buttonSoundtrack from "@/assets/images/backgrounds/buttons/button_soundtrack.png";
import buttonUpdates from "@/assets/images/backgrounds/buttons/button_updates.png";

export default {
  name: "page-header",
  components: {
    AppLink: defineAsyncComponent(() => import("@/components/clickable-elements/AppLink.vue")),
    FontAwesomeIcon,
  },
  data() {
    return {
      menuActive: false,
      aboutBackground: buttonAbout,
      charactersBackground: buttonCharacters,
      contactUsBackground: buttonContactUs,
      soundtrackBackground: buttonSoundtrack,
      updatesBackground: buttonUpdates,
      icons: {
        bars: faBars,
      },
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    }
  },
}
</script>