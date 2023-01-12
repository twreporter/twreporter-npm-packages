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
 * @param {number} timeout - request timeout to api
 * @return {Promise} resolve with success action or reject with fail action
 **/
function _fetch(dispatch, origin, path, params, timeout) {
  const url = formURL(origin, path, params)
  // Start to get content
  dispatch({
    type: types.latest.read.request,
    url,
  })

  return (
    axios
      .get(url, {
        timeout,
      })
      // Get content successfully
      .then(response => {
        const tags = _.get(response, 'data.data.records', [])

        const successAction = {
          type: types.latest.read.success,
          payload: {
            tags,
          },
        }
        // dispatch content for each sections
        dispatch(successAction)
        return successAction
      })
      .catch(error => {
        const failAction = errorActionCreators.axios(
          error,
          types.latest.read.failure
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  )
}

/**
 * fetchLatestTags
 *
 * @param {number} [timeout=apiConfig.timeout] - request api timeout
 * @return {import('../typedef').Thunk} async action creator
 */
export function fetchLatestTags(timeout = apiConfig.timeout) {
  return (dispatch, getState) => {
    /** @type {import('../typedef').ReduxState} */
    const state = getState()
    const latestPage = _.get(state, stateFieldNames.latest, {})
    const isContentReady = _.get(latestPage, 'isReady', false)

    if (isContentReady) {
      const action = {
        type: types.latest.read.alreadyExists,
      }
      dispatch(action)
      return Promise.resolve(action)
    }

    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    return _fetch(
      dispatch,
      apiOrigin,
      `/v2/${apiEndpoints.tags}`,
      { latest_order: 1 },
      timeout
    )
  }
}
