<template>
  <header>
    <div v-show='showTitleLink' class='website-title-wrapper'>
      <router-link class='website-title-text' to='/'>
        Blood Destiny
      </router-link>
    </div>
    <ul class='header-links-wrapper'>
      <li><AppLink to='/about' linkType='about'>About</AppLink></li>
      <li><AppLink to='/characters' linkType='characters'>Characters</AppLink></li>
      <li><AppLink to='/soundtrack' linkType='soundtrack'>Soundtrack</AppLink></li>
      <li><AppLink to='/updates' linkType='updates'>Updates</AppLink></li>
      <li><AppLink to='/contact' linkType='contact'>Contact</AppLink></li>
    </ul>
  </header>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'page-header',
  components: {
    AppLink: defineAsyncComponent(() => import('@/components/clickable-elements/AppLink.vue')),
  },
  data() {
    return {
      showTitleLink: this.$route.path !== '/',
    }
  },
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
