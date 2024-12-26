<template>
  <AppBaseLink :href='href' :target="target">
    <FontAwesomeIcon class="text-white text-[1.75rem]" :icon="icon" />
  </AppBaseLink>
</template> 

<script setup lang="ts">
import AppBaseLink from "@/components/clickable-elements/AppBaseLink.vue";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps<{
  href: string;
  target: string;
  icon: string | object | string[] | IconDefinition;
}>();
</script>
  