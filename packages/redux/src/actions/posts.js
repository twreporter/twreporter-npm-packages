import { formURL } from '../utils/url'
import errorActionCreators from './error-action-creators'
import apiConfig from '../constants/api-config'
import apiEndpoints from '../constants/api-endpoints'
import axios from 'axios'
import postStyles from '../constants/post-styles'
import stateFieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
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
    const path = `/v1/${apiEndpoints.posts}/${slug}`
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
            post: _.get(response, 'data.record', {}),
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
 * @param {string} origin - URL origin
 * @param {string} path - URL path
 * @param {Object} params - URL query params
 * @param {string} successActionType - action type
 * @param {string} failureActionType - action type
 * @param {Object} defaultPayload
 * @return {Promise} resolve with success action or reject with fail action
 **/
function _fetchPosts(
  dispatch,
  origin,
  path = '',
  params = {},
  successActionType,
  failureActionType = types.ERROR_TO_GET_POSTS,
  defaultPayload = {}
) {
  const url = formURL(origin, path, params)
  dispatch({
    type: types.START_TO_GET_POSTS,
    url,
  })

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
    return _fetchPosts(
      dispatch,
      apiOrigin,
      path,
      params,
      types.GET_LISTED_POSTS,
      types.ERROR_TO_GET_LISTED_POSTS,
      { listID, page }
    )
  }
}

/**
 * Fetch those posts picked by editors
 * @return {Function} returned funciton will get executed by Redux Thunk middleware
 */
export function fetchEditorPickedPosts() {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    const state = getState()
    const posts = _.get(
      state,
      `${stateFieldNames.indexPage}.${stateFieldNames.sections.editorPicksSection}`,
      []
    )

    if (posts.length > 0) {
      const action = {
        type: types.dataAlreadyExists,
        payload: {
          function: fetchEditorPickedPosts.name,
          message: 'Posts already exist in redux state.',
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v1/${apiEndpoints.posts}`
    const params = {
      where: '{"is_featured":true}',
      limit: 6,
    }
    return _fetchPosts(
      dispatch,
      apiOrigin,
      path,
      params,
      types.GET_EDITOR_PICKED_POSTS
    )
  }
}

/**
 * fetchPhotographyPostsOnIndexPage
 * This function will fetch 6 latest posts with photography style and `is_featured: true`,
 * It's specifically made for index page
 * @return {Function} returned funciton will get executed by Redux Thunk middleware
 */
export function fetchPhotographyPostsOnIndexPage() {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    const state = getState()
    const posts = _.get(
      state,
      `${stateFieldNames.indexPage}.${stateFieldNames.sections.photosSection}`,
      []
    )
    if (Array.isArray(posts) && posts.length > 0) {
      const action = {
        type: types.dataAlreadyExists,
        payload: {
          function: fetchPhotographyPostsOnIndexPage.name,
          message: 'Posts already exist in redux state.',
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v1/${apiEndpoints.posts}`
    const params = {
      where: `{"style":"${postStyles.photography}"}`,
      limit: 6,
    }
    return _fetchPosts(
      dispatch,
      apiOrigin,
      path,
      params,
      types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE
    )
  }
}

/**
 * fetchInfographicPostsOnIndexPage
 * This function will fetch 10 latest posts with interactive style,
 * It's specifically made for index page
 * @return {Function} returned funciton will get executed by Redux Thunk middleware
 */
export function fetchInfographicPostsOnIndexPage() {
  /**
   * @param {Function} dispatch - Redux store dispatch function
   * @param {Function} getState - Redux store getState function
   * @return {Promise} resolve with success action or reject with fail action
   */
  return (dispatch, getState) => {
    const state = getState()
    const posts = _.get(
      state,
      `${stateFieldNames.indexPage}.${stateFieldNames.sections.infographicsSection}`,
      []
    )
    if (Array.isArray(posts) && posts.length > 0) {
      const action = {
        type: types.dataAlreadyExists,
        payload: {
          function: fetchInfographicPostsOnIndexPage.name,
          message: 'Posts already exist in redux state.',
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const path = `/v1/${apiEndpoints.posts}`
    const params = {
      where: `{"style":"${postStyles.infographic}"}`,
      limit: 10,
    }

    return _fetchPosts(
      dispatch,
      apiOrigin,
      path,
      params,
      types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE
    )
  }
}
