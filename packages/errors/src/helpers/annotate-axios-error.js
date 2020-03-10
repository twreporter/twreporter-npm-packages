import get from 'lodash.get'
import AnnotatingError from '../annotating-error'

const _ = {
  get,
}

/**
 *  We only pick certain properties from Axios config
 *  because of the record size limitation (250kb) of
 *  StackDriver logging system.
 *  @typedef PartialAxiosConfig
 *  @property {string} url
 *  @property {string} method
 *  @property {string} baseURL
 *  @property {*} headers
 *  @property {*} params
 *  @property {number} timeout
 *  @property {boolean} withCredentials
 *  @property {*} auth
 *  @property {string} responseType
 *  @property {string} responseEncoding
 *  @property {number} maxContentLength
 *  @property {*} proxy
 */

/**
 *  Pick informative properties from axios config. For other removed properties, see https://github.com/axios/axios#request-config
 *  @param {Object} axiosConfig - full config provided by Axios
 *  @return {PartialAxiosConfig|{}}
 *
 */
function pruneAxiosConfig(axiosConfig) {
  if (typeof axiosConfig === 'object' && axiosConfig !== null) {
    return {
      // request url
      url: axiosConfig.url,
      // request method
      method: axiosConfig.method,
      // request baseURL
      baseURL: axiosConfig.baseURL,
      // request headers
      headers: axiosConfig.headers,
      // request query params
      params: axiosConfig.params,
      // request data
      data: axiosConfig.data,
      // request timeout
      timeout: axiosConfig.timeout,
      withCredentials: axiosConfig.withCredentials,
      auth: axiosConfig.auth,
      responseType: axiosConfig.responseType,
      responseEncoding: axiosConfig.responseEncoding,
      maxContentLength: axiosConfig.maxContentLength,
      proxy: axiosConfig.proxy,
    }
  }
  return {}
}

/**
 *
 *
 * @param {Error} axiosError
 * @returns {AnnotatingError}
 */
function annotateAxiosError(axiosError) {
  let message = 'failed to make an axios request'
  let response, headers
  if (axiosError.response) {
    const statusCode = _.get(axiosError, 'response.status')
    response = {
      statusCode,
      data: _.get(axiosError, 'response.data'),
      headers: _.get(axiosError, 'response.headers'),
    }
    message = `an axios request was made but response with status ${statusCode}`
  } else if (axiosError.request) {
    message = 'an axios request was made but no response was received'
  }
  const payload = {
    response,
    headers,
    config: pruneAxiosConfig(_.get(axiosError, 'config')),
  }
  return new AnnotatingError(
    axiosError,
    'AxiosError',
    message,
    payload,
    annotateAxiosError
  )
}

export default annotateAxiosError
