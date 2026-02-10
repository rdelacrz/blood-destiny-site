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
      prerender: true,
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vuetify({ 
      styles: {
        configFile: "styles/vuetify-settings.scss"
      },
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
  // Optimize dependencies for better performance
  optimizeDeps: { 
    include: ["cross-fetch", "@tanstack/vue-query", "pinia"],
    exclude: ["vite-plugin-vuetify"]
  },
  // Enable esbuild for faster builds
  esbuild: {
    target: "es2022"
  },
  // Configure build options
  build: {
    target: "es2022",
    cssTarget: "chrome61",
  }
}

export default config;
