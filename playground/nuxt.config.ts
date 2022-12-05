import FontToBuffer from 'unplugin-font-to-buffer/rollup'

export default defineNuxtConfig({
  modules: ['v-satori/nuxt'],
  nitro: {
    rollupConfig: {
      plugins: [
        FontToBuffer(),
      ],
    },
  },
})
