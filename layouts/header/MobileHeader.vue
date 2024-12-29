<template>
  <div :class="['block', {'sm:hidden': !hasMobileUserAgent}]">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppLink from "@/components/clickable-elements/AppLink.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

defineProps<{
  hasMobileUserAgent?: boolean;
}>();

const icons = {
  bars: faBars,
}

const menuActive = ref(false);

const toggleMenu = () => {
  menuActive.value = !menuActive.value;
}

</script>