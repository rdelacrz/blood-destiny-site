<template>
  <slot />
</template>
  
<script setup lang="ts">
import { hydrate, useQueryClient } from '@tanstack/vue-query';
import { useQueryClientContext } from '@/contexts';

const vueQueryClientContext = useQueryClientContext();
if (vueQueryClientContext) {
  const queryClient = useQueryClient();
  hydrate(queryClient, vueQueryClientContext);
}
</script>