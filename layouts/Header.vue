<template>
  <DesktopHeader />
  <MobileHeader />
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';

export default {
  name: 'page-header',
  components: {
    DesktopHeader: defineAsyncComponent(() => import('@/layouts/header/DesktopHeader.vue')),
    MobileHeader: defineAsyncComponent(() => import('@/layouts/header/MobileHeader.vue')),
  }
}
</script>

