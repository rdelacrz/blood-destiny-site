<template>
  <slot />
</template>
  
<script setup lang="ts">
import { hydrate, useQueryClient } from '@tanstack/vue-query';
import { useVueQueryClientContext } from '@/contexts';

const vueQueryClientContext = useVueQueryClientContext();
if (vueQueryClientContext) {
  const queryClient = useQueryClient();
  hydrate(queryClient, vueQueryClientContext);
}
</script>