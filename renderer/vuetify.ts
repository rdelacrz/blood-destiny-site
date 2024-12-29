import { createVuetify, type ThemeDefinition } from "vuetify";
import {
  VBtn,
  VCard,
  VCardText,
  VDialog,
  VForm,
  VSelect,
  VSnackbar,
  VTextarea,
  VTextField,
} from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

const customBloodDestinyTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#0A101E",
    primary: "#FF0000",
  },
};

export const vuetify = createVuetify({
  components: {
    VBtn,
    VCard,
    VCardText,
    VDialog,
    VForm,
    VSelect,
    VSnackbar,
    VTextarea,
    VTextField,
  },
  directives,
  ssr: true,
  theme: {
    defaultTheme: "customBloodDestinyTheme",
    themes: {
      customBloodDestinyTheme,
    },
  },
});