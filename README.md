# v-satori

Generate a [satori](https://github.com/vercel/satori)-friendly VDOM from a Vue component. Uses [satori-html](https://github.com/natemoo-re/satori-html).

## Installion

```bash
npm install v-satori
```

## Usage

```ts
import satori from 'satori'
import { html } from 'v-satori'

export default defineEventHandler(async () => {
  const App = defineComponent({
    data: () => ({ text: 'hello, world', color: 'black' }),
    template: '<div :style="{ color }">{{ text }}</div>'
  })

  const markup = await html(App)

  const svg = await satori(markup, {
    width: 600,
    height: 400,
    fonts: [],
  })

  return svg
})
```

## License

MIT
