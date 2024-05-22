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
import Loader from "@/components/Loader.vue";
import UpdateContent from "./UpdateContent.vue";
</script>