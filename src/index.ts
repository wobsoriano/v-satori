import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
import { html as _html } from 'satori-html'
import type { Component } from 'vue'

export async function html(component: Component) {
  const App = createSSRApp(component)
  const strComponent = await renderToString(App)

  return _html(strComponent)
}
