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
    type: actionTypes.FETCH_AUTHOR_DETAILS_REQUEST,
    payload: {
      keywords: authorId,
    },
  }
}

export function receiveFetchAuthorDetails(normalizedData) {
  return {
    type: actionTypes.FETCH_AUTHOR_DETAILS_SUCCESS,
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
      keywords: authorId,
      filters: 'articlesCount>0',
      hitsPerPage: 1,
      page: 0,
    }
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, '/v1/search/authors', searchParas, false)
    dispatch(requestFetchAuthorDetails(authorId))
    return axios.get(url).then(
      response => {
        const hits = _.get(response, 'data.hits')
        if (!Array.isArray(hits) || hits.length < 1) {
          const failAction = {
            type: actionTypes.FETCH_AUTHOR_DETAILS_FAILURE,
            payload: {
              error: new Error(
                `There should be at least one record matched the given id. But returned ${hits.length}.`
              ),
            },
          }
          dispatch(failAction)
          return Promise.reject(failAction)
        }
        const author = _.assign({}, hits[0])
        delete author._highlightResult
        if (author) {
          const normalizedData = normalize(camelizeKeys(author), authorSchema)
          const successAction = receiveFetchAuthorDetails(normalizedData)
          dispatch(successAction)
          return successAction
        } else {
          const failAction = {
            type: actionTypes.FETCH_AUTHOR_DETAILS_FAILURE,
            payload: {
              error: new Error(
                'Got response data but it has no valid authorDetails.'
              ),
            },
          }
          dispatch(failAction)
          return Promise.reject(failAction)
        }
      },
      error => {
        const failAction = errorActionCreators.axios(
          error,
          actionTypes.FETCH_AUTHOR_DETAILS_FAILURE
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      }
    )
  }
}
