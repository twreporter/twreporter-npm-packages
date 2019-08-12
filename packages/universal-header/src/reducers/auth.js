import actionTypes from '../constants/action-types'
import get from 'lodash/get'
import jwtUtils from '../utils/jwt'

const _ = {
  get,
}

/**
 *  @param {Object} state - redux state
 *  @param {bool} state.isRequesting - requst is in progress
 *  @param {bool} state.isAuthed - indicates if authorization succeeds
 *  @param {Object} state.userInfo - user information
 *  @param {number} state.userInfo.user_id - id of user
 *  @param {string} state.userInfo.jwt - access_token granted for the user
 *  @param {string} state.userInfo.email - email of the user
 *  @param {Object} action - redux action
 *  @param {string} action.type
 *  @param {string} action.url - request endpoint
 *  @param {Object} action.options - request options
 *  @param {Object} action.payload - response of API server
 *  @param {string} action.message - error message
 */
function auth(state = {}, action) {
  switch (action.type) {
    case actionTypes.AUTH_CLEAR: {
      // return empty state
      return {
        actionType: action.type,
        isAuthed: false,
        isRequesting: false,
      }
    }
    case actionTypes.REQUEST_AUTH: {
      return {
        actionType: action.type,
        isAuthed: false,
        isRequesting: true,
        debugDetails: action.payload,
      }
    }
    case actionTypes.AUTH_FAILURE: {
      return {
        actionType: action.type,
        isAuthed: false,
        isRequesting: false,
        debugDetails: action.payload,
      }
    }
    case actionTypes.AUTH_SUCCESS: {
      const jwt = _.get(action, 'payload.data.jwt', '')
      const userInfo = jwtUtils.decodePayload(jwt)

      return {
        actionType: action.type,
        isAuthed: true,
        isRequesting: false,
        userInfo,
        accessToken: jwt,
        debugDetails: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default auth
