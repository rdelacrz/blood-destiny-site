<template>
  <header class='mobile'>
    <div class='menu-button-container'>
      <button class='menu-button' @click="toggleMenu">
        <font-awesome-icon icon='bars' />
      </button>
    </div>
    <Transition>
      <ul v-show='menuActive' class='header-links-wrapper'>
        <li><AppLink to='/' :backgroundSrc="aboutBackground" @click='toggleMenu'>Home</AppLink></li>
        <li><AppLink to='/about' :backgroundSrc="aboutBackground" @click='toggleMenu'>About</AppLink></li>
        <li><AppLink to='/characters' :backgroundSrc="charactersBackground" @click='toggleMenu'>Characters</AppLink></li>
        <li><AppLink to='/soundtrack' :backgroundSrc="contactUsBackground" @click='toggleMenu'>Soundtrack</AppLink></li>
        <li><AppLink to='/updates' :backgroundSrc="soundtrackBackground" @click='toggleMenu'>Updates</AppLink></li>
        <li><AppLink to='/contact' :backgroundSrc="updatesBackground" @click='toggleMenu'>Contact</AppLink></li>
      </ul>
    </Transition>
  </header>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';

import buttonAbout from '@/assets/images/backgrounds/buttons/button_about.png';
import buttonCharacters from '@/assets/images/backgrounds/buttons/button_characters.png';
import buttonContactUs from '@/assets/images/backgrounds/buttons/button_contact_us.png';
import buttonSoundtrack from '@/assets/images/backgrounds/buttons/button_soundtrack.png';
import buttonUpdates from '@/assets/images/backgrounds/buttons/button_updates.png';

export default {
  name: 'page-header',
  components: {
    AppLink: defineAsyncComponent(() => import('@/components/clickable-elements/AppLink.vue')),
  },
  data() {
    return {
      menuActive: false,
      aboutBackground: buttonAbout,
      charactersBackground: buttonCharacters,
      contactUsBackground: buttonContactUs,
      soundtrackBackground: buttonSoundtrack,
      updatesBackground: buttonUpdates,
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    }
  },
}
</script>

<style scoped lang='scss'>
header {
  position: fixed;
  top: 0;
  color: white;
  min-height: 80px;
  z-index: 1000;

  .menu-button-container {
    position: relative;
    z-index: 1;
    .menu-button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-family: 'Copperplate Gothic';
      font-size: 1.125em;
      margin: 15px;
      outline: none;
      text-decoration: none;
      transition: all 0.3s ease-out;

      &:hover, &:focus {
        color: rgb(247, 173, 171);
        text-shadow: 0 3px 6px rgba(black, 0.6);
      }
    }
  }
  
  ul.header-links-wrapper {
    position: absolute;
    top: 0;
    background: rgb(19, 19, 19, 0.9);
    box-sizing: border-box;
    height: 100%;
    min-height: 100vh;
    width: 100vw;
    overflow-y: hidden;
    text-align: center;
    font-size: 1.2em;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0 15px;
      .link-container {
        margin: 20px;
      }
    }

    &.v-enter-active, &.v-leave-active {
      transition: top 0.2s ease-in-out;
    }

    &.v-enter-from, &.v-leave-to {
      top: -100vh;
    }
  }
}
</style>
