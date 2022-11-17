import * as fs from 'fs/promises'
import { join } from 'path'
import type { SatoriOptions } from 'satori'
import satori from 'satori'
import { html } from 'v-satori'
import { eventHandler, getQuery } from 'h3'
import Image from '@/components/Image'

async function initFonts(): Promise<SatoriOptions['fonts']> {
  let fontData: Buffer

  if (process.env.NODE_ENV === 'development') {
    const fontPath = join(process.cwd(), 'public', 'fonts', 'Roboto-Bold.ttf')
    fontData = await fs.readFile(fontPath)
  }
  else {
    // TODO: Fix this
    fontData = await $fetch('https://v-satori.vercel.app/fonts/Roboto-Bold.ttf', {
      responseType: 'arrayBuffer',
    })
  }

  return [
    {
      name: 'Inter',
      data: fontData,
      weight: 400,
      style: 'normal',
    },
  ]
}

export default eventHandler(async (event) => {
  const fonts = await initFonts()

  const query = getQuery(event) as Record<string, string>

  const markup = await html(Image, {
    title: query.title || 'OG Image Generator using Nuxt and Satori',
    website: query.website || 'v3.nuxtjs.org',
  })

  const svg = await satori(markup, {
    width: 1200,
    height: 627,
    fonts,
  })

  return svg
})
