import { author as authorSchema } from '../schemas/article-schema'
import { camelizeKeys } from 'humps'
import {
  MAX_RESULTS_PER_FETCH,
  NUMBER_OF_FIRST_RESPONSE_PAGE,
  RETURN_DELAY_TIME,
} from '../constants/authors-list'
import { formURL } from '../utils/url'
import { schema, normalize } from 'normalizr'
import actionTypes from '../constants/action-types'
import axios from 'axios'
import errorActionCreators from './error-action-creators'
import stateFieldNames from '../constants/redux-state-field-names'
// lodash
import assign from 'lodash/assign'
import get from 'lodash/get'
import map from 'lodash/map'
import omit from 'lodash/omit'

const _ = {
  assign,
  get,
  map,
  omit,
}

export function requestSearchAuthors(keywords = '') {
  return {
    type:
      keywords === ''
        ? actionTypes.LIST_ALL_AUTHORS_REQUEST
        : actionTypes.SEARCH_AUTHORS_REQUEST,
    payload: {
      keywords: keywords,
    },
  }
}

/**
 * NormalizedData
 * @typedef {Object} NormalizedData
 * @property {Object} entities
 * @property {string[]} result
 */

/**
 * ReceiveSearchAuthorsAction
 *
 * @typedef {Object} ReceiveSearchAuthorsAction
 * @property {string} keywords
 * @property {NormalizedData} normalizedData
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {number} receivedAt
 */

export function searchAuthors({ keywords, targetPage, returnDelay }) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    // eslint-disable-line no-unused-vars
    const searchParas = {
      keywords,
      limit: MAX_RESULTS_PER_FETCH,
      offset: targetPage * MAX_RESULTS_PER_FETCH,
    }
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, '/v2/authors', searchParas, false)
    dispatch(requestSearchAuthors(keywords))
    // Call our API server to fetch the data
    return axios.get(url).then(
      ({ data }) => {
        const authors = _.get(data, 'data.records', {})
        const offset = _.get(data, 'data.meta.offset', 0)
        const limit = _.get(data, 'data.meta.limit', 24)
        const total = _.get(data, 'data.meta.total', 0)
        const receiveSearchAuthorsAction = {
          type:
            keywords === ''
              ? actionTypes.LIST_ALL_AUTHORS_SUCCESS
              : actionTypes.SEARCH_AUTHORS_SUCCESS,
          payload: {
            keywords,
            normalizedData: Array.isArray(authors)
              ? normalize(camelizeKeys(authors), new schema.Array(authorSchema))
              : normalize(camelizeKeys(authors), authorSchema),
            currentPage: Math.floor(offset / limit),
            totalPages: Math.ceil(total / limit),
            receivedAt: Date.now(),
          },
        }
        // delay for displaying loading spinner
        function delayDispatch() {
          return new Promise((resolve, reject) => {
            // eslint-disable-line no-unused-vars
            setTimeout(() => {
              resolve()
            }, returnDelay)
          })
        }
        if (returnDelay > 0) {
          return delayDispatch().then(() => {
            dispatch(receiveSearchAuthorsAction)
            return receiveSearchAuthorsAction
          })
        }
        dispatch(receiveSearchAuthorsAction)
        return receiveSearchAuthorsAction
      },
      error => {
        const type =
          keywords === ''
            ? actionTypes.LIST_ALL_AUTHORS_FAILURE
            : actionTypes.SEARCH_AUTHORS_FAILURE

        const failAction = errorActionCreators.axios(error, type)
        failAction.payload.failedAt = Date.now()
        dispatch(failAction)
        return Promise.reject(failAction)
      }
    )
  }
}

/*
  Algolia set hitsPerPage limit up to 1000 items per search.
  So if number of authors grows over 1000,
  it will need to check hasMore  as case lsat all authors.
*/

export function searchAuthorsIfNeeded(currentKeywords = '') {
  /* --------- list all authors --------- */
  if (currentKeywords === '') {
    /**
     * @param {Function} dispatch - Redux store dispatch function
     * @param {Function} getState - Redux store getState function
     * @return {Promise} resolve with success action or reject with fail action
     */
    return (dispatch, getState) => {
      const currentState = getState()
      const authorsList = _.get(currentState, 'authorsList', {})
      const { isFetching, currentPage, hasMore } = authorsList
      if (currentPage < NUMBER_OF_FIRST_RESPONSE_PAGE) {
        // If no data exists => fetch first page immediately
        return dispatch(
          searchAuthors({
            keywords: '',
            targetPage: NUMBER_OF_FIRST_RESPONSE_PAGE,
            returnDelay: 0,
          })
        )
      }

      if (!hasMore) {
        const action = {
          type: actionTypes.noMoreItemsToFetch,
          payload: {
            function: searchAuthorsIfNeeded.name,
            arguments: {
              currentKeywords,
            },
            message: 'There is no more authors to search by current keywords.',
          },
        }
        dispatch(action)
        return Promise.resolve(action)
      }

      if (isFetching) {
        const action = {
          type: actionTypes.lastActionIsStillProcessing,
          payload: {
            function: searchAuthorsIfNeeded.name,
            arguments: {
              currentKeywords,
            },
            message: 'Request to search authors is still in progress.',
          },
        }
        dispatch(action)
        return Promise.resolve(action)
      }

      // If already have data AND not fetching AND has more => delay && next page
      return dispatch(
        searchAuthors({
          keywords: '',
          targetPage: currentPage + 1,
          returnDelay: RETURN_DELAY_TIME,
        })
      )
    }
  }
  /* --------- searching authors --------- */
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    const currentState = getState()
    const authorsList = _.get(currentState, 'searchedAuthorsList', {})
    const previousKeywords = _.get(authorsList, 'keywords')
    if (currentKeywords !== previousKeywords) {
      // Situation 1/2:If keywords are new => search
      return dispatch(
        searchAuthors({
          keywords: currentKeywords,
          targetPage: NUMBER_OF_FIRST_RESPONSE_PAGE,
          returnDelay: 0,
        })
      )
    }
    const action = {
      type: actionTypes.dataAlreadyExists,
      payload: {
        function: searchAuthorsIfNeeded.name,
        arguments: {
          currentKeywords,
        },
        message: 'Authors related to keywords already exists.',
      },
    }
    dispatch(action)
    return Promise.resolve(action) // Situation 2/2:If keywords are the same => do nothing
  }
}
