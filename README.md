# v-satori

Generate a [satori](https://github.com/vercel/satori)-friendly VDOM from a Vue component. Uses [satori-html](https://github.com/natemoo-re/satori-html).

## Installion

```bash
npm install v-satori
```

## Usage

Example with Nuxt 3

```ts
// ~/components/Image.ts
import { defineComponent, h } from 'vue'

const TW = (tag, tw, children) => h(tag, { tw }, children)

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => TW(
      'div',
      'h-full w-full flex items-start justify-start border border-blue-500 border-[12px] bg-gray-50',
      TW(
        'div',
        'flex items-start justify-start h-full',
        TWElement(
          'div',
          'flex flex-col justify-between w-full h-full',
          [
            TW('h1', 'text-[80px] p-20 font-black text-left', props.title),
            TW('div', 'text-2xl pb-10 px-20 font-bold mb-0', props.website)
          ]
        )
      )
    )
  }
})
```

```ts
// ~/server/api/og.ts
import satori from 'satori'
import { h } from 'vue'
import { html } from 'v-satori'
import Image from '@/components/Image'

export default defineEventHandler(async (event) => {
  const query = useQuery(event)

  const markup = await html(h(Tailwind, {
    title: query.title,
    website: query.website
  }))

  const svg = await satori(markup, {
    width: 1200,
    height: 627,
    // fonts required
  })

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

<img src="sample.svg" />

Need help with SFC/TSX imports :D

## License

MIT
