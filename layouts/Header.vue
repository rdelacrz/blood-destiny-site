<template>
  <header>
    <div v-show='showTitleLink' class='website-title-wrapper'>
      <a class='website-title-text' href='/'>
        Blood Destiny
      </a>
    </div>
    <ul class='header-links-wrapper'>
      <li><AppLink to='/about' :backgroundSrc="aboutBackground">About</AppLink></li>
      <li><AppLink to='/characters' :backgroundSrc="charactersBackground">Characters</AppLink></li>
      <li><AppLink to='/soundtrack' :backgroundSrc="contactUsBackground">Soundtrack</AppLink></li>
      <li><AppLink to='/updates' :backgroundSrc="soundtrackBackground">Updates</AppLink></li>
      <li><AppLink to='/contact' :backgroundSrc="updatesBackground">Contact</AppLink></li>
    </ul>
  </header>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { usePageContext } from '@/context';

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
      aboutBackground: buttonAbout,
      charactersBackground: buttonCharacters,
      contactUsBackground: buttonContactUs,
      soundtrackBackground: buttonSoundtrack,
      updatesBackground: buttonUpdates,
    }
  },
  computed: {
    showTitleLink() {
      const pageContext = usePageContext();
      return pageContext.urlPathname !== '/';
    }
  }
}
</script>

<style scoped lang='scss'>
header {
  color: white;
  display: flex;
  min-height: 100px;
  padding: 20px;
  z-index: 1000;
  .website-title-wrapper {
    display: flex;
    align-items: center;
    max-width: 200px;
    .website-title-text {
      color: white;
      font-family: 'Broadway';
      font-size: 32px;
      text-decoration: none;
    }
  }
  ul.header-links-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 14px;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      padding: 0 15px;
      a {
        position: relative;
      }
    }
  }
}
</style>
