import { author as authorSchema } from '../schemas/article-schema'
import { camelizeKeys } from 'humps'
import { formURL } from '../utils/url'
import { normalize } from 'normalizr'
import actionTypes from '../constants/action-types'
import axios from 'axios'
import errorActionCreators from './error-action-creators'
import stateFieldNames from '../constants/redux-state-field-names'
// lodash
import assign from 'lodash/assign'
import get from 'lodash/get'

const _ = {
  assign,
  get,
}

export function requestFetchAuthorDetails(authorId) {
  return {
    type: actionTypes.authorDetails.read.request,
    payload: {
      authorId,
    },
  }
}

/**
 * @typedef NormalizedDataOfAuthorDetails
 * @property {string} result
 * @property {Object} entities
 * @property {Object|undefined} entities.authors
 */

/**
 * @typedef SuccessActionOfFetchAuthorDetails
 * @property {string} type - Action type
 * @property {Object} payload - Action payload
 * @property {NormalizedDataOfAuthorDetails} payload.normalizedData
 */

/**
 * @param {NormalizedDataOfAuthorDetails} normalizedData
 * @returns {SuccessActionOfFetchAuthorDetails}
 */
export function receiveFetchAuthorDetails(normalizedData) {
  return {
    type: actionTypes.authorDetails.read.success,
    payload: {
      normalizedData,
    },
  }
}

export function fetchAuthorDetails(authorId) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return function(dispatch, getState) {
    const searchParas = {
      author_id: authorId,
    }
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, `/v2/authors/${authorId}`, searchParas)
    dispatch(requestFetchAuthorDetails(authorId))
    return axios.get(url).then(
      ({ data }) => {
        const author = _.assign({}, _.get(data, 'data'))

        /** type {NormalizedDataOfAuthorDetails} */
        const normalizedData = normalize(camelizeKeys(author), authorSchema)
        /** type {SuccessActionOfFetchAuthorDetails} */
        const successAction = receiveFetchAuthorDetails(normalizedData)
        dispatch(successAction)
        return successAction
      },
      error => {
        const failAction = errorActionCreators.axios(
          error,
          actionTypes.authorDetails.read.failure
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      }
    )
  }
}
