<template>
  <header>
    <!-- Never display DesktopHeader in mobile environments -->
    <DesktopHeader v-if="!hasMobileUserAgent" />

    <!-- 
      Desktop environments can potentially display MobileHeader with smaller widths.
      Mobile environments will always display MobileHeader.
    -->
    <MobileHeader :hasMobileUserAgent="hasMobileUserAgent" />
  </header>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from "vue";
import DeviceDetector from "device-detector-js";

const DesktopHeader = defineAsyncComponent(() => import("./DesktopHeader.vue"));
const MobileHeader = defineAsyncComponent(() => import("./MobileHeader.vue"));

const deviceDetector = new DeviceDetector();
const hasMobileUserAgent = ref(false);

onMounted(() => {
  const device = deviceDetector.parse(navigator.userAgent);
  hasMobileUserAgent.value = device.device?.type === "smartphone";
});

</script>

