<script setup lang="ts">
/* =====================================================================
   App shell — loader, atmospheric background system, persistent nav +
   footer, and the routed view host. The crimson route-sweep + film grain
   overlays live here so they persist across navigations.
   ===================================================================== */
import { ref } from "vue";
import Loader from "./components/Loader.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import BackgroundSystem from "./components/BackgroundSystem.vue";

const ready = ref(false);
</script>

<template>
  <!-- v-app is required by Vuetify's layout components (v-app-bar /
       v-navigation-drawer inside NavBar). Its background is forced
       transparent in style.css so the fixed ember/haze background and the
       transparent header still show through. -->
  <v-app>
    <Loader v-if="!ready" @done="ready = true" />
    <BackgroundSystem />
    <div class="bg-scrim"></div>
    <div class="fx-vignette"></div>

    <NavBar />
    <!-- Intentionally a plain <main>, NOT <v-main>: the bespoke hero is
         full-bleed under the transparent header and inner pages already
         pad for the fixed nav, so we must not add Vuetify's layout offset. -->
    <main class="route-host">
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="$route.path" />
      </router-view>
    </main>
    <Footer />

    <div id="route-sweep"></div>
    <div class="fx-grain"></div>
  </v-app>
</template>