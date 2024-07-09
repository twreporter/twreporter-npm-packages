import axios from 'axios'
// constants
import apiConfig from '../constants/api-config'
import apiEndpoints from '../constants/api-endpoints'
import stateFieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'

import { formURL } from '../utils/url'
import failActionCreators from './error-action-creators'

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
 * @param {Object} axiosResponse
 * @param {string} actionType
 * @returns {SuccessAction}
 */
function buildSuccessActionFromRes(axiosResponse, actionType) {
  return {
    type: actionType,
    payload: {
      data: _.get(axiosResponse, 'data'),
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
 * get post followups
 * @param {string} jwt - access_token granted for the user
 * @param {number} offset - the offset of the request
 * @param {number} limit - max amount of records per fetch
 * @returns {Function} - function will be executed in Redux Thunk middleware
 */
export function getPostFollowups(jwt, offset = 0, limit = 10) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return function(dispatch, getState) {
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, `/v2/${apiEndpoints.postFollowups}`, {
      limit,
      offset,
    })
    dispatch({
      type: types.postFollowups.read.request,
      url,
    })
    const axiosConfig = {
      timeout: apiTimeout,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true,
    }
    return axios
      .get(url, axiosConfig)
      .then(res => {
        const successAction = buildSuccessActionFromRes(
          res,
          types.postFollowups.read.success
        )
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = failActionCreators.axios(
          error,
          types.postFollowups.read.failure
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}
