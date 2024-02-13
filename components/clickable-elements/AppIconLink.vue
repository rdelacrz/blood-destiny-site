<template>
  <a :href='href' :target="target">
    <FontAwesomeIcon class="text-white text-[1.75rem]" :icon="icon" />
  </a>
</template> 

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps<{
  href: string;
  target: string;
  icon: string | object | string[] | IconDefinition;
}>();
</script>
  