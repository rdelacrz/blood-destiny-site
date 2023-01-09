import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import alias from '@rollup/plugin-alias';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Animations, mixins, and variables should automatically be accessible in all style sections
        additionalData: `
          @import './src/styles/_animations.scss';
          @import './src/styles/_mixins.scss';
          @import './src/styles/_variables.scss';
        `,
      },
    }
  },
  plugins: [
    vue(),
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, 'src'),
        }
      ]
    }),
  ],
});
