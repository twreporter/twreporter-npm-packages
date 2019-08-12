import { BadRequestError } from '../utils/error'
import { formURL } from '../utils/url'
import apiConfig from '../constants/api-config'
import apiEndpoints from '../constants/api-endpoints'
import axios from 'axios'
import pagination from '../utils/pagination'
import stateFieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'

// lodash
import get from 'lodash/get'
import isInteger from 'lodash/isInteger'

const _ = {
  get,
  isInteger,
}

const { pageToOffset } = pagination

/* Fetch a full topic, whose assets like relateds, leading_video ...etc are all complete,
 * @param {string} slug - slug of topic
 */
export function fetchAFullTopic(slug) {
  return (dispatch, getState) => {
    const state = getState()
    const topic = _.get(
      state,
      [stateFieldNames.entities, stateFieldNames.topicsInEntities, slug],
      {}
    )
    if (_.get(topic, 'full', false)) {
      dispatch({
        type: types.CHANGE_SELECTED_TOPIC,
        payload: topic,
      })
      return Promise.resolve()
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v1/${apiEndpoints.topics}/${slug}`
    const params = {
      full: 'true',
    }

    // Start to get topics
    dispatch({
      type: types.START_TO_GET_A_FULL_TOPIC,
      payload: {
        slug,
      },
    })

    return axios
      .get(formURL(apiOrigin, path, params), {
        timeout: apiConfig.timeout,
      })
      .then(response => {
        return dispatch({
          type: types.GET_A_FULL_TOPIC,
          payload: _.get(response, 'data.record', {}),
        })
      })
      .catch(error => {
        // Error to get topics
        return dispatch({
          type: types.ERROR_TO_GET_A_FULL_TOPIC,
          payload: {
            error,
            slug,
          },
        })
      })
  }
}

function _fetchTopics(dispatch, origin, path, params, successActionType) {
  // Start to get topics
  const url = formURL(origin, path, params)
  dispatch({
    type: types.START_TO_GET_TOPICS,
    url,
  })

  return axios
    .get(url, {
      timeout: apiConfig.timeout,
    })
    .then(response => {
      const meta = _.get(response, 'data.meta', {})
      const { total, offset, limit } = meta
      return dispatch({
        type: successActionType,
        payload: {
          items: _.get(response, 'data.records', []),
          total,
          limit,
          offset,
        },
      })
    })
    .catch(e => {
      // Error to get topics
      return dispatch({
        type: types.ERROR_TO_GET_TOPICS,
        payload: {
          error: e,
        },
      })
    })
}

/* Fetch topics(only containing meta properties),
 * and it will load more if (total > items you have currently).
 * @param {number} limit - the number of posts you want to get in one request
 */
export function fetchTopics(page = 1, nPerPage = 5) {
  return (dispatch, getState) => {
    /* If nPerPage number is invalid, return a Promise.reject(err) */
    if (!_.isInteger(nPerPage) || nPerPage <= 0) {
      const err = new BadRequestError(
        `nPerPage value must be an interger larger than 0, but is ${nPerPage}`
      )
      return Promise.reject(err)
    }
    /* If page number is invalid, , return a Promise.reject(err) */
    if (!_.isInteger(page) || page <= 0) {
      const err = new BadRequestError(
        `page value must be an interger larger than 0, but is ${page}`
      )
      return Promise.reject(err)
    }

    /* construct request path */
    const { limit, offset } = pageToOffset({ page, nPerPage })
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v1/${apiEndpoints.topics}`
    const params = {
      limit,
      offset,
    }

    return _fetchTopics(dispatch, apiOrigin, path, params, types.GET_TOPICS)
  }
}

/**
 * fetchTopicsOnIndexPage
 * This function will fetch the 2 to 5 latest topics.
 * It's specifically made for index page
 */
export function fetchTopicsOnIndexPage() {
  return (dispatch, getState) => {
    const state = getState()
    const topics = _.get(
      state,
      `${stateFieldNames.indexPage}.${stateFieldNames.sections.topicsSection}`,
      []
    )
    if (Array.isArray(topics) && topics.length > 0) {
      return Promise.resolve()
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v1/${apiEndpoints.topics}`
    const params = {
      offset: 1,
      limit: 4,
    }
    return _fetchTopics(
      dispatch,
      apiOrigin,
      path,
      params,
      types.GET_TOPICS_FOR_INDEX_PAGE
    )
  }
}
