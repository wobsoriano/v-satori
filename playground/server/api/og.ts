import { satori } from 'v-satori'
import { eventHandler, getQuery } from 'h3'
import { Resvg } from '@resvg/resvg-js'
import Image from '@/components/Image.vue'
import Roboto from '@/lib/fonts/Roboto-Regular.ttf'

export default eventHandler(async (event) => {
  const query = getQuery(event) as Record<string, string>

  const svg = await satori(Image, {
    props: {
      title: query.title || 'OG Image Generator using Nuxt and Satori',
      website: query.website || 'v-satori.vercel.app',
    },
    width: 1200,
    height: 630,
    fonts: [{
      name: 'Roboto',
      data: Roboto,
      weight: 400,
      style: 'normal',
    }],
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
