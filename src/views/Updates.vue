<script setup lang="ts">
/* Updates — devlog timeline rendered from the UPDATES data. */
import BreadCrumb from "../components/BreadCrumb.vue";
import { UPDATES } from "../data/updates";

const updates = UPDATES;
</script>

<template>
  <div class="route-host">
    <div class="wrap page-head">
      <BreadCrumb here="Updates" />
      <div class="label" style="margin-top: 1.4rem">Devlog</div>
      <h1>From behind the scenes</h1>
      <p class="lead page-intro">
        Progress notes from the Ashes Aflame team. Seeded entries below &mdash; swap in real
        milestones as development continues.
      </p>
    </div>
    <section class="section" style="padding-top: 1.5rem">
      <div class="wrap">
        <div class="timeline">
          <div class="tl-item" v-for="u in updates" :key="u.title" v-reveal="{ y: 28 }">
            <span class="tl-item__dot"></span>
            <div>
              <span class="tl-item__date">{{ u.date }}</span>
              <span class="tl-item__tag">{{ u.tag }}</span>
            </div>
            <div class="surface tl-item__card">
              <h3>{{ u.title }}</h3>
              <p>{{ u.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
