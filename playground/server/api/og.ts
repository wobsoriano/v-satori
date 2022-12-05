import type { SatoriOptions } from 'satori'
import { satori } from 'v-satori'
import { eventHandler, getQuery } from 'h3'
import Image from '@/components/sfc.vue'

import Roboto from '@/lib/fonts/Roboto-Regular.ttf'

async function initFonts(): Promise<SatoriOptions['fonts']> {
  return [
    {
      name: 'Roboto',
      data: Buffer.from(Roboto),
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
    height: 627,
    fonts,
  })

  setHeader(event, 'Content-Type', 'image/svg+xml')

  return svg
})
