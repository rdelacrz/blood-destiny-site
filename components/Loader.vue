<template>
  <div class="flex justify-center py-10">
    <div class="relative">
      <img class="relative pr-[11.47px] animate-spin-step" :src="loaderObjectsImg" alt="Loader Objects" />
      <img class="absolute top-[38px] left-[42.5px] animate-spin-step" :src="loaderMoonImg" alt="Loader Moon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import loaderMoonImg from "@/assets/images/graphics/loader_moon.png";
import loaderObjectsImg from "@/assets/images/graphics/loader_objects.png";
</script>