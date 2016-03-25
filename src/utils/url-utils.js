
export function getCurrentUrl(location, defaultUrl) {
  console.info('getCurrentUrl(Location, string?) -> string?')

  return location.hash.slice(1) || defaultUrl
}

export function parseUrlHost(url) {
  console.info('getCurrentUrl(string) -> string?')

  const [ protocol, , host ] = url.split('/')
  return host || null
}

export function parseProps(url) {
  console.info('getCurrentUrl(string) -> Props')

  const qs = url.split('?').slice(1).join('?')
  if (!qs) {
    return {}
  }

  return parseQueryString(qs)
}

export function parseQueryString(qs) {
  console.info('getCurrentUrl(string) -> Props')

  const pairs = qs.split('&')
  const props = pairs.reduce((props, pair) => {
    const [ key, ...valueParts ] = pair.split('=')
    const value = valueParts.join('=')
    props[key] = value
    return props
  }, {})

  return props
}
