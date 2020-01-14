import { formURL } from '../utils/url'
import actionTypes from '../constants/action-types'
import apiConfig from '../constants/api-config'
import axios from 'axios'
import errorActionCreators from './error-action-creators'
import stateFieldNames from '../constants/redux-state-field-names'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const timeout = apiConfig.timeout

/**
 *  Send POST method request with Cookie in the headers
 *  to fetch the access_token.
 *
 *  @param {string} [cookieList] - cookieList contains `id_token` cookie
 *  @return {Function} returned function will get executed by the Redux Thunk middleware
 */
export function getAccessToken(cookieList) {
  /**
   *  @param {Function} dispatch - Redux store dispatch function
   *  @param {Function} getState - Redux store getState function
   *  @return {Promise} resolve with success action and reject with fail action
   */
  return (dispatch, getState) => {
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const url = formURL(apiOrigin, '/v2/auth/token')
    const headers = {}

    if (cookieList) {
      headers.Cookie = cookieList
    }

    const options = {
      timeout,
      headers,
      withCredentials: true,
    }

    const interceptor = axios.interceptors.request.use(config => {
      const { method, url, headers, data, withCredentials, timeout } = config
      dispatch({
        type: actionTypes.REQUEST_AUTH,
        payload: {
          method,
          config: {
            timeout,
            withCredentials,
          },
          url,
          headers,
          body: data,
        },
      })
      axios.interceptors.request.eject(interceptor)
      return config
    })

    return axios
      .post(url, null, options)
      .then(axiosRes => {
        const successAction = {
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            headers: axiosRes.headers,
            statusCode: axiosRes.status,
            data: _.get(axiosRes, 'data.data'),
          },
        }
        dispatch(successAction)
        return successAction
      })
      .catch(err => {
        const failAction = errorActionCreators.axios(
          err,
          actionTypes.AUTH_FAILURE
        )
        dispatch(failAction)
        return Promise.reject(failAction)
      })
  }
}

export default {
  getAccessToken,
}
