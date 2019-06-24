const storageConfig = {
  schema: 'https',
  hostname: 'storage.googleapis.com',
  bucket: 'twreporter-multimedia',
}
const URL_NO_SLASH = 'https://www.twreporter.org'

export function replaceStorageUrlPrefix(url = '') {
  if (process.env.NODE_ENV !== 'production' || typeof url !== 'string') {
    return url
  }
  const { schema, hostname, bucket } = storageConfig
  const toBeReplaced = `${schema}://${hostname}/${bucket}`
  const toReplace = `${URL_NO_SLASH}`
  return url.replace(toBeReplaced, toReplace)
}
