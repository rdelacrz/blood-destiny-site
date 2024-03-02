<template>
  <!-- Errors get thrown when Suspended from PageShell level, likely due to Vike routing logic -->
  <Suspense>
    <UpdateContent />
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import UpdateContent from "./UpdateContent.vue";

const Loader = defineAsyncComponent(() => import("@/components/Loader.vue"));
</script>