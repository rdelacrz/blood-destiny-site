<template>
  <!-- Errors get thrown when Suspended from PageShell level, likely due to Vike routing logic -->
  <Suspense>
    <UpdateContent />
    <template #fallback>
      <div class="pt-4 pb-20">
        <Loader />
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Loader from "@/components/Loader.vue";
import UpdateContent from "./UpdateContent.vue";
</script>