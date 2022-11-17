# v-satori

Generate a [satori](https://github.com/vercel/satori)-friendly VDOM from a Vue component. Uses [satori-html](https://github.com/natemoo-re/satori-html).

## Installion

```bash
npm install satori v-satori
```

## Usage

Nuxt 3

```ts
export default defineNuxtConfig({
  modules: ['v-satori/nuxt']
})
```

```vue
<script setup>
defineProps({
  title: String,
  website: String,
})
</script>

<template>
  <div tw="h-full w-full flex items-start justify-start border border-blue-500 border-[12px] bg-gray-50">
    <div tw="flex items-start justify-start h-full">
      <div tw="flex flex-col justify-between w-full h-full'">
        <h1 tw="text-[80px] p-20 font-black text-left">
          {{ title }}
        </h1>
        <div tw="text-2xl pb-10 px-20 font-bold mb-0">
          {{ website }}
        </div>
      </div>
    </div>
  </div>
</template>
```

```ts
// ~/server/api/og.ts
import { satori } from 'v-satori'
import Image from '@/components/Image.vue'

export default eventHandler(async (event) => {
  const query = useQuery(event)

  const svg = await satori(Image, {
    props: {
      title: query.title,
      website: query.website
    },
    width: 1200,
    height: 627,
    fonts: []
  })

  setHeader(event, 'Content-Type', 'image/svg+xml')

  return svg
})
```

You can then create new dynamic images by passing the following parameters to the API endpoint:

```vue
<script setup>
const title = 'OG Image Generator using Nuxt and Satori'
const website = 'v3.nuxtjs.org'
</script>

<template>
  <Head>
    <Meta property="og:image" :content="`/api/og?title=${title}&website=${website}`" />
  </Head>
</template>
```

Output:

<img src="og.svg" />

## License

MIT
