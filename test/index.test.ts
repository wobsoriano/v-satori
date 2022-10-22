import 'node-fetch-native/polyfill'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import satori from 'satori'
import { html } from '../src'

describe('should run', () => {
  it('exported', async () => {
    const App = defineComponent({
      data: () => ({ width: 300, height: 300, src: 'https://og-image.vercel.app/Hello%20World.png' }),
      template: '<img :src="src" :width="width" :height="height" />',
    })

    const res = await html(App)
    const asd = await satori(res, {
      width: 300,
      height: 300,
      fonts: [],
    })

    expect(asd).toMatchSnapshot()
  })
})
