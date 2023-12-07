<template>
  <slot />
</template>
  
<script setup lang="ts">
import { hydrate, useQueryClient } from '@tanstack/vue-query';
import { useQueryClientContext } from '@/contexts';

// For SSR purposes; hydrates the vue-query client with existing context data after initial rendering
const vueQueryClientContext = useQueryClientContext();
if (vueQueryClientContext) {
  const queryClient = useQueryClient();
  hydrate(queryClient, vueQueryClientContext);
}
</script>