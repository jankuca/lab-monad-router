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

  const doc = dom.ownerDocument
  return _printRenderingActions(doc, dom, rendering.actions)
}

function _printRenderingActions(doc, dom, actions) {
  console.log('printRenderingActions(DomDocument, Dom, RenderingAction) -> Promise<RenderingResult?>')

  return Promise.race(
    actions.map(partial(_printRenderingAction, doc, dom))
  )
}

function _printRenderingAction(doc, dom, action) {
  console.log('printRenderingAction(DomDocument, Dom, RenderingAction) -> Promise<RenderingResult?>')

  const button = doc.createElement('button')
  button.type = 'button'
  button.innerHTML = action.label
  dom.appendChild(button)

  return new Promise((resolve) => {
    button.onclick = () => {
      resolve({
        nextUrl: action.url
      })
    }
  })
}
