import { render, clearRendering } from './renderer'
import { partial } from './utils/fn-utils'
import { parseProps, parseUrlHost } from './utils/url-utils'


export function openUrl(dom, renderers, url) {
  console.info('openUrl(Dom, Object.<string, Props -> RenderingResult?>, string?) -> Promise<RenderingResult?>')

  const renderer = _getRendererForUrl(renderers, url)
  const props = parseProps(url)

  return render(dom, renderer, props)
}

export function exit(dom) {
  console.info('exit(Dom) -> Promise<null>')

  return clearRendering(dom)
}


function _getRendererForUrl(renderers, url) {
  console.log('getRendererForUrl(Object.<string, Props -> RenderingResult?>, string) -> (Props -> RenderingResult?)?')

  const host = parseUrlHost(url)
  if (!host) {
    return null
  }
  return renderers[host] || null
}
