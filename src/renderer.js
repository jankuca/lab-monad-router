import { partial } from './utils/fn-utils'


export function render(dom, renderer, props) {
  console.log('render(Dom, Props -> Rendering?, Props) -> Promise<RenderingResult?>')

  if (!renderer) {
    return Promise.resolve(null)
  }
  return renderer(props)
    .then(partial(_printRendering, dom))
}

export function clearRendering(dom) {
  console.log('clearRendering(Dom) -> Promise<null>')

  dom.innerHTML = '(EXIT)'
  dom.onclick = null
  return Promise.resolve(null)
}


function _printRendering(dom, rendering) {
  console.log('printRendering(Dom, Rendering?) -> Promise<RenderingResult?>')

  if (!rendering) {
    return clearRendering(dom)
  }

  dom.innerHTML = (
    '<' + rendering.type + '>' +
      rendering.text +
    '</' + rendering.type + '>'
  )
  return new Promise((resolve) => {
    dom.onclick = () => {
      resolve({
        nextUrl: rendering.nextUrl
      })
    }
  })
}
