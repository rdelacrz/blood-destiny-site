<template>
  <v-btn 
    :id="id" 
    class="bg-transparent text-white rounded-full p-2" 
    :type="type"
    :href="href"
    :disabled="disabled"
    variant="flat"
    :size="buttonSize"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  id?: string;
  type?: "button" | "submit" | "reset" | undefined;
  href?: string;
  disabled?: boolean;
  size?: string;
}>();

const buttonSize = computed(() => props.size || "2rem");
</script>