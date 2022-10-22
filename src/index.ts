import { renderToString } from 'vue/server-renderer'
import { createApp } from 'vue'
import { html as _html } from 'satori-html'
import type { Component } from 'vue'

// Fix for error TS4058. Taken from satori-html source code.
export interface VNode {
  type: string
  props: {
    style?: Record<string, any>
    children?: string | VNode | VNode[]
    [prop: string]: any
  }
}

export async function html(component: Component): Promise<VNode> {
  const App = createApp(component)
  const strComponent = await renderToString(App)

  return _html(strComponent)
}
