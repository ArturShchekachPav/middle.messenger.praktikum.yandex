import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';
import mediaquery from 'postcss-combine-media-query';
import cssnano from 'cssnano';

export default defineConfig({
  server: {
    port: 3005,
    watch: { usePolling: true },
  },
  preview: {
    port: 3000,
  },
  plugins: [
      handlebars()
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed,
        mediaquery(),
        cssnano()
      ],
    }
  },
});