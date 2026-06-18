import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
// style.css first: it declares the global @layer order (Vuetify layers
// before Tailwind's), so Tailwind utilities can override Vuetify styles.
import './style.css'
import vuetify from './plugins/vuetify'

/* Self-hosted fonts (replaces the prototype's Google Fonts <link>) ----------
   Cormorant Garamond — display (incl. italic for hero tag + drop-cap)
   Chakra Petch       — UI / eyebrows / nav
   Manrope            — body                                                   */
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/cormorant-garamond/600-italic.css'
import '@fontsource/chakra-petch/400.css'
import '@fontsource/chakra-petch/500.css'
import '@fontsource/chakra-petch/600.css'
import '@fontsource/chakra-petch/700.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'

createApp(App).directive('reveal', reveal).use(router).use(vuetify).mount('#app')
