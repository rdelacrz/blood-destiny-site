<template>
  <DesktopHeader />
  <MobileHeader />
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";

export default {
  name: "page-header",
  components: {
    DesktopHeader: defineAsyncComponent(() => import("./DesktopHeader.vue")),
    MobileHeader: defineAsyncComponent(() => import("./MobileHeader.vue")),
  }
}
</script>

