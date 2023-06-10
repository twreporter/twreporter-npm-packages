import { formURL } from '../utils/url'
import apiConfig from '../constants/api-config'
import apiEndpoints from '../constants/api-endpoints'
import failActionCreators from './error-action-creators'
import stateFieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'
import axios from 'axios'
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
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @return {Function} - function will be executed in Redux Thunk middleware
 */
// TODO: wait till api ready
export function getUserData(jwt, userID) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  // return function(dispatch, getState) {
  //   const state = getState()
  //   const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
  //   const url = formURL(
  //     apiOrigin,
  //     `/v2/${apiEndpoints.users}/${userID}`,
  //   )
  //   dispatch({
  //     type: types.user.read.request,
  //     url
  //   })
  //   const axiosConfig = {
  //     timeout: apiTimeout,
  //     headers: {
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   }
  //   return axios
  //     .get(url, axiosConfig)
  //     .then(res => {
  //       const successAction = buildSuccessActionFromRes(
  //         res,
  //         types.user.read.success
  //       )
  //       dispatch(successAction)
  //       return successAction
  //     })
  //     .catch(error => {
  //       const failAction = failActionCreators.axios(
  //         error,
  //         types.user.read.failure
  //       )
  //       dispatch(failAction)
  //       return Promise.reject(failAction)
  //     })
  // }
}

/**
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @param {string[]} readPreference - subscribed topics
 * @param {string[]} maillist - subscribed mail list
 * @return {Function} - function will be executed in Redux Thunk middleware
 */
export function setUserData(jwt, userID, readPreference, maillist) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return function(dispatch, getState) {
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, `/v2/${apiEndpoints.users}/${userID}`)
    dispatch({
      type: types.user.update.request,
      url,
    })
    const axiosConfig = {
      timeout: apiTimeout,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const body = {
      read_preference: readPreference,
      maillist,
    }
    return axios
      .post(url, body, axiosConfig)
      .then(res => {
        const successAction = buildSuccessActionFromRes(
          res,
          types.user.update.success
        )
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = failActionCreators.axios(
          error,
          types.user.update.failure
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}
