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

/**
 * Fetch a full topic, whose assets like relateds, leading_video ...etc are all complete,
 * @param {string} slug - slug of topic
 * @param {number} [timeout=apiConfig.timeout] - request api timeout
 * @return {import('../typedef').Thunk} async action creator
 */
export function fetchAFullTopic(slug, timeout = apiConfig.timeout) {
  return (dispatch, getState) => {
    const { entities, topicsInEntities } = stateFieldNames
    const state = getState()
    const topicId = _.get(
      state,
      [entities, topicsInEntities, 'slugToId', slug],
      ''
    )
    const topic = _.get(
      state,
      [entities, topicsInEntities, 'byId', topicId],
      null
    )
    if (_.get(topic, 'full', false)) {
      const successAction = {
        type: types.selectedTopic.read.alreadyExists,
        payload: {
          topic,
        },
      }
      dispatch(successAction)
      return Promise.resolve(successAction)
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v2/${apiEndpoints.topics}/${slug}`
    const params = {
      full: 'true',
    }

    // Start to get topics
    dispatch({
      type: types.selectedTopic.read.request,
      payload: {
        slug,
      },
    })

    return axios
      .get(formURL(apiOrigin, path, params), {
        timeout,
      })
      .then(response => {
        const successAction = {
          type: types.selectedTopic.read.success,
          payload: {
            topic: _.get(response, 'data.data', {}),
          },
        }
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = errorActionCreators.axios(
          error,
          types.selectedTopic.read.failure
        )
        failAction.payload['slug'] = slug
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
 *  @param {number} timeout - request api timeout
 *  @return {Promise} resolve with success action or reject with fail action
 */
function _fetchTopics(
  dispatch,
  origin,
  path,
  params,
  successActionType,
  timeout
) {
  // Start to get topics
  const url = formURL(origin, path, params)
  dispatch({
    type: types.topics.read.request,
    url,
  })

  return axios
    .get(url, {
      timeout,
    })
    .then(response => {
      const meta = _.get(response, 'data.data.meta', {})
      const { total, offset, limit } = meta
      const successAction = {
        type: successActionType,
        payload: {
          items: _.get(response, 'data.data.records', []),
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
        types.topics.read.failure
      )
      dispatch(failAction)
      return Promise.reject(failAction)
    })
}

/**
 * Fetch topics(only containing meta properties),
 * and it will load more if (total > items you have currently).
 *
 * @param {number} [page=1]
 * @param {number} [nPerPage=5]
 * @param {number} [timeout=apiConfig.timeout] - request api timeout
 * @return {import('../typedef').Thunk} async action creator
 */
export function fetchTopics(
  page = 1,
  nPerPage = 5,
  timeout = apiConfig.timeout
) {
  return (dispatch, getState) => {
    /* If nPerPage number is invalid, return a Promise.reject(err) */
    if (!_.isInteger(nPerPage) || nPerPage <= 0) {
      const failAction = errorActionCreators.preRequestValidation(
        {
          nPerPage: `value must be an interger larger than 0, but is ${nPerPage}`,
        },
        types.topics.read.failure
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
        types.topics.read.failure
      )
      dispatch(failAction)
      return Promise.reject(failAction)
    }

    /* construct request path */
    const { limit, offset } = pageToOffset({ page, nPerPage })
    const state = getState()
    if (
      _.get(state, [stateFieldNames.topicList, 'items', page, 'length'], 0) > 0
    ) {
      const action = {
        type: types.topics.read.alreadyExists,
        payload: {
          page,
          nPerPage,
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v2/${apiEndpoints.topics}`
    const params = {
      limit,
      offset,
    }

    return _fetchTopics(
      dispatch,
      apiOrigin,
      path,
      params,
      types.topics.read.success,
      timeout
    )
  }
}

/**
 *  This function fetch the latest topic, and three related posts of that topic.
 *
 *  @param {number} [timeout=apiConfig.timeout] - request api timeout
 *  @return {import('../typedef').Thunk} async action creator
 */
export function fetchFeatureTopic(timeout = apiConfig.timeout) {
  return (dispatch, getState) => {
    const state = getState()

    if (_.get(state, [stateFieldNames.featureTopic, 'id'])) {
      const action = {
        type: types.featureTopic.read.alreadyExists,
      }
      dispatch(action)
      return Promise.resolve(action)
    }

    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, `/v2/${apiEndpoints.topics}`, {
      limit: 1,
      offset: 0,
    })

    // dispatch request action
    dispatch({
      type: types.featureTopic.read.request,
    })

    return (
      axios
        // fetch the latest topic as feature topic
        .get(url, {
          timeout,
        })
        .then(response => {
          const topic = _.get(response, 'data.data.records.0', {})
          return topic
        })
        // fetch feature topic's latest three related posts
        .then(topic => {
          const allRelatedIds = _.get(topic, 'relateds', [])
          const threeRelatedIds = Array.isArray(allRelatedIds)
            ? allRelatedIds.slice(0, 3)
            : []

          if (threeRelatedIds.length > 0) {
            const url = formURL(apiOrigin, `/v2/${apiEndpoints.posts}`, {
              id: threeRelatedIds,
            })
            return Promise.all([
              topic,
              axios
                .get(url, {
                  timeout,
                })
                .then(res => {
                  const relatedPosts = _.get(res, 'data.data.records', [])

                  // Ensure the order of returned related posts is the same with topic landing page's order,
                  // since API endpoint /v2/posts will sort the posts automatically by `published_date` in descending order.
                  return relatedPosts.length < 2
                    ? relatedPosts
                    : threeRelatedIds.map(id =>
                        relatedPosts.find(post => post.id === id)
                      )
                }),
            ])
          }

          // return empty response
          return Promise.all([topic, []])
        })
        // dispatch success action
        .then(results => {
          const topic = results[0]
          const lastThreeRelatedPosts = results[1]

          const action = {
            type: types.featureTopic.read.success,
            payload: {
              topic,
              lastThreeRelatedPosts,
            },
          }
          dispatch(action)
          return Promise.resolve(action)
        })
        // handle axios error response
        .catch(error => {
          const failAction = errorActionCreators.axios(
            error,
            types.featureTopic.read.failure
          )
          dispatch(failAction)
          return Promise.reject(failAction)
        })
    )
  }
}
