/* =====================================================================
   Vuetify 4 — brand integration
   A single custom DARK theme ("bloodDestiny") mapped to the existing
   design tokens from src/assets/main.css @theme / :root, plus global component
   defaults tuned for the cinematic look. Vuetify is adopted SELECTIVELY;
   bespoke pieces (hero, atmosphere, character art) stay hand-rolled.
   ===================================================================== */
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import type { ThemeDefinition } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

/* Brand tokens (kept in sync with src/assets/main.css):
   crimson  #C8102E / blood #8B0000      — primary / accent
   ink      #0A0A0C / #15151A / #2A2A30  — surfaces
   steel    #7FB5D6 / #3A6B8C            — cold-blue secondary
   bone     #F5F0E8                       — text                            */
const bloodDestiny: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0A0A0C',
    surface: '#15151A',
    'surface-bright': '#2A2A30',
    'surface-light': '#2A2A30',
    'surface-variant': '#2A2A30',
    'on-surface-variant': '#F5F0E8',
    primary: '#C8102E',
    'primary-darken-1': '#8B0000',
    secondary: '#7FB5D6',
    'secondary-darken-1': '#3A6B8C',
    accent: '#8B0000',
    error: '#E63A52',
    info: '#7FB5D6',
    success: '#7FB5D6',
    warning: '#C8102E',
    'on-background': '#F5F0E8',
    'on-surface': '#F5F0E8',
    'on-primary': '#F5F0E8',
    'on-secondary': '#0A0A0C',
    'on-error': '#F5F0E8',
  },
  variables: {
    'border-color': '#3A3A42',
    'theme-on-surface': '#F5F0E8',
    'medium-emphasis-opacity': 0.74,
    'disabled-opacity': 0.42,
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'bloodDestiny',
    themes: { bloodDestiny },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  // Global defaults so adopted components match the cinematic style without
  // per-call prop noise. Components we keep bespoke are unaffected.
  defaults: {
    global: {
      rounded: 'sm',
    },
    VBtn: {
      variant: 'flat',
      rounded: 'sm',
      // matches the bespoke .btn type treatment (UI font, wide tracking)
      class: 'font-ui tracking-[0.18em]',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
      hideDetails: 'auto',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
      hideDetails: 'auto',
    },
    VSnackbar: {
      rounded: 'sm',
      location: 'bottom',
    },
  },
});
