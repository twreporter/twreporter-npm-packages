import { author as authorSchema } from '../schemas/article-schema'
import { camelizeKeys } from 'humps'
import { formURL } from '../utils/url'
import { normalize } from 'normalizr'
import actionTypes from '../constants/action-types'
import fetch from 'isomorphic-fetch'
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
    keywords: authorId,
  }
}

export function failToFetchAuthorDetails(error) {
  return {
    type: actionTypes.FETCH_AUTHOR_DETAILS_FAILURE,
    error,
  }
}

export function receiveFetchAuthorDetails(normalizedData) {
  return {
    type: actionTypes.FETCH_AUTHOR_DETAILS_SUCCESS,
    normalizedData,
  }
}

export function fetchAuthorDetails(authorId) {
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
    return fetch(url)
      .then(res => {
        if (res.status >= 400) {
          throw new Error('Bad response from API.')
        }
        return res.json()
      })
      .then(response => {
        const { hits } = response
        if (!Array.isArray(hits) || hits.length < 1) {
          throw new Error(
            `There should be at least one record matched the given id. But returned ${hits.length}.`
          )
        }
        const author = _.assign({}, hits[0])
        delete author._highlightResult
        if (author) {
          const normalizedData = normalize(camelizeKeys(author), authorSchema)
          return dispatch(receiveFetchAuthorDetails(normalizedData))
        } else {
          throw new Error(
            'Got response data but it has no valid authorDetails.'
          )
        }
      })
      .catch(error => {
        dispatch(failToFetchAuthorDetails(error))
      })
  }
}
