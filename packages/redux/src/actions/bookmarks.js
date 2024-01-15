import { formURL } from '../utils/url'
import apiConfig from '../constants/api-config'
import failActionCreators from './error-action-creators'
import stateFieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const apiTimeout = apiConfig.timeout

/**
 * @typedef {Object} userData
 * @property {string} email - email of user
 * @property {string} id - id of user
 * @property {string} jwt - json web token issued by backend for this certain user
 */

/**
 * https://github.com/twreporter/go-api#get-bookmarks
 * https://github.com/twreporter/go-api/blob/master/models/bookmark.go
 * @typedef {Object} Bookmark
 * @property {number} id
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} deleted_at
 * @property {number} published_date
 * @property {string} slug
 * @property {string} host_name
 * @property {string} is_external
 * @property {string} title
 * @property {string} desc
 * @property {string} thumbnail
 */

/**
 * https://github.com/twreporter/go-api#create-a-bookmark
 * https://github.com/twreporter/go-api/blob/master/models/bookmark.go
 * @typedef {Object} BookmarkToBeCreated
 * @property {string} slug
 * @property {string} host
 * @property {string} is_external
 * @property {string} title
 * @property {string} desc
 * @property {string} thumbnail
 * @property {string} published_date
 */

/**
 * @typedef {Object} RequestAction
 * @property {string} type - The type of action
 * @property {string} payload.method - The HTTP request method
 * @property {string} payload.url - The target to send request
 * @property {Object} payload.body - The request body with POST, PUT, DELETE, or PATCH request
 * @property {Object} payload.headers - The request header
 */

/**
 * @typedef {Object} SuccessAction
 * @property {string} type - The type of action
 * @property {string} payload
 * @property {Object} payload.data - Response data
 * @property {Object} payload.headers - The response header
 * @property {string} payload.statusCode - Response status code
 * @property {Object} payload.config - details of response
 */

/**
 * @param {Object} axiosResponse
 * @param {string} actionType
 * @returns {SuccessAction}
 */
function buildSuccessActionFromRes(axiosResponse, actionType) {
  return {
    type: actionType,
    payload: {
      config: _.get(axiosResponse, 'config'),
      data: _.get(axiosResponse, 'data'),
      headers: _.get(axiosResponse, 'headers'),
      statusCode: _.get(axiosResponse, 'status'),
    },
  }
}

/**
 *  @typedef {Object} FailAction
 *  @property {string} type - Action error type
 *  @property {string} payload
 *  @property {string} payload.statusCode - Response status code
 *  @property {string} payload.message - Error message
 *  @property {object} payload.error - Error object
 */

/**
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @param {BookmarkToBeCreated} bookmarkToBeCreated
 * @return {Function} - function will be executed in Redux Thunk middleware
 */
export function createSingleBookmark(jwt, userID, bookmarkToBeCreated) {
  /* go-api takes `published_date` as an unix timestamp (in secs) int */
  // eslint-disable-next-line camelcase
  const { published_date, ...passedBookmarkProperties } = bookmarkToBeCreated

  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @param {Object} option
   * @param {Object} option.httpClientWithToken
   * @return {Promise} resolve with success action or reject with fail action
   */
  return function(dispatch, getState, { httpClientWithToken }) {
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, `/v1/users/${userID}/bookmarks`, {}, false)
    const axiosConfig = {
      timeout: apiTimeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
    const interceptor = httpClientWithToken.interceptors.request.use(config => {
      const { method, url, headers, data } = config
      dispatch({
        type: types.singleBookmark.create.request,
        payload: {
          method,
          url,
          headers,
          body: data,
        },
      })
      httpClientWithToken.interceptors.request.eject(interceptor)
      return config
    })
    return httpClientWithToken
      .post(
        url,
        {
          published_date: Math.ceil(new Date(published_date).getTime() / 1000),
          ...passedBookmarkProperties,
        },
        axiosConfig
      )
      .then(res => {
        const successAction = buildSuccessActionFromRes(
          res,
          types.singleBookmark.create.success
        )
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = failActionCreators.axios(
          error,
          types.singleBookmark.create.failure
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}

/**
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @param {number} offset - the offset of the request
 * @param {number} limit - max amount of records per fetch
 * @return {Function} - function will be executed in Redux Thunk middleware
 */
export function getMultipleBookmarks(jwt, userID, offset, limit) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @param {Object} option
   * @param {Object} option.httpClientWithToken
   * @return {Promise} resolve with success action or reject with fail action
   */
  return function(dispatch, getState, { httpClientWithToken }) {
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(
      apiOrigin,
      `/v1/users/${userID}/bookmarks`,
      { offset, limit },
      false
    )
    const axiosConfig = {
      timeout: apiTimeout,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const interceptor = httpClientWithToken.interceptors.request.use(config => {
      const { method, url, headers, data } = config
      dispatch({
        type: types.multipleBookMarks.read.request,
        payload: {
          method,
          url,
          headers,
          body: data,
        },
      })
      httpClientWithToken.interceptors.request.eject(interceptor)
      return config
    })
    return httpClientWithToken
      .get(url, axiosConfig)
      .then(res => {
        const successAction = buildSuccessActionFromRes(
          res,
          types.multipleBookMarks.read.success
        )
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = failActionCreators.axios(
          error,
          types.multipleBookMarks.read.failure
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}

/**
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @param {string} bookmarkSlug - the article slug of the bookmark. Ex: xxx-xxx-xxxxxxx-xx
 * @param {string} bookmarkHost - the hostname of the bookmark. Ex: 'https://www.xxxx.xx'
 * @return {Function} - function will be executed in Redux Thunk middleware
 */
export function getSingleBookmark(jwt, userID, bookmarkSlug, bookmarkHost) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @param {Object} option
   * @param {Object} option.httpClientWithToken
   * @return {Promise} resolve with success action or reject with fail action
   */
  return function(dispatch, getState, { httpClientWithToken }) {
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(
      apiOrigin,
      `/v1/users/${userID}/bookmarks/${bookmarkSlug}`,
      { host: bookmarkHost },
      false
    )
    const axiosConfig = {
      timeout: apiTimeout,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const interceptor = httpClientWithToken.interceptors.request.use(config => {
      const { method, url, headers, data } = config
      dispatch({
        type: types.singleBookmark.read.request,
        payload: {
          method,
          url,
          headers,
          body: data,
        },
      })
      httpClientWithToken.interceptors.request.eject(interceptor)
      return config
    })
    return httpClientWithToken
      .get(url, axiosConfig)
      .then(res => {
        const successAction = buildSuccessActionFromRes(
          res,
          types.singleBookmark.read.success
        )
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = failActionCreators.axios(
          error,
          types.singleBookmark.read.failure
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}

/**
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @param {number} bookmarkID - id of bookmark
 * @return {Function} - function will be executed in Redux Thunk middleware
 */
export function deleteSingleBookmark(jwt, userID, bookmarkID) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @param {Object} option
   * @param {Object} option.httpClientWithToken
   * @return {Promise} resolve with success action or reject with fail action
   */
  return function(dispatch, getState, { httpClientWithToken }) {
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(
      apiOrigin,
      `/v1/users/${userID}/bookmarks/${bookmarkID}`,
      {},
      false
    )
    const axiosConfig = {
      timeout: apiTimeout,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const interceptor = httpClientWithToken.interceptors.request.use(config => {
      const { method, url, headers, data } = config
      dispatch({
        type: types.singleBookmark.delete.request,
        payload: {
          method,
          url,
          headers,
          body: data,
        },
      })
      httpClientWithToken.interceptors.request.eject(interceptor)
      return config
    })
    return httpClientWithToken
      .delete(url, axiosConfig)
      .then(res => {
        const successAction = buildSuccessActionFromRes(
          res,
          types.singleBookmark.delete.success
        )
        successAction.payload.bookmarkID = bookmarkID
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = failActionCreators.axios(
          error,
          types.singleBookmark.delete.failure
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}
