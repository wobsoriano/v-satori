import { renderToString } from 'vue/server-renderer'
import { createApp, h } from 'vue'
import { html as _html } from 'satori-html'
import type { SatoriOptions } from 'satori'
import _satori from 'satori'
import type { App, Component } from 'vue'

// Fix for error TS4058. Taken from satori-html source code.
export interface VNode {
  type: string
  props: {
    style?: Record<string, any>
    children?: string | VNode | VNode[]
    [prop: string]: any
  }
}

export type ExtractComponentProps<TComponent> =
  TComponent extends new () => {
    $props: infer P
  }
    ? P
    : never

export async function html<T extends Component = Component>(component: T, props?: ExtractComponentProps<T>): Promise<VNode> {
  let Root: App<Element>

  if (props)
    Root = createApp(h(component, props))
  else
    Root = createApp(component)

  const strComponent = await renderToString(Root)

  return _html(strComponent)
}

export async function satori<T extends Component = Component>(component: T, options: SatoriOptions & {
  props: ExtractComponentProps<T>
}) {
  const markup = await html(component)
  const result = await _satori(markup, options)
  return result
}
