<template>
  <v-btn 
    :id="id" 
    class="flex align-middle bg-crimson text-white rounded-bl-3xl rounded-tr-3xl p-6 capitalize" 
    :type="type"
    :href="href"
    :disabled="disabled"
    color="primary"
    variant="flat"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  id?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  href?: string;
  disabled?: boolean;
}>();
</script>