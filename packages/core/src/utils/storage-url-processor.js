import { getGlobalEnv } from './global-env'

const storage = {
  google: {
    schema: 'https',
    hostname: 'storage.googleapis.com',
    bucket: 'twreporter-multimedia',
  },
}

const mainSite = {
  url: 'https://www.twreporter.org',
}

/**
 * Replace Google Cloud Storage url origin with the origin of main site
 *
 * @export
 * @param {string} [url=''] The url with Google Cloud Storage url
 * @param {boolean} [forceToReplace=false] The defaut action is not to replace the origin when nodeEnv==='development', use the para to overwrite it.
 * @returns
 */
export function replaceGCSUrlOrigin(url = '', forceToReplace = false) {
  const isDev = getGlobalEnv().nodeEnv === 'development'
  if (!forceToReplace && (isDev || typeof url !== 'string')) {
    return url
  }
  const { schema, hostname, bucket } = storage.google
  const toReplace = mainSite.url
  const toBeReplaced = `${schema}://${hostname}/${bucket}`
  return url.replace(toBeReplaced, toReplace)
}
