import type { SatoriOptions } from 'satori'
import { satori } from 'v-satori'
import { eventHandler, getQuery } from 'h3'
import { Resvg } from '@resvg/resvg-js'
import Image from '@/components/Image.vue'

import Roboto from '@/lib/fonts/Roboto-Regular.ttf'

async function initFonts(): Promise<SatoriOptions['fonts']> {
  return [
    {
      name: 'Roboto',
      data: Buffer.from(Roboto, 'base64'),
      weight: 400,
      style: 'normal',
    },
  ]
}

export default eventHandler(async (event) => {
  const fonts = await initFonts()

  const query = getQuery(event) as Record<string, string>

  const svg = await satori(Image, {
    props: {
      title: query.title || 'OG Image Generator using Nuxt and Satori',
      website: query.website || 'v-satori.vercel.app',
    },
    width: 1200,
    height: 600,
    fonts,
  })

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'original',
    },
  })

  const png = resvg.render()

  setHeader(event, 'Content-Type', 'image/png')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, immutable')

  return png.asPng()
})
