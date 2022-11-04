# v-satori

Generate a [satori](https://github.com/vercel/satori)-friendly VDOM from a Vue component. Uses [satori-html](https://github.com/natemoo-re/satori-html).

## Installion

```bash
npm install v-satori
```

## Usage

Example with Nuxt 3

```ts
// ~/components/Welcome.ts
import { defineComponent, h } from 'vue'

export default defineComponent({
  props: ['name', 'color'],
  setup(props) {
    return () => h(
      'div',
      { style: { color: props.color } },
      `Hello, ${props.name}`
    )
  }
})
```

```ts
// ~/server/api/og/[name].ts
import satori from 'satori'
import { html } from 'v-satori'
import { h } from 'vue'
import Welcome from '@/components/welcome'

export default defineEventHandler(async (event) => {
  const { name } = event.context.params

  const markup = await html(h(Welcome, { name, color: 'green' }))

  const svg = await satori(markup, {
    width: 600,
    height: 400,
    fonts: [],
  })

  return svg
})
```

Need help with SFC/TSX imports in Nuxt :D

## License

MIT
