import { defineNuxtModule } from '@nuxt/kit'
import vue from '@vitejs/plugin-vue'

export default defineNuxtModule({
  meta: {
    name: 'v-satori',
    configKey: 'satori',
  },
  defaults: {
    jsx: false,

  },
  setup(options, nuxt) {
    nuxt.hook('nitro:config', async (config) => {
      config.rollupConfig = config.rollupConfig || {}
      config.rollupConfig.plugins = config.rollupConfig.plugins || []

      config.rollupConfig.plugins.push(vue())

      if (options.jsx) {
        const vueJsx = await import('@vitejs/plugin-vue-jsx').then(r => r.default || r)
        config.rollupConfig.plugins.push(vueJsx())
      }
    })
  },
})
