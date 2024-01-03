import { formURL } from '../utils/url'
import apiConfig from '../constants/api-config'
import apiEndpoints from '../constants/api-endpoints'
import stateFieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'
import fetch from 'node-fetch'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const apiTimeout = apiConfig.timeout

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
 * @property {string} payload.statusCode - Response status code
 */

/**
 * @param {Object} fetchResponse
 * @param {string} actionType
 * @returns {SuccessAction}
 */
function buildSuccessActionFromRes(fetchResponse, actionType) {
  return {
    type: actionType,
    payload: {
      data: _.get(fetchResponse, 'data'),
      statusCode: _.get(fetchResponse, 'status'),
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
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @param {string} postID - id of post
 * @param {object} readPostStatus - read post record
 * @param {boolean} readPostStatus.readPostCount - read post or not
 * @param {number} readPostStatus.readPostSec - read post second
 * @return {Function} - function will be executed in Redux Thunk middleware
 */
export function setUserAnalyticsData(
  jwt,
  userID,
  postID,
  { readPostCount, readPostSec }
) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return function(dispatch, getState) {
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(
      apiOrigin,
      `/v2/${apiEndpoints.users}/${userID}/analytics`
    )
    dispatch({
      type: types.analytics.update.request,
      url,
    })
    const fetchConfig = {
      keepalive: true,
      method: 'POST',
      timeout: apiTimeout,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const body = {
      post_id: postID,
      read_posts_count: readPostCount,
      read_posts_sec: readPostSec,
    }
    return fetch(url, {
      ...fetchConfig,
      body: JSON.stringify(body),
    })
      .then(response =>
        response.json().then(data => ({ status: response.status, body: data }))
      )
      .then(res => {
        const successAction = buildSuccessActionFromRes(
          {
            data: res.body,
            status: res.status,
          },
          types.analytics.update.success
        )
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = {
          type: types.analytics.update.failure,
          payload: {
            error,
          },
        }
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}
