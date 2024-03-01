import { resolve } from "path";
import { telefunc } from "telefunc/vite";
import vue from "@vitejs/plugin-vue";
import md from "unplugin-vue-markdown/vite";
import { UserConfig } from "vite";
import vuetify from "vite-plugin-vuetify";
import vike from "vike/plugin";
import alias from "@rollup/plugin-alias";

const projectRootDir = resolve(__dirname);

const config: UserConfig = {
  publicDir: resolve(projectRootDir, "public"),
  assetsInclude: ["node_modules/vike-vue/dist/renderer/onRenderHtml.js"],
  server: {
    preTransformRequests: false
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Animations, mixins, and variables should automatically be accessible in all style sections
        additionalData: `
          @import "./styles/_animations.scss";
          @import "./styles/_mixins.scss";
          @import "./styles/_variables.scss";
        `,
      },
    }
  },
  ssr: {
    noExternal: ["vuetify"],
  },
  plugins: [
    vike({
      prerender: {
        partial: true,
      },
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vuetify({ 
      autoImport: true,
    }),
    md({}),
    telefunc(),
    alias({
      entries: [
        {
          find: "@",
          replacement: projectRootDir,
        },
      ]
    }),
  ],
  // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks Vike"s CI
  optimizeDeps: { include: ["cross-fetch"] },
}

export default config;
