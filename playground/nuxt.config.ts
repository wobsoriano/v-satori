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
  satori: {
    jsx: false,
  },
})

// adapted from mattjennings
// https://github.com/mattjennings/mattjennings.io/blob/master/vite.config.js
function rawFonts(): Plugin {
  return {
    name: 'vite-plugin-raw-fonts',
    transform(code, id) {
      if (id.endsWith('.ttf')) {
        const base64 = fs.readFileSync(id, { encoding: 'base64' })
        return { code: `export default ${JSON.stringify(base64)}`, map: null }
      }
    },
  }
}
