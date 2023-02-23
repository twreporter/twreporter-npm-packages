import types from '../constants/action-types'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

const initialState = {
  error: null,
  isFetching: false,
  isReady: false,
}

function latestPage(state = initialState, action = {}) {
  const { payload } = action
  switch (action.type) {
    case types.latest.read.success: {
      const rtn = {
        latestTag: _.get(payload, 'tags', []),
      }

      return _.merge({}, state, rtn, {
        error: null,
        isFetching: false,
        isReady: true,
      })
    }

    case types.latest.read.request: {
      return _.merge({}, state, {
        isFetching: true,
        isReady: false,
      })
    }

    case types.latest.read.failure: {
      return _.merge({}, state, {
        error: payload.error,
        isFetching: false,
        isReady: false,
      })
    }

    default:
      return state
  }
}

export default latestPage
