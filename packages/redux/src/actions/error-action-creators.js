import httpConsts from '../constants/http-protocol'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

/**
 *  Refine Axios config to remain the infomative properties.
 *  @param {Object} axiosConfig - config provied by Axios
 *  @return {Object} - empty object or the object containing the following properties
 *  'url',
 *  'method' ,
 *  'baseURL',
 *  'headers',
 *  'params',
 *  'timeout',
 *  'withCredentials',
 *  'auth',
 *  'responseType',
 *  'responseEncoding',
 *  'maxContentLength',
 *  'proxy'
 *
 *  For other removed properties,
 *  see https://github.com/axios/axios#request-config
 */
function refineAxiosConfig(axiosConfig) {
  if (typeof axiosConfig === 'object' && axiosConfig !== null) {
    return {
      // request url
      url: axiosConfig.url,
      // requst method
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
 *  Axios Error object
 *  @typedef {Error} AxiosError
 *  @property {Function} toJSON
 *  @property {Object} config - Axios config
 *  @property {Object} request - Axios request
 *  @property {Object} response- Axios response
 *  @property {bool} isAxiosError
 *  @property {string} message - Error message
 *  @property {string} stack - Error stack
 */

/**
 *  Refined Axios error object type definition
 *  We only pick certain properties of Axios error to log
 *  because of the record size limitation (250kb) of
 *  Stackdriver logging system.
 *  @typedef {Error} RefinedAxiosError
 *  @property {Object} config - Refined Axios config object
 *  @property {Object} data - Server response body
 *  @property {Object} headers - Server response headers
 *  @property {number} statusCode - Response status code
 *  @property {string} message - Error message
 *  @property {string} name - Error name
 */

/**
 *  Error rejected from Axios contains many details
 *  which we might not need.
 *  Therefore, we need to remove those properties
 *  to maintain a neat and informative object.
 *
 *  @param {AxiosError} err - Axios Error object
 *  @return {RefinedAxiosError}
 */
function refineAxiosError(err) {
  const config = refineAxiosConfig(_.get(err, 'config'))
  let data = null
  let statusCode = httpConsts.statusCode.internalServerError
  let headers = null
  let message = _.get(err, 'message')

  if (err.response) {
    data = _.get(err, 'response.data')
    statusCode = _.get(err, 'response.status')
    headers = _.get(err, 'response.headers')
  } else if (err.request) {
    message = 'A request was made but no response was received: ' + message
  } else {
    message = 'An error occured when setting up the request: ' + message
  }

  const refinedErr = new Error(message)
  refinedErr.name = 'AxiosError'
  refinedErr.data = data
  refinedErr.statusCode = statusCode
  refinedErr.headers = headers
  refinedErr.config = config

  return refinedErr
}

/**
 *  error action type definition
 *  @typedef {Object} ErrorAction
 *  @property {string} type - Action error type
 *  @property {RefinedAxiosError} payload
 */

/**
 * @param {Object} [invalidFields] - object with invalid fields and resaons
 * @param {string} failActionType
 * @returns {ErrorAction}
 */
function handleValidationFailureBeforeRequest(invalidFields, failActionType) {
  const error = new Error(
    'Data validation failed before the http request was made.'
  )
  error.name = 'ValidationError'
  error.data = invalidFields
  error.statusCode = httpConsts.statusCode.badRequest
  error.headers = null
  error.config = null
  return {
    type: failActionType,
    payload: {
      error,
    },
  }
}

/**
 *  Create an action which carefully records the details about the error.
 *  @param {AxiosError} [err={}] - Axios Error
 *  @param {string} failActionType
 *  @returns {ErrorAction}
 */
function createAxiosErrorAction(err = {}, failActionType) {
  return {
    type: failActionType,
    payload: {
      error: refineAxiosError(err),
    },
  }
}

export default {
  axios: createAxiosErrorAction,
  preRequestValidation: handleValidationFailureBeforeRequest,
}
