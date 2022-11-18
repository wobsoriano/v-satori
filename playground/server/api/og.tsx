import * as fs from 'fs/promises'
import path from 'path'
import type { SatoriOptions } from 'satori'
// import satori from 'satori'
import { satori } from 'v-satori'
import { eventHandler, getQuery } from 'h3'
import Image from '@/components/jsx'

async function initFonts(): Promise<SatoriOptions['fonts']> {
  let fontData: Buffer

  try {
    const fontPath = path.join(process.cwd(), 'fonts', 'Roboto-Bold.ttf')
    const fontDataTest = await fs.readFile(fontPath)
    console.log('process.cwd()', process.cwd())
    console.log('fontDataTest', fontDataTest)
  } catch (err) {
    console.log('process.cwd()', process.cwd())
    console.log('ERR', err)
  }

  if (process.env.NODE_ENV === 'development') {
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Roboto-Bold.ttf')
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

  // @ts-expect-error: todo
  const svg = await satori(<Image title={query.title} website={query.website} />, {
    width: 1200,
    height: 627,
    fonts,
  })

  setHeader(event, 'Content-Type', 'image/svg+xml')

  return svg
})
