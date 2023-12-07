<template>
  <button :id='id' class='app-button' :style="{'background-image': currentBackground}" :type='type'>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: string
  backgroundSrc: string
  type?: 'button' | 'submit' | 'reset' | undefined
}>();

const currentBackground = `url(${props.backgroundSrc})`;
</script>

<style scoped lang='scss'>
.app-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-family: 'Copperplate Gothic';
  font-size: 1.125em;
  outline: none;
  padding: 0.1875em 0.5em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease-out;

  &:hover, &:focus {
    color: rgb(247, 173, 171);
    text-shadow: 0 3px 6px rgba(black, 0.6);
  }
}
</style>
