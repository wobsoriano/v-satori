import { defineNuxtModule } from '@nuxt/kit'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default defineNuxtModule({
  meta: {
    name: 'v-satori',
    configKey: 'satori',
  },
  setup(_options, nuxt) {
    nuxt.hook('nitro:config', (config) => {
      config.rollupConfig.plugins = config.rollupConfig.plugins || []
      config.rollupConfig.plugins.push(
        nodeResolve({
          extensions: ['.ts', '.mjs', '.js', '.json', '.node', '.tsx', '.jsx'],
        }),
        vue(),
        vueJsx(),
      )
    })
  },
})
