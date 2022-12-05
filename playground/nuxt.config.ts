import fs from 'fs'
import type { Plugin } from 'vite'

export default defineNuxtConfig({
  modules: ['v-satori/nuxt'],
  nitro: {
    rollupConfig: {
      plugins: [
        rawFonts(),
      ],
    },
  },
})

// adapted from mattjennings
// https://github.com/mattjennings/mattjennings.io/blob/master/vite.config.js
function rawFonts(): Plugin {
  return {
    name: 'rollup-plugin-raw-fonts',
    transform(_code, id) {
      if (id.endsWith('.ttf')) {
        const buffer = fs.readFileSync(id)
        return { code: `export default ${JSON.stringify(buffer)}`, map: null }
      }
    },
  }
}
