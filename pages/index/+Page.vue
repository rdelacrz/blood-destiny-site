<template>
  <div class="relative py-20">
    <div class="text-[2.5rem] leading-tight font-prosto-one">
      Ashes Aflame Presents
    </div>
    <div class="text-[4rem] leading-tight mb-2 font-prosto-one uppercase">
      Blood Destiny
    </div>
    <div class="text-lg mb-6 max-w-[650px] font-poppins">
      Prepare to venture into a fascinating new world with supernatural elements, mysterious agendas, and unexpected twists.
    </div>
    <AppButton id="downloadBtn" @click="handleDownloadClick" disabled>Work In Progress...</AppButton>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const AppButton = defineAsyncComponent(() => import("@/components/clickable-elements/AppButton.vue"));

const handleDownloadClick = () => {
  alert("Download clicked")
}
</script>
