import { formURL } from '../utils/url'
import apiConfig from '../constants/api-config'
import apiEndpoints from '../constants/api-endpoints'
import axios from 'axios'
import errorActionCreators from './error-action-creators'
import stateFieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'

// lodash
import get from 'lodash/get'
import values from 'lodash/values'

const _ = {
  get,
  values,
}

/**
 * @param {Function} dispatch - dispatch of redux
 * @param {string} origin - URL origin
 * @param {string} path - URL path
 * @param {Object} params - URL query params
 * @return {Promise} resolve with success action or reject with fail action
 **/
function _fetch(dispatch, origin, path, params) {
  const url = formURL(origin, path, params)
  // Start to get content
  dispatch({
    type: types.START_TO_GET_INDEX_PAGE_CONTENT,
    url,
  })

  return (
    axios
      .get(url, {
        timeout: apiConfig.timeout,
      })
      // Get content successfully
      .then(response => {
        const items = _.get(response, 'data.records', {})

        const successAction = {
          type: types.GET_CONTENT_FOR_INDEX_PAGE,
          payload: {
            items,
          },
        }
        // dispatch content for each sections
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = errorActionCreators.axios(
          error,
          types.ERROR_TO_GET_INDEX_PAGE_CONTENT
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  )
}

/**
 * fetchIndexPageContent
 * This function will fetch the all sections except categories_section
 * on the index page,
 * including latest_section, editor_picks_section, latest_topic_section,
 * infographics_section, reviews_section, and photos_section.
 * @return {import('../typedef').Thunk} async action creator
 */
export function fetchIndexPageContent() {
  return (dispatch, getState) => {
    const state = getState()
    const indexPage = _.get(state, stateFieldNames.indexPage, {})

    // categories_section is not part of the result
    const sections = _.values(stateFieldNames.sections)
    let isContentReady = true

    sections.forEach(section => {
      if (!Object.prototype.hasOwnProperty.call(indexPage, section)) {
        isContentReady = false
      }
    })

    if (isContentReady) {
      const action = {
        type: types.dataAlreadyExists,
        payload: {
          function: fetchIndexPageContent.name,
          message:
            'Posts in other sections except for category section already exist.',
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    return _fetch(dispatch, apiOrigin, `/v1/${apiEndpoints.indexPage}`)
  }
}

/**
 * fetchCategoriesPostsOnIndexPage
 * This function will fetch all the posts of each category, total 6 categories, for categories_section on the index page.
 * @return {import('../typedef').Thunk} async action creator
 */
export function fetchCategoriesPostsOnIndexPage() {
  return (dispatch, getState) => {
    const state = getState()
    const indexPage = _.get(state, stateFieldNames.indexPage, {})
    const categories = _.values(stateFieldNames.categories)
    let isContentReady = true

    categories.forEach(category => {
      if (_.get(indexPage, [category, 'length'], 0) === 0) {
        isContentReady = false
      }
    })

    if (isContentReady) {
      const action = {
        type: types.dataAlreadyExists,
        payload: {
          function: fetchCategoriesPostsOnIndexPage.name,
          message: 'Posts in category section on index page already exist.',
        },
      }
      dispatch(action)
      return Promise.resolve(action)
    }
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    return _fetch(
      dispatch,
      apiOrigin,
      `/v1/${apiEndpoints.indexPageCategories}`
    )
  }
}
