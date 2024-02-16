<template>
  <v-btn 
    :id="id" 
    class="flex align-middle bg-crimson capitalize text-white font-poppins font-medium 
      rounded-tl-none rounded-tr-[1.125rem] rounded-bl-[1.25rem] rounded-br-none py-[1.375rem] px-6" 
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