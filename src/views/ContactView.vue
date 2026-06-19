<template>
  <div class="route-host">
    <div class="wrap page-head">
      <BreadCrumb here="Contact" />
      <div
        class="label"
        style="margin-top: 1.4rem"
      >
        Get In Touch
      </div>
      <h1>
        Say hello to Ashes Aflame
      </h1>
      <p class="lead page-intro">
        Questions, press, or just want to follow the journey? Reach out below or find us on X.
      </p>
    </div>
    <section
      class="section"
      style="padding-top: 1.5rem"
    >
      <div class="wrap contact-grid">
        <div
          v-reveal="{ y: 24 }"
          class="surface x-card"
        >
          <div class="label">
            Follow the journey
          </div>
          <a
            class="x-big"
            :href="social.url"
            target="_blank"
            rel="noopener"
          >
            <span><XIcon /></span> {{ social.handle }}
          </a>
          <p class="muted">
            The fastest way to keep up with development, art drops and soundtrack releases.
          </p>
          <a
            :href="social.url"
            target="_blank"
            rel="noopener"
            class="btn btn-primary"
            style="justify-self: start"
          >Open on X <span class="arr">&rarr;</span></a>
        </div>

        <div
          v-reveal="{ y: 24, delay: 100 }"
          class="surface contact-form"
          style="padding: clamp(1.6rem, 4vw, 2.6rem)"
        >
          <div
            v-if="sent"
            style="text-align: center; padding: 2rem 0"
          >
            <div
              class="label"
              style="margin-bottom: 0.8rem"
            >
              Message received
            </div>
            <h2
              class="display"
              style="font-size: var(--t-h3)"
            >
              Thank you &mdash; we'll be in touch.
            </h2>
          </div>
          <v-form
            v-else
            ref="formRef"
            validate-on="submit"
            @submit.prevent="submit"
          >
            <label
              class="field-label"
              for="cn"
            >Name</label>
            <v-text-field
              id="cn"
              v-model="name"
              :rules="[required]"
              placeholder="Your name"
              autocomplete="name"
            />
            <label
              class="field-label"
              for="ce"
            >Email</label>
            <v-text-field
              id="ce"
              v-model="email"
              :rules="emailRules"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
            />
            <label
              class="field-label"
              for="cm"
            >Message</label>
            <v-textarea
              id="cm"
              v-model="message"
              :rules="messageRules"
              :rows="5"
              placeholder="Tell us what's on your mind…"
              auto-grow
            />
            <!-- Tailwind utilities (bg-blood-500 / text-bone — in the
                 `utilities` layer) override Vuetify's button styling
                 (vuetify-components layer) with NO !important. -->
            <v-btn
              type="submit"
              block
              size="large"
              class="bg-blood-500 text-bone tracking-[0.18em] mt-2"
            >
              Send Message <span class="arr ms-2">&rarr;</span>
            </v-btn>
          </v-form>
        </div>
      </div>
    </section>

    <v-snackbar
      v-model="snackbar"
      :color="snackError ? 'error' : 'surface-bright'"
      timeout="4000"
    >
      <div class="snack-row">
        <v-icon :icon="snackError ? mdiAlertCircleOutline : mdiCheckCircleOutline" />
        <span>{{
          snackError
            ? 'Please fix the highlighted fields.'
            : 'Message received — thank you, we\'ll be in touch.'
        }}</span>
      </div>
      <template #actions>
        <v-btn
          variant="text"
          class="text-bone"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
/* =====================================================================
   Contact — X / Twitter card (bespoke) plus a Vuetify-powered message
   form: v-form + v-text-field / v-textarea with validation rules, and a
   v-snackbar for submit feedback. No backend; UI-only.
   ===================================================================== */
import { ref } from 'vue';
import { mdiCheckCircleOutline, mdiAlertCircleOutline } from '@mdi/js';
import type { VForm } from 'vuetify/components';
import BreadCrumb from '@/components/BreadCrumb.vue';
import XIcon from '@/components/XIcon.vue';
import { prefersReducedMotion } from '@/composables/atmosphere';
import { SOCIAL } from '@/data/site';
import { animate } from 'animejs';

type Rule = (v: string) => string | true;

const social = SOCIAL;

const formRef = ref<InstanceType<typeof VForm> | null>(null);
const name = ref('');
const email = ref('');
const message = ref('');
const sent = ref(false);

const snackbar = ref(false);
const snackError = ref(false);

const required: Rule = (v) => !!v?.trim() || 'Please tell us your name.';
const emailRules: Rule[] = [
  (v) => !!v?.trim() || 'An email, please.',
  (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || 'A valid email, please.',
];
const messageRules: Rule[] = [
  (v) => (v?.trim().length ?? 0) >= 8 || 'A few more words?',
];

const submit = async (): Promise<void> => {
  const result = await formRef.value?.validate();
  if (!result?.valid) {
    snackError.value = true;
    snackbar.value = true;
    return;
  }
  sent.value = true;
  snackError.value = false;
  snackbar.value = true;
  if (!prefersReducedMotion()) {
    animate('.x-card', { scale: [1, 1.01, 1], duration: 500, ease: 'outQuad' });
  }
};
</script>

<style scoped>
/* =========================================================
   PAGE ATMOSPHERE — extra scrim tuned to the temple-hallway
   art (dark corridor, but saturated cyan glyph bands + a warm
   floor right where the panels land). Mounts/unmounts with the
   view, so it's per-route: it sits above the shared background
   (z-index -2) and global scrim (-1) but below page content.
   The corridor is already dark, so this leans on a centred
   vignette to settle the glyph glare rather than a flat dim.
   ========================================================= */
.route-host::before {
  content: "";
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background:
    linear-gradient(180deg,
      rgba(8, 8, 11, 0.52) 0%, rgba(8, 8, 11, 0.32) 45%,
      rgba(8, 8, 11, 0.5) 100%),
    radial-gradient(120% 100% at 50% 40%, transparent 46%, rgba(8, 8, 11, 0.64) 100%);
}

/* =========================================================
   CONTACT LAYOUT
   ========================================================= */
.contact-grid { display: grid; gap: clamp(1.5rem, 4vw, 3rem); grid-template-columns: 1fr; }
@media (min-width: 880px) { .contact-grid { grid-template-columns: 0.9fr 1.1fr; } }
.x-card { padding: clamp(1.6rem, 4vw, 2.6rem); display: grid; gap: 1.2rem; align-content: start; }

/* Both panels ride over the glyph corridor — push the shared .surface ink to
   near-opaque glass and deepen the blur so copy + input text stay readable. */
.x-card,
.contact-form {
  background: linear-gradient(180deg, rgba(18, 18, 23, 0.93), rgba(8, 8, 11, 0.97));
  border-color: rgba(58, 58, 66, 0.85);
  backdrop-filter: blur(12px);
}
.x-big { display: inline-flex; align-items: center; gap: 0.8rem; font-family: var(--f-display); font-size: clamp(1.6rem, 4vw, 2.4rem); }
.x-big svg { width: 34px; height: 34px; }

/* Brand chrome for the Vuetify fields: UI-font tracked labels + ink-tinted
   input wells. */
.field-label {
  display: block;
  font-family: var(--f-ui);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--bd-bone-dim);
  margin-bottom: 0.5rem;
}
.contact-form :deep(.v-field) {
  background: rgba(8, 8, 11, 0.82);
  font-family: var(--f-body);
}
.contact-form :deep(.v-field__input) {
  color: var(--bd-bone);
}
/* Placeholders default to a low opacity that washes out over the corridor —
   pin them to a readable muted bone. */
.contact-form :deep(.v-field__input)::placeholder {
  color: var(--bd-bone-mute);
  opacity: 1;
}
/* Keep keyboard/active focus unmistakable over the busy art: the outlined
   field already turns crimson on focus; add a soft crimson ring around it. */
.contact-form :deep(.v-field--focused) {
  box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.22);
}
.snack-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
</style>
