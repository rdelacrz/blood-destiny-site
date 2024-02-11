<template>
  <div class="py-20">
    <div class="text-4xl mb-4">
      Ashes Aflame Presents
    </div>
    <div class="text-6xl mb-6">
      Blood Destiny
    </div>
    <div class="text-lg mb-6 max-w-[650px]">
      Prepare to venture into a fascinating new world with supernatural elements, mysterious agendas, and unexpected twists.
    </div>
    <AppButton id="downloadBtn" @click="handleDownloadClick">Download</AppButton>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const AppButton = defineAsyncComponent(() => import("@/components/clickable-elements/AppButton.vue"));

const handleDownloadClick = () => {
  alert("Download clicked")
}
</script>
