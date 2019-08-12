import get from 'lodash/get'
import httpConst from '../constants/http-protocol'

const _ = {
  get,
}

/**
 *  actionError type definition
 *  @typedef {Object} actionError
 *  @property {string} type - Action error type
 *  @property {Object} payload - Response data
 */

/**
 *  @param {Object}  err - Error returned from axios
 *  @param {string} actionFailureType
 *  @returns {actionError}
 */
function axiosErrorHandling(err = {}, actionFailureType) {
  if (err.response) {
    const statusCode = err.response.status
    let data = null
    let message = ''
    switch (statusCode) {
      // client side errors
      case statusCode < httpConst.statusCode.internalServerError: {
        data = _.get(err, 'response.data.data')
        message = 'client side error, check data object instead'
        break
      }

      // server side errors
      default: {
        message = _.get(err, 'response.data.message', 'server side error')
      }
    }

    return {
      type: actionFailureType,
      payload: {
        data,
        headers: err.response.headers,
        statusCode: statusCode,
        message,
      },
    }
  } else if (err.request) {
    return {
      type: actionFailureType,
      payload: {
        message: 'request was made but no response was received',
      },
    }
  } else {
    return {
      type: actionFailureType,
      payload: {
        message:
          'error happened in setting up the request that triggered an error',
      },
    }
  }
}

export default {
  axios: axiosErrorHandling,
}
