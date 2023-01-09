<template>
  <div class='link-container' :style="{'background-image': currentBackground}">
    <router-link :class="{'link-content': true, [this.linkClass]: !!this.linkClass}" :to='to'>
      <slot></slot>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'app-link',
  props: {
    linkClass: {
      type: String,
      required: false,
    },
    to: {
      type: String,
      required: true,
    },
    linkType: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      active: this.to === this.$route.path,
      background: new URL(`../../assets/images/backgrounds/buttons/button_${this.linkType}.png`, import.meta.url).href,
    };
  },
  computed: {
    currentBackground() {
      return this.active ? `url(${this.background})` : 'none';   // Shows nothing when current path doesn't match link
    },
  }
};
</script>

<style scoped lang='scss'>
.link-container {
  display: inline-block;
  min-width: 90px;
  padding: 3px 11px;
  text-align: center;
  .link-content {
    color: white;
    font-family: 'Copperplate Gothic';
    font-size: 18px;
    outline: none;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.3s ease-out;
    width: 100%;

    // Animates underline on hover or keyboard focus
    &:hover, &:focus {
      color: rgb(247, 173, 171);
      text-shadow: 0 3px 6px rgba(black, 0.7);
    }
  }
}
</style>
