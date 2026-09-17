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
  authRevision: 0,
}

/**
 *  @param {Object} state - redux state
 *  @param {boolean} state.isRequesting - requst is in progress
 *  @param {boolean} state.isAuthed - indicates if authorization succeeds
 *  @param {number} state.authRevision - invalidates group requests across auth changes
 *  @param {Object} state.lastAction - last redux action for debugging
 *  @param {string} state.lastAction.actionType
 *  @param {Object} state.lastAction.actionPayload
 *  @param {Object} state.userInfo - user information
 *  @param {number} state.userInfo.user_id - id of user
 *  @param {string} state.userInfo.jwt - access_token granted for the user
 *  @param {string} state.userInfo.email - email of the user
 *  @param {'A'|'B'|'none'} state.userInfo.jai_ab_test_group - JAI experiment group
 *  @param {Object} action - redux action
 *  @param {string} action.type
 *  @param {Object} action.payload - response of API server
 *  @param {string} action.payload.url - request endpoint
 *  @param {Object} action.payload.options - request options
 *  @param {string} action.payload.message - error message
 */
export default function auth(state = initState, action) {
  switch (action.type) {
    case actionTypes.jaiAbTestGroup.read.success: {
      if (
        _.get(action, 'meta.authRevision') !== (state.authRevision || 0) ||
        state.isRequesting
      ) {
        return state
      }
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          jai_ab_test_group: action.payload.data.jai_ab_test_group,
        },
      }
    }
    case actionTypes.AUTH_CLEAR: {
      // return empty state
      return { ...initState, authRevision: (state.authRevision || 0) + 1 }
    }
    case actionTypes.REQUEST_AUTH: {
      return {
        authRevision: (state.authRevision || 0) + 1,
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
        authRevision: (state.authRevision || 0) + 1,
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
        authRevision: (state.authRevision || 0) + 1,
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
