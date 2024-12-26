<template>
  <a :id="id" :class="{
      'pointer-events-auto': allowNavigation,
      'pointer-events-none': !allowNavigation,
    }" :href="href" :target="target">
    <slot />
  </a>
</template> 

<script setup lang="ts">
import { onMounted, ref } from "vue";

const allowNavigation = ref(false);

onMounted(() => {
  allowNavigation.value = true;
});

defineProps<{
  id?: string;
  href: string;
  target?: string;
}>();
</script>
  