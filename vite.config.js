import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import autoprefixer from 'autoprefixer'
import mediaquery from 'postcss-combine-media-query'
import cssnano from 'cssnano'
import checker from 'vite-plugin-checker'

export default defineConfig({
  server: {
    port: 3005,
    watch: { usePolling: true }
  },
  preview: {
    port: 3000
  },
  plugins: [
    handlebars(),
    checker({
      typescript: true
    })
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed,
        mediaquery(),
        cssnano()
      ]
    }
  }
})
