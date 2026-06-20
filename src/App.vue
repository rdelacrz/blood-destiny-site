<template>
  <!-- v-app is required by Vuetify's layout components (v-app-bar /
       v-navigation-drawer inside TheNavBar). Its background is forced
       transparent in main.css so the fixed ember/haze background and the
       transparent header still show through. -->
  <v-app>
    <TheLoader
      v-if="!ready"
      @done="ready = true"
    />
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
          :key="$route.path"
        />
      </router-view>
    </main>
    <TheFooter />

    <div id="route-sweep" />
    <div class="fx-grain" />
  </v-app>
</template>

<script setup lang="ts">
/**
 * @fileoverview App shell — loader, atmospheric background system, persistent nav +
 * footer, and the routed view host. The crimson route-sweep + film grain
 * overlays live here so they persist across navigations.
 */
import { ref } from 'vue';
import TheLoader from '@/components/TheLoader.vue';
import TheNavBar from '@/components/TheNavBar.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheBackgroundSystem from '@/components/TheBackgroundSystem.vue';

const ready = ref(false);
</script>

<style scoped lang="scss">
/* Sticky footer: .v-application__wrap is a flex column with min-height:100svh,
   so let the routed <main> grow to fill it. Without this, short pages (e.g.
   Contact) leave the footer floating mid-viewport with empty space beneath. */
.route-host {
  flex: 1 0 auto;
}

/* ---------- per-route background scrim ---------- */
.bg-scrim {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(10,10,12,0.45) 0%, rgba(10,10,12,0.72) 55%, rgba(10,10,12,0.96) 100%);
}

/* ---------- film grain + vignette (global atmosphere) ---------- */
.fx-grain, .fx-vignette {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 60;
}

.fx-grain {
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}

.fx-vignette {
  z-index: 1;
  background:
    radial-gradient(130% 95% at 50% 12%, transparent 38%, rgba(0,0,0,0.55) 100%),
    radial-gradient(120% 120% at 50% 120%, rgba(110,7,18,0.18), transparent 60%);
}

/* ---------- route sweep overlay (crimson wipe on navigation) ----------
   z-index sits above the Vuetify v-app-bar (~1005) so the wipe still sweeps
   over the header, but below Vuetify overlays (~2000+). Animated from
   atmosphere.ts routeSweep() via getElementById. */
#route-sweep {
  position: fixed;
  inset: 0;
  z-index: 1100;
  pointer-events: none;
  background: linear-gradient(120deg, var(--bd-oxblood), var(--bd-crimson));
  transform: scaleX(0);
  transform-origin: left center;
}
</style>
