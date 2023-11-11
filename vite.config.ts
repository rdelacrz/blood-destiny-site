import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import md from 'unplugin-vue-markdown/vite';
import { UserConfig } from 'vite';
import vike from 'vike/plugin';
import alias from '@rollup/plugin-alias';

const projectRootDir = resolve(__dirname);

const config: UserConfig = {
  publicDir: resolve(projectRootDir, 'public'),
  css: {
    preprocessorOptions: {
      scss: {
        // Animations, mixins, and variables should automatically be accessible in all style sections
        additionalData: `
          @import './renderer/styles/_animations.scss';
          @import './renderer/styles/_mixins.scss';
          @import './renderer/styles/_variables.scss';
        `,
      },
    }
  },
  plugins: [
    vike({ prerender: true }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    md({}),
    alias({
      entries: [
        {
          find: '@',
          replacement: projectRootDir,
        },
      ]
    }),
  ],
  // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks Vike's CI
  optimizeDeps: { include: ['cross-fetch'] }
}

export default config
