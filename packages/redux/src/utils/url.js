import qs from 'qs'

export function formURL(origin, path = '', params = {}, uriEncode = true) {
  if (!origin || typeof origin !== 'string') {
    console.error(
      new Error(`origin must be a unempty string, but it is: ${origin}`)
    )
  }
  const query = qs.stringify(params, { encode: uriEncode })
  return `${origin}${path}${query ? `?${query}` : ''}`
}
