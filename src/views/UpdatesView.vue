<template>
  <div class="route-host">
    <div class="wrap page-head">
      <BreadCrumb here="Updates" />
      <div
        class="label"
        style="margin-top: 1.4rem"
      >
        Devlog
      </div>
      <h1>
        From behind the scenes
      </h1>
      <p class="lead page-intro">
        Progress notes from the Ashes Aflame team. Seeded entries below &mdash; swap in real
        milestones as development continues.
      </p>
    </div>
    <section
      class="section"
      style="padding-top: 1.5rem"
    >
      <div class="wrap">
        <div class="timeline">
          <div
            v-for="u in updates"
            :key="u.title"
            v-reveal="{ y: 28 }"
            class="tl-item"
          >
            <span class="tl-item__dot" />
            <div>
              <span class="tl-item__date">{{ u.date }}</span>
              <span class="tl-item__tag">{{ u.tag }}</span>
            </div>
            <div class="surface tl-item__card">
              <h3>
                {{ u.title }}
              </h3>
              <p>
                {{ u.body }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/* Updates — devlog timeline rendered from the UPDATES data. */
import BreadCrumb from '@/components/BreadCrumb.vue';
import { UPDATES } from '@/data/updates';

const updates = UPDATES;
</script>

<style scoped>
/* =========================================================
   TIMELINE
   ========================================================= */
.timeline { position: relative; max-width: 880px; margin-inline: auto; }
.timeline::before { content: ""; position: absolute; left: 18px; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, var(--bd-crimson), rgba(200,16,46,0.1)); }
.tl-item { position: relative; padding: 0 0 2.4rem 3.4rem; }
.tl-item__dot { position: absolute; left: 11px; top: 4px; width: 16px; height: 16px; border-radius: 50%; background: var(--bd-black); border: 2px solid var(--bd-crimson); box-shadow: 0 0 14px rgba(200,16,46,0.6); }
.tl-item__date { font-family: var(--f-ui); font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bd-bone-mute); }
.tl-item__tag { display: inline-block; font-family: var(--f-ui); font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--bd-crimson-hi); border: 1px solid rgba(200,16,46,0.35); border-radius: 3px; padding: 0.15em 0.6em; margin-left: 0.7rem; }
.tl-item__card { margin-top: 0.7rem; padding: 1.3rem 1.5rem; }
.tl-item h3 { font-family: var(--f-display); font-size: 1.5rem; margin-bottom: 0.4rem; }
.tl-item p { color: var(--bd-bone-dim); font-size: 0.95rem; }
@media (min-width: 760px) {
  .timeline::before { left: 50%; transform: translateX(-1px); }
  .tl-item { width: 50%; padding-left: 0; padding-right: 3rem; text-align: right; }
  .tl-item__dot { left: auto; right: -8px; }
  .tl-item:nth-child(even) { margin-left: 50%; padding-right: 0; padding-left: 3rem; text-align: left; }
  .tl-item:nth-child(even) .tl-item__dot { right: auto; left: -8px; }
  .tl-item__tag { margin-left: 0.6rem; }
}
</style>
