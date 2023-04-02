/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/win-98/',
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    checker({ typescript: true }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/_mixins.scss";
          @import "./src/styles/_variables.scss";
          @import "./src/styles/_spacing.scss";
        `
      }
    }
  }
})
