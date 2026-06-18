import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import tailwindcss from '@tailwindcss/vite'

// transformAssetUrls lets Vuetify components (e.g. <v-img src="…/foo.png">)
// resolve local asset URLs through Vite, so it's wired into @vitejs/plugin-vue.
export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    // autoImport: tree-shakes + auto-registers Vuetify components/directives.
    vuetify({ autoImport: true }),
    tailwindcss(),
  ],
});
