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
import axios from 'axios'
import errorActionCreators from './error-action-creators'
import stateFieldNames from '../constants/redux-state-field-names'
// lodash
import get from 'lodash/get'
import omit from 'lodash/omit'

const _ = {
  get,
  omit,
}

export function requestAuthorCollection(authorId) {
  return {
    type: actionTypes.FETCH_AUTHOR_COLLECTION_REQUEST,
    payload: {
      authorId,
    },
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
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
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
    return axios
      .get(url)
      .then(response => {
        const responseItems = _.get(response, 'data.hits', {})
        const receiveAuthorCollectionAction = {
          type: actionTypes.FETCH_AUTHOR_COLLECTION_SUCCESS,
          payload: {
            authorId,
            normalizedData: normalize(
              camelizeKeys(responseItems),
              new schema.Array(articleSchema)
            ),
            currentPage: _.get(
              response,
              'data.page',
              NUMBER_OF_FIRST_RESPONSE_PAGE - 1
            ),
            totalPages: _.get(response, 'data.nbPages', 0),
            totalResults: _.get(response, 'data.nbHits', 0),
            receivedAt: Date.now(),
          },
        }
        // delay for displaying loading spinner
        if (returnDelay > 0) {
          return new Promise(function(resolve) {
            setTimeout(function() {
              dispatch(receiveAuthorCollectionAction)
              resolve(receiveAuthorCollectionAction)
            }, returnDelay)
          })
        }
        dispatch(receiveAuthorCollectionAction)
        return receiveAuthorCollectionAction
      })
      .catch(error => {
        const failAction = errorActionCreators.axios(
          error,
          actionTypes.FETCH_AUTHOR_COLLECTION_FAILURE
        )
        failAction.payload.authorId = authorId
        failAction.payload.failedAt = Date.now()
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}

export function fetchAuthorCollectionIfNeeded(authorId) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
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

    const action = {
      type: actionTypes.dataAlreadyExists,
      payload: {
        function: fetchAuthorCollectionIfNeeded.name,
        arguments: {
          authorId,
        },
        message: 'Author collection data already exists',
      },
    }
    dispatch(action)
    return Promise.resolve(action)
  }
}
