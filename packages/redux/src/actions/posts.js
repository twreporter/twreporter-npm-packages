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

const { entities, postsInEntities } = stateFieldNames

/* Fetch a full post, whose assets like relateds, leading_video ...etc are all complete,
 * @param {string} slug - slug of post
 * @return {import('../typedef').Thunk} async action creator
 */
export function fetchAFullPost(slug) {
  return (dispatch, getState) => {
    const state = getState()
    const postId = _.get(
      state,
      [entities, postsInEntities, 'slugToId', slug],
      ''
    )
    const post = _.get(state, [entities, postsInEntities, 'byId', postId], null)
    // post is already fully fetched
    if (_.get(post, 'full', false)) {
      // current selected post is not the post just been fetched,
      // change the selected post
      if (slug !== _.get(state, `${stateFieldNames.selectedPost}.slug`)) {
        const successAction = {
          type: types.selectedPost.read.alreadyExists,
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
      type: types.selectedPost.read.request,
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
          type: types.selectedPost.read.success,
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
          types.selectedPost.read.failure
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
  failureActionType,
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
            items: _.get(response, 'data.data.records', []),
            total: _.get(response, 'data.data.meta.total', 0),
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
 *  Given ObjectID of a target entity (post or topic), this functions will load the related posts
 *  of that target entity.
 *
 *  @param {import('../typedef').ObjectID} entityId - ObjectID of a entity, which could be a post or topic
 *  @param {number} limit - specify how many posts to load
 *  @return {import('../typedef').Thunk} async action creator
 */
export function fetchRelatedPostsOfAnEntity(entityId, limit = 6) {
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
      [stateFieldNames.relatedPostsOf, 'byId', entityId],
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
    const url = formURL(apiOrigin, path, {
      id: idsToRequest,
    })

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

const startPage = 1

/* Fetch a listed posts(only containing meta properties),
 * such as the posts belonging to the same tag/category/topic.
 * @param {string} listId - id of tag or category
 * @param {string} listType - tag_id or category_id
 * @param {number} [limit=10] - the number of posts you want to get in one request
 * @param {number} [page=1] - page is used to calculate `offset`, which indicates how many posts we should skip
 * @return {import('../typedef').Thunk} async action creator
 */
function fetchPostsByListId(listId, listType, limit = 10, page = startPage) {
  return (dispatch, getState) => {
    if (typeof listId !== 'string' || !listId) {
      const action = {
        type: types.postsByListId.read.failure,
        payload: {
          listId: '',
          error: new Error(
            'listId should be a string and not empty, but got ' + listId
          ),
        },
      }
      dispatch(action)
      return Promise.reject(action)
    }

    if (typeof page !== 'number' || isNaN(page) || page < startPage) {
      const action = {
        type: types.postsByListId.read.failure,
        payload: {
          listId,
          error: new Error('page should be > 0'),
        },
      }
      dispatch(action)
      return Promise.reject(action)
    }

    const state = getState()
    const list = _.get(state, [stateFieldNames.lists, listId])

    // items of page are already fetched
    if (Array.isArray(_.get(list, ['pages', page]))) {
      const action = {
        type: types.postsByListId.read.alreadyExists,
        payload: {
          listId,
          limit,
          page,
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }

    const offset = (page - 1) * limit
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v2/${apiEndpoints.posts}`
    const params = {
      [listType]: listId,
      limit,
      offset,
    }

    const url = formURL(apiOrigin, path, params)
    dispatch({
      type: types.postsByListId.read.request,
      payload: {
        url,
        listId,
      },
    })
    return _fetchPosts(
      dispatch,
      url,
      types.postsByListId.read.success,
      types.postsByListId.read.failure,
      { listId, page }
    )
  }
}

/**
 * Fetch posts(only containing meta properties) by category list id.
 * @param {string} listId - id of category
 * @param {number} [limit=10] - the number of posts you want to get in one request
 * @param {number} [page=1] - page is used to calculate `offset`, which indicates how many posts we should skip
 * @return {import('../typedef').Thunk} async action creator
 */
export function fetchPostsByCategoryListId(listId, limit = 10, page = 0) {
  return (dispatch, getState) => {
    return fetchPostsByListId(listId, 'category_id', limit, page)(
      dispatch,
      getState
    )
  }
}

/**
 * Fetch posts(only containing meta properties) by tag list id.
 * @param {string} listId - id of tag
 * @param {number} [limit=10] - the number of posts you want to get in one request
 * @param {number} [page=1] - page is used to calculate `offset`, which indicates how many posts we should skip
 * @return {import('../typedef').Thunk} async action creator
 */
export function fetchPostsByTagListId(listId, limit = 10, page = 0) {
  return (dispatch, getState) => {
    return fetchPostsByListId(listId, 'tag_id', limit, page)(dispatch, getState)
  }
}
