<template>
  <!-- v-app is required by Vuetify's layout components (v-app-bar /
       v-navigation-drawer inside TheNavBar). Its background is forced
       transparent in main.css so the fixed ember/haze background and the
       transparent header still show through. -->
  <v-app>
    <TheLoader
      v-if="!ready"
      @done="ready = true" />
    <TheBackgroundSystem />
    <div class="bg-scrim" />
    <div class="fx-vignette" />

    <TheNavBar />
    <!-- Intentionally a plain <main>, NOT <v-main>: the bespoke hero is
         full-bleed under the transparent header and inner pages already
         pad for the fixed nav, so we must not add Vuetify's layout offset. -->
    <main class="route-host">
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          :key="$route.path" />
      </router-view>
    </main>
    <TheFooter />

    <div id="route-sweep" />
    <div class="fx-grain" />
  </v-app>
</template>

<script setup lang="ts">
/* =====================================================================
   App shell — loader, atmospheric background system, persistent nav +
   footer, and the routed view host. The crimson route-sweep + film grain
   overlays live here so they persist across navigations.
   ===================================================================== */
import { ref } from 'vue';
import TheLoader from '@/components/TheLoader.vue';
import TheNavBar from '@/components/TheNavBar.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheBackgroundSystem from '@/components/TheBackgroundSystem.vue';

const ready = ref(false);
</script>
