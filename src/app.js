import renderDocumentList from './renderers/document-list'
import renderDocument from './renderers/document'

import { openUrl, exit } from './router'
import { partial } from './utils/fn-utils'
import { getCurrentUrl } from './utils/url-utils'


export function main(document, location, logger, defaultUrl = null) {
  console.info('main(DomDocument, Location, Logger, string?) -> Promise<null>')

  const dom = document.getElementById('app')
  const initialUrl = getCurrentUrl(location, defaultUrl)
  const renderers = _getRouteRenderers()

  return _runWithUrl(dom, renderers, initialUrl).then((result) => {
    logger.log('EXIT', result)
    return null
  })
}


function _runWithUrl(dom, renderers, initialUrl) {
  console.log('runWithUrl(DomDocument, Object.<string, Props -> Rendering?>, string?) -> Promise<RenderingResult?>')

  if (!initialUrl) {
    return exit(dom)
  }

  return openUrl(dom, renderers, initialUrl)
    .then(partial(_processRenderingResult, dom, renderers))
    .then(partial(_runWithUrl, dom, renderers))
}

function _getRouteRenderers() {
  console.log('getRouteRenderers() -> Object.<string, Props -> Promise<Rendering?>>')

  return {
    'document-list': renderDocumentList,
    'documents': renderDocument
  }
}

function _processRenderingResult(dom, renderers, result) {
  console.log('processRenderingResult(DomDocument, Object.<string, Props -> Promise<Rendering?>>, RenderingResult?) -> Promise<string?>')

  const nextUrl = result ? result.nextUrl : null
  return Promise.resolve(nextUrl)
}
