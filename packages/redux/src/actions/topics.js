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
 * @return {import('../typedef').Thunk} async action creator
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
    const path = `/v2/${apiEndpoints.topics}/${slug}`
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
            topic: _.get(response, 'data.data', {}),
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
        types.ERROR_TO_GET_TOPICS
      )
      dispatch(failAction)
      return Promise.reject(failAction)
    })
}

/* Fetch topics(only containing meta properties),
 * and it will load more if (total > items you have currently).
 * @param {number} limit - the number of posts you want to get in one request
 * @return {import('../typedef').Thunk} async action creator
 */
export function fetchTopics(page = 1, nPerPage = 5) {
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
    const path = `/v2/${apiEndpoints.topics}`
    const params = {
      limit,
      offset,
    }

    return _fetchTopics(dispatch, apiOrigin, path, params, types.GET_TOPICS)
  }
}

/**
 *  This function fetch the latest topic,
 *  and three related posts, sorted by `published_date` in descending order,
 *  of that topic.
 *
 *  @return {import('../typedef').Thunk} async action creator
 */
export function fetchFeatureTopic() {
  return (dispatch, getState) => {
    const state = getState()
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
          timeout: apiConfig.timeout,
        })
        .then(response => {
          const topic = _.get(response, 'data.data.records.0', {})
          return topic
        })
        // fetch feature topic's latest three related posts
        .then(topic => {
          const allRelatedIds = _.get(topic, 'relateds', [])
          const lastThreeRelatedIds = Array.isArray(allRelatedIds)
            ? allRelatedIds.slice(-3)
            : []

          if (lastThreeRelatedIds.length > 0) {
            const url = formURL(apiOrigin, `/v2/${apiEndpoints.posts}`, {
              id: lastThreeRelatedIds,
            })
            return Promise.all([
              topic,
              axios.get(url, {
                timeout: apiConfig.timeout,
              }),
            ])
          }

          // return empty response
          return [
            topic,
            {
              data: {
                records: [],
              },
            },
          ]
        })
        // dispatch success action
        .then(results => {
          const topic = results[0]
          const lastThreeRelatedPosts = _.get(
            results,
            '1.data.data.records',
            []
          )

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
