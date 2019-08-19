import { author as authorSchema } from '../schemas/article-schema'
import { camelizeKeys } from 'humps'
import {
  MAX_RESULTS_PER_FETCH,
  MAX_RESULTS_PER_SEARCH,
  NUMBER_OF_FIRST_RESPONSE_PAGE,
  RETURN_DELAY_TIME,
} from '../constants/authors-list'
import { formURL } from '../utils/url'
import { schema, normalize } from 'normalizr'
import actionTypes from '../constants/action-types'
import fetch from 'isomorphic-fetch'
import httpConsts from '../constants/http-protocol'
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

const { statusCode } = httpConsts

export function requestSearchAuthors(keywords = '') {
  return {
    type:
      keywords === ''
        ? actionTypes.LIST_ALL_AUTHORS_REQUEST
        : actionTypes.SEARCH_AUTHORS_REQUEST,
    keywords: keywords,
  }
}

export function failToSearchAuthors(keywords = '', error) {
  return {
    type:
      keywords === ''
        ? actionTypes.LIST_ALL_AUTHORS_FAILURE
        : actionTypes.SEARCH_AUTHORS_FAILURE,
    error,
    failedAt: Date.now(),
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
  return (dispatch, getState) => {
    // eslint-disable-line no-unused-vars
    const searchParas = {
      keywords,
      filters: 'articlesCount>0',
      hitsPerPage:
        keywords === '' ? MAX_RESULTS_PER_FETCH : MAX_RESULTS_PER_SEARCH,
      page: targetPage,
    }
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, '/v1/search/authors', searchParas, false)
    dispatch(requestSearchAuthors(keywords))
    // Call our API server to fetch the data
    return fetch(url)
      .then(response => {
        if (response.status >= 400) {
          const err = new Error(
            'Bad response from API, response:' + JSON.stringify(response)
          )
          err.status = statusCode.internalServerError
          throw err
        }
        return response.json()
      })
      .then(
        responseObject => {
          const authors = _.get(responseObject, 'hits', {})
          const receiveSearchAuthorsAction = {
            type:
              keywords === ''
                ? actionTypes.LIST_ALL_AUTHORS_SUCCESS
                : actionTypes.SEARCH_AUTHORS_SUCCESS,
            keywords,
            normalizedData: Array.isArray(authors)
              ? normalize(camelizeKeys(authors), new schema.Array(authorSchema))
              : normalize(camelizeKeys(authors), authorSchema),
            currentPage: _.get(
              responseObject,
              'page',
              NUMBER_OF_FIRST_RESPONSE_PAGE - 1
            ),
            totalPages: _.get(responseObject, 'nbPages', 0),
            receivedAt: Date.now(),
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
              return dispatch(receiveSearchAuthorsAction)
            })
          }
          return dispatch(receiveSearchAuthorsAction)
        },
        error => {
          return dispatch(failToSearchAuthors(keywords, error))
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
    return (dispatch, getState) => {
      const currentState = getState()
      const authorsList = _.get(currentState, 'authorsList', {})
      const { isFetching, currentPage, hasMore } = authorsList
      if (currentPage < NUMBER_OF_FIRST_RESPONSE_PAGE) {
        // Situation 1/3: If no data exists => fetch first page immediately
        return dispatch(
          searchAuthors({
            keywords: '',
            targetPage: NUMBER_OF_FIRST_RESPONSE_PAGE,
            returnDelay: 0,
          })
        )
      }
      // If current page >= NUMBER_OF_FIRST_RESPONSE_PAGE:
      if (!isFetching && hasMore) {
        // Situation 2/3: If already have data AND not fetching AND has more => delay && next page
        return dispatch(
          searchAuthors({
            keywords: '',
            targetPage: currentPage + 1,
            returnDelay: RETURN_DELAY_TIME,
          })
        )
      }
      return Promise.resolve('Promise Resolved') // Situation 3/3: If already have all data (not has more) OR is fetching => do nothing
    }
  }
  /* --------- searching authors --------- */
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
    return Promise.resolve('Promise Resolved') // Situation 2/2:If keywords are the same => do nothing
  }
}
