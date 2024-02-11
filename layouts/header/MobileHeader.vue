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
        <li><AppLink to="/about" @click="toggleMenu">About</AppLink></li>
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

export default {
  name: "page-header",
  components: {
    AppLink: defineAsyncComponent(() => import("@/components/clickable-elements/AppLink.vue")),
    FontAwesomeIcon,
  },
  data() {
    return {
      menuActive: false,
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