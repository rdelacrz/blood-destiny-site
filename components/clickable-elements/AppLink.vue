<template>
  <div class='link-container' :style="{'background-image': currentBackground}">
    <a :class="['link-content', linkClass]" :href='to'>
      <slot></slot>
    </a>
  </div>
</template> 

<script setup lang="ts">
import { usePageContext } from '@/contexts';
import { computed } from 'vue';

const props = defineProps<{
  linkClass?: string
  to: string
  backgroundSrc: string
}>();

const pageContext = usePageContext();

const active = computed(() => {
  const { urlPathname } = pageContext;
  return props.to === '/' ? urlPathname === props.to : urlPathname?.startsWith(props.to);
});

// Determines background based of link based on whether it is active or not
const currentBackground = computed(() => {
  return active.value ? `url(${props.backgroundSrc})` : 'none';   // Shows nothing when current path doesn't match link
});
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

    &:hover, &:focus {
      color: rgb(247, 173, 171);
      text-shadow: 0 3px 6px rgba(black, 0.7);
    }
  }
}
</style>
