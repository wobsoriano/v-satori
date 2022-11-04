import * as fs from 'fs/promises'
// import { join } from 'path'
import type { SatoriOptions } from 'satori'
import satori from 'satori'
import { h } from 'vue'
import { html } from 'v-satori'
import { eventHandler, getQuery } from 'h3'
import Image from '@/components/Image'

export const config = {
  runtime: 'experimental-edge',
}

async function initFonts(): Promise<SatoriOptions['fonts']> {
  const fontData = await fs.readFile('fonts/Roboto-Bold.ttf')
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

  const query = getQuery(event)

  const markup = await html(h(Image as any, {
    title: query.title || 'The optional chaining operator (?.) in Javascript',
    website: query.website || 'fullstackheroes.com',
  }))

  const svg = await satori(markup, {
    width: 1200,
    height: 627,
    fonts,
  })

  return svg
})
