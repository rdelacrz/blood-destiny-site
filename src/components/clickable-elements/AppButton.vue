<template>
  <button :id='id' class='app-button' :style="{'background-image': currentBackground}" :type='type'>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    id: {
      type: String,
      required: false,
    },
    buttonType: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    },
  },
  data() {
    return {
      active: !this.to || this.to === this.$route.path,
      background: new URL(`../../assets/images/backgrounds/buttons/button_${this.buttonType}.png`, import.meta.url).href,
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
.app-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-family: 'Copperplate Gothic';
  font-size: 18px;
  outline: none;
  padding: 3px 8px;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease-out;

  // Animates underline on hover or keyboard focus
  &:hover, &:focus {
    color: rgb(247, 173, 171);
    text-shadow: 0 3px 6px rgba(black, 0.6);
  }
}
</style>
