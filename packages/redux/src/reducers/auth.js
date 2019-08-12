import actionTypes from '../constants/action-types'
import jwtUtils from '../utils/jwt'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const initState = {
  accessToken: '',
  actionType: '',
  lastAction: null,
  isAuthed: false,
  isRequesting: false,
  userInfo: null,
}

/**
 *  @param {Object} state - redux state
 *  @param {bool} state.isRequesting - requst is in progress
 *  @param {bool} state.isAuthed - indicates if authorization succeeds
 *  @param {Object} state.lastAction - last redux action for debugging
 *  @param {string} state.lastAction.actionType
 *  @param {Object} state.lastAction.actionPayload
 *  @param {Object} state.userInfo - user information
 *  @param {number} state.userInfo.user_id - id of user
 *  @param {string} state.userInfo.jwt - access_token granted for the user
 *  @param {string} state.userInfo.email - email of the user
 *  @param {Object} action - redux action
 *  @param {string} action.type
 *  @param {Object} action.payload - response of API server
 *  @param {string} action.payload.url - request endpoint
 *  @param {Object} action.payload.options - request options
 *  @param {string} action.payload.message - error message
 */
export default function auth(state = initState, action) {
  switch (action.type) {
    case actionTypes.AUTH_CLEAR: {
      // return empty state
      return initState
    }
    case actionTypes.REQUEST_AUTH: {
      return {
        accessToken: initState.accessToken,
        lastAction: {
          type: action.type,
          payload: action.payload,
        },
        isAuthed: false,
        isRequesting: true,
        userInfo: initState.userInfo,
      }
    }
    case actionTypes.AUTH_FAILURE: {
      return {
        accessToken: initState.accessToken,
        lastAction: {
          type: action.type,
          payload: action.payload,
        },
        isAuthed: false,
        isRequesting: false,
        userInfo: initState.userInfo,
      }
    }
    case actionTypes.AUTH_SUCCESS: {
      const jwt = _.get(action, 'payload.data.jwt', '')
      const userInfo = jwtUtils.decodePayload(jwt)
      return {
        accessToken: jwt,
        lastAction: {
          type: action.type,
          payload: action.payload,
        },
        isAuthed: true,
        isRequesting: false,
        userInfo,
      }
    }
    default: {
      return state
    }
  }
}
