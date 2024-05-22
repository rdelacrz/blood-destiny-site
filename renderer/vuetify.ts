import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
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
  components,
  directives,
  ssr: true,
  theme: {
    defaultTheme: "customBloodDestinyTheme",
    themes: {
      customBloodDestinyTheme,
    },
  },
});