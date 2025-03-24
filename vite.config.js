import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer'


export default defineConfig({
  plugins: [handlebars()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}) // add options if needed
      ],
    }
  }
})