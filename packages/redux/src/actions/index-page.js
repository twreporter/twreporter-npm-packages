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
    type: types.indexPage.read.request,
    url,
  })

  return (
    axios
      .get(url, {
        timeout: apiConfig.timeout,
      })
      // Get content successfully
      .then(response => {
        const items = _.get(response, 'data.data', {})

        const successAction = {
          type: types.indexPage.read.success,
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
          types.indexPage.read.failure
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
    /** @type {import('../typedef').ReduxState} */
    const state = getState()
    const indexPage = _.get(state, stateFieldNames.indexPage, {})
    const isContentReady = _.get(indexPage, 'isReady', false)

    if (isContentReady) {
      const action = {
        type: types.indexPage.read.alreadyExists,
      }
      dispatch(action)
      return Promise.resolve(action)
    }

    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    return _fetch(dispatch, apiOrigin, `/v2/${apiEndpoints.indexPage}`, {})
  }
}
