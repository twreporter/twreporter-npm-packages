import url from 'url'

/**
 * @param { string } originalUrl - The original url
 * @param { Object } params - search params to be set
 * @return { string } originalUrl with search params
 */
export default function linkWithParams(originalUrl, params) {
  const urlObj = new URL(originalUrl)
  for (let key in params) {
    if (params[key]) {
      urlObj.searchParams.set(key, params[key])
    }
  }
  return url.format(urlObj)
}
