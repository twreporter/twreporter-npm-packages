import { formURL } from '../utils/url'
import apiConfig from '../constants/api-config'
import apiEndpoints from '../constants/api-endpoints'
import axios from 'axios'
import errorActionCreators from '../actions/error-action-creators'
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
 * @return {Function} returned funciton will get executed by Redux Thunk middleware
 */
export function fetchAFullTopic(slug) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    const state = getState()
    const topic = _.get(
      state,
      [stateFieldNames.entities, stateFieldNames.topicsInEntities, slug],
      {}
    )
    if (_.get(topic, 'full', false)) {
      const successAction = {
        type: types.CHANGE_SELECTED_TOPIC,
        payload: {
          topic,
        },
      }
      dispatch(successAction)
      return Promise.resolve(successAction)
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
        const successAction = {
          type: types.GET_A_FULL_TOPIC,
          payload: {
            topic: _.get(response, 'data.record', {}),
          },
        }
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = errorActionCreators.axios(
          error,
          types.ERROR_TO_GET_A_FULL_TOPIC
        )
        failAction.payload.slug = slug
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}

/**
 *  @param {Function} dispatch - Redux store dispatch function
 *  @param {string} origin - URL origin
 *  @param {string} path - URL path
 *  @param {object} params - URL params
 *  @param {string} successActionType
 *  @return {Promise} resolve with success action or reject with fail action
 */
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
      const successAction = {
        type: successActionType,
        payload: {
          items: _.get(response, 'data.records', []),
          total,
          limit,
          offset,
        },
      }
      dispatch(successAction)
      return successAction
    })
    .catch(error => {
      const failAction = errorActionCreators.axios(
        error,
        types.ERROR_TO_GET_TOPICS
      )
      dispatch(failAction)
      return Promise.reject(failAction)
    })
}

/* Fetch topics(only containing meta properties),
 * and it will load more if (total > items you have currently).
 * @param {number} limit - the number of posts you want to get in one request
 * @return {Function} returned funciton will get executed by Redux Thunk middleware
 */
export function fetchTopics(page = 1, nPerPage = 5) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    /* If nPerPage number is invalid, return a Promise.reject(err) */
    if (!_.isInteger(nPerPage) || nPerPage <= 0) {
      const failAction = errorActionCreators.preRequestValidation(
        {
          nPerPage: `value must be an interger larger than 0, but is ${nPerPage}`,
        },
        types.ERROR_TO_GET_TOPICS
      )
      dispatch(failAction)
      return Promise.reject(failAction)
    }
    /* If page number is invalid, , return a Promise.reject(err) */
    if (!_.isInteger(page) || page <= 0) {
      const failAction = errorActionCreators.preRequestValidation(
        {
          page: `value must be an interger larger than 0, but is ${page}`,
        },
        types.ERROR_TO_GET_TOPICS
      )
      dispatch(failAction)
      return Promise.reject(failAction)
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
 * @return {Function} returned funciton will get executed by Redux Thunk middleware
 */
export function fetchTopicsOnIndexPage() {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    const state = getState()
    const topics = _.get(
      state,
      `${stateFieldNames.indexPage}.${stateFieldNames.sections.topicsSection}`,
      []
    )
    if (Array.isArray(topics) && topics.length > 0) {
      const action = {
        type: types.dataAlreadyExists,
        payload: {
          function: fetchTopicsOnIndexPage.name,
          message: 'Topics already exist in redux state.',
        },
      }
      dispatch(action)
      return Promise.resolve(action)
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
