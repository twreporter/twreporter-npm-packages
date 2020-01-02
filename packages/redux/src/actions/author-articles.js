import { article as articleSchema } from '../schemas/article-schema'
import { camelizeKeys } from 'humps'
import {
  MAX_ARTICLES_PER_FETCH,
  NUMBER_OF_FIRST_RESPONSE_PAGE,
  RETURN_DELAY_TIME,
} from '../constants/author-page'
import { formURL } from '../utils/url'
import { schema, normalize } from 'normalizr'
import actionTypes from '../constants/action-types'
import fetch from 'isomorphic-fetch'
import httpConsts from '../constants/http-protocol'
import stateFieldNames from '../constants/redux-state-field-names'
// lodash
import get from 'lodash/get'
import omit from 'lodash/omit'

const _ = {
  get,
  omit,
}

const { statusCode } = httpConsts

export function requestAuthorCollection(authorId) {
  return {
    type: actionTypes.FETCH_AUTHOR_COLLECTION_REQUEST,
    authorId,
  }
}

export function failToReceiveAuthorCollection(authorId, error) {
  return {
    type: actionTypes.FETCH_AUTHOR_COLLECTION_FAILURE,
    authorId,
    error,
    failedAt: Date.now(),
  }
}

/**
 * NormalizedData
 * @typedef {Object} NormalizedData
 * @property {Object} entities - flatten entity objects
 * @property {string[]} result - an array of top entity ids
 */

/**
 * ReceiveAuthorCollectionAction
 *
 * @typedef {Object} ReceiveAuthorCollectionAction
 * @property {string} type - CONSTANTS.FETCH_AUTHOR_COLLECTION_SUCCESS
 * @property {string} authorId
 * @property {NormalizedData} normalizedData
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {number} totalResults
 * @property {number} receivedAt
 */

export function fetchAuthorCollection({ targetPage, authorId, returnDelay }) {
  return (dispatch, getState) => {
    // eslint-disable-line no-unused-vars
    const searchParas = {
      keywords: authorId,
      hitsPerPage: MAX_ARTICLES_PER_FETCH,
      page: targetPage,
    }
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, `/v1/search/posts`, searchParas, false)
    dispatch(requestAuthorCollection(authorId))
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
      .then(responseObject => {
        const responseItems = _.get(responseObject, 'hits', {}) // responseObject.hit
        const receiveAuthorCollectionAction = {
          type: actionTypes.FETCH_AUTHOR_COLLECTION_SUCCESS,
          authorId,
          normalizedData: normalize(
            camelizeKeys(responseItems),
            new schema.Array(articleSchema)
          ),
          currentPage: _.get(
            responseObject,
            'page',
            NUMBER_OF_FIRST_RESPONSE_PAGE - 1
          ),
          totalPages: _.get(responseObject, 'nbPages', 0),
          totalResults: _.get(responseObject, 'nbHits', 0),
          receivedAt: Date.now(),
        }
        // delay for displaying loading spinner
        if (returnDelay > 0) {
          return new Promise(function(resolve) {
            setTimeout(function() {
              resolve(dispatch(receiveAuthorCollectionAction))
            }, returnDelay)
          })
        }
        return dispatch(receiveAuthorCollectionAction)
      })
      .catch(error => dispatch(failToReceiveAuthorCollection(authorId, error)))
  }
}

export function fetchAuthorCollectionIfNeeded(authorId) {
  return (dispatch, getState) => {
    const currentState = getState()
    const articlesDataOfAnAuthor = _.get(
      currentState,
      ['articlesByAuthor', authorId],
      null
    )
    // If state.articlesByAuthor[authorId] does not exist:
    if (articlesDataOfAnAuthor === null) {
      return dispatch(
        fetchAuthorCollection({
          authorId,
          targetPage: NUMBER_OF_FIRST_RESPONSE_PAGE,
          returnDelay: 0,
        })
      )
    }
    //  If state.articlesByAuthor[authorId] exists:
    const { currentPage, isFetching, hasMore } = articlesDataOfAnAuthor
    if (!isFetching && hasMore) {
      return dispatch(
        fetchAuthorCollection({
          authorId,
          targetPage: currentPage + 1,
          returnDelay: RETURN_DELAY_TIME,
        })
      )
    }
  }
}
