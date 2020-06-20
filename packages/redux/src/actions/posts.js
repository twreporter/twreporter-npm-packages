import { formURL } from '../utils/url'
import errorActionCreators from './error-action-creators'
import apiConfig from '../constants/api-config'
import apiEndpoints from '../constants/api-endpoints'
import axios from 'axios'
import stateFieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'

// lodash
import filter from 'lodash/filter'
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  filter,
  get,
  merge,
}

/* Fetch a full post, whose assets like relateds, leading_video ...etc are all complete,
 * @param {string} slug - slug of post
 * @return {Function} returned funciton will get executed by Redux Thunk middleware
 */
export function fetchAFullPost(slug) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    const state = getState()
    const post = _.get(
      state,
      `${stateFieldNames.entities}.${stateFieldNames.postsInEntities}.${slug}`,
      {}
    )

    // post is already fully fetched
    if (_.get(post, 'full', false)) {
      // current selected post is not the post just been fetched,
      // change the selected post
      if (slug !== _.get(state, `${stateFieldNames.selectedPost}.slug`)) {
        const successAction = {
          type: types.CHANGE_SELECTED_POST,
          payload: {
            post,
          },
        }
        dispatch(successAction)
        return Promise.resolve(successAction)
      }
      // current selected post is the post just been fetched,
      // do nothing
      const action = {
        type: types.dataAlreadyExists,
        payload: {
          function: fetchAFullPost.name,
          arguments: {
            slug,
          },
          message: 'Post already exists in redux state.',
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v2/${apiEndpoints.posts}/${slug}`
    const url = formURL(apiOrigin, path, { full: 'true' })
    // Start to get topics
    dispatch({
      type: types.START_TO_GET_A_FULL_POST,
      payload: {
        slug,
      },
    })

    return axios
      .get(url, {
        timeout: apiConfig.timeout,
      })
      .then(response => {
        const successAction = {
          type: types.GET_A_FULL_POST,
          payload: {
            post: _.get(response, 'data.data', {}),
          },
        }
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = errorActionCreators.axios(
          error,
          types.ERROR_TO_GET_A_FULL_POST
        )
        failAction.payload.slug = slug
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}

/**
 * @param {Function} dispatch - dispatch of redux
 * @param {string} url - URL to request
 * @param {string} successActionType - action type
 * @param {string} failureActionType - action type
 * @param {Object} defaultPayload
 * @return {Promise} resolve with success action or reject with fail action
 **/
function _fetchPosts(
  dispatch,
  url,
  successActionType,
  failureActionType = types.ERROR_TO_GET_POSTS,
  defaultPayload = {}
) {
  return axios
    .get(url, {
      timeout: apiConfig.timeout,
    })
    .then(response => {
      const successAction = {
        type: successActionType,
        payload: _.merge(
          {
            items: _.get(response, 'data.records', []),
            total: _.get(response, 'data.meta.total', 0),
          },
          defaultPayload
        ),
      }
      dispatch(successAction)
      return successAction
    })
    .catch(error => {
      const failAction = errorActionCreators.axios(error, failureActionType)
      failAction.payload = _.merge(failAction.payload, defaultPayload)
      dispatch(failAction)
      return Promise.reject(failAction)
    })
}

/**
 *  Given ObjectID of a target post, this functions will load the related posts
 *  of that target post.
 *
 *  @param {import('../typedef').ObjectID} entityId - ObjectID of a entity, which could be a post or topic
 *  @param {number} limit - specify how many posts to load
 *  @return {Function} returned funciton will get executed by Redux Thunk middleware
 */
export function fetchRelatedPostsOfAnEntity(entityId, limit = 6) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    /** @type {import('../typedef').ReduxState} */
    const state = getState()
    const allPostIds = _.get(
      state,
      [stateFieldNames.entities, stateFieldNames.postsInEntities, 'allIds'],
      []
    )

    /**  @type {import('../typedef').RelatedPostsOfAnEntity} */
    const relatedsOfAnEntity = _.get(
      state,
      ['relatedPostsOf', 'byId', entityId],
      {}
    )
    const more = _.get(relatedsOfAnEntity, 'more', [])

    if (
      _.get(more, 'length', 0) === 0 ||
      typeof limit !== 'number' ||
      limit <= 0
    ) {
      // no more posts to load
      const action = {
        type: types.relatedPosts.read.noMore,
        payload: {
          targetEntityId: entityId,
          limit,
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }

    const targetRelatedPostsIds = more.slice(0, limit)

    // filter out those related posts already fetched
    const idsToRequest = _.filter(targetRelatedPostsIds, id => {
      return allPostIds.indexOf(id) === -1
    })

    // dispatch success action if related posts already fetched
    if (_.get(idsToRequest, 'length', 0) === 0) {
      const action = {
        type: types.relatedPosts.read.success,
        payload: {
          targetEntityId: entityId,
          targetRelatedPostsIds,
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }

    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v2/${apiEndpoints.posts}`
    const url = formURL(apiOrigin, path, { id: idsToRequest })

    dispatch({
      type: types.relatedPosts.read.request,
      payload: {
        url,
        targetEntityId: entityId,
      },
    })

    return _fetchPosts(
      dispatch,
      url,
      types.relatedPosts.read.success,
      types.relatedPosts.read.failure,
      { targetEntityId: entityId, targetRelatedPostsIds }
    )
  }
}

/* Fetch a listed posts(only containing meta properties),
 * such as the posts belonging to the same tag/category/topic.
 * @param {string} listID - id of the tag, category or topic
 * @param {string} listType - tags, categories or topics
 * @param {number} limit - the number of posts you want to get in one request
 * @return {Function} returned funciton will get executed by Redux Thunk middleware
 */
export function fetchListedPosts(listID, listType, limit = 10, page = 0) {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    const state = getState()
    const list = _.get(state, [stateFieldNames.lists, listID])

    // if list is already existed and there is nothing more to load
    if (list && _.get(list, 'total', 0) <= _.get(list, 'items.length', 0)) {
      const action = {
        type: types.noMoreItemsToFetch,
      }
      dispatch(action)
      return Promise.resolve(action)
    }

    // items of page are already fetched
    if (page > 0 && Array.isArray(_.get(list, ['pages', page]))) {
      const action = {
        type: types.dataAlreadyExists,
        payload: {
          function: fetchListedPosts.name,
          arguments: {
            listID,
            listType,
            limit,
            page,
          },
          message: 'Posts already exist in redux state.',
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }

    const where = {
      [listType]: {
        in: [listID],
      },
    }

    // if page provided(should bigger than 0),
    // use page to count offset,
    // otherwise, use current length of items
    const offset =
      page > 0 ? (page - 1) * limit : _.get(list, 'items.length', 0)
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v1/${apiEndpoints.posts}`
    const params = {
      where: JSON.stringify(where),
      limit,
      offset,
    }

    const url = formURL(apiOrigin, path, params)
    dispatch({
      type: types.START_TO_GET_POSTS,
      url,
    })
    return _fetchPosts(
      dispatch,
      url,
      types.GET_LISTED_POSTS,
      types.ERROR_TO_GET_LISTED_POSTS,
      { listID, page }
    )
  }
}
