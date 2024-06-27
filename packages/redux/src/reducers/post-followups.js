import types from '../constants/action-types'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const defaultLimit = 10

const initState = {
  isFetching: false,
  postFollowups: [],
  offset: 0,
  total: 0,
  limit: defaultLimit,
  error: null,
}

export default function postFollowups(state = initState, action) {
  switch (action.type) {
    case types.postFollowups.read.request: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case types.postFollowups.read.success: {
      const postFollowups = _.get(action, 'payload.data', [])
      const meta = _.get(action, 'payload.meta')
      const { offset, total, limit } = meta
      return {
        ...state,
        isFetching: false,
        postFollowups,
        offset,
        total,
        limit,
        error: null,
      }
    }
    case types.postFollowups.read.failure: {
      return {
        ...state,
        isFetching: false,
        error: _.get(action, 'payload.error'),
      }
    }
    default:
      return state
  }
}
