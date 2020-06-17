import querystring from 'querystring'

export function formURL(origin, path = '', params = {}) {
  if (!origin || typeof origin !== 'string') {
    console.error(
      new Error(`origin must be a unempty string, but it is: ${origin}`)
    )
  }
  const query = querystring.stringify(params)
  return `${origin}${path}${query ? `?${query}` : ''}`
}
