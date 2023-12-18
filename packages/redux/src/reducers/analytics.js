import types from '../constants/action-types'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

const initState = {
  error: null,
  isFetching: false,
  isReady: false,
  userID: -1,
  postID: '',
  readPostsCount: false,
  readPostsSec: 0,
}

export default function analytics(state = initState, action) {
  const { payload } = action
  switch (action.type) {
    case types.analytics.update.request: {
      return _.merge({}, state, {
        isFetching: true,
        isReady: false,
      })
    }

    case types.analytics.update.success: {
      const userID = _.get(payload, 'data.user_id')
      const postID = _.get(payload, 'data.post_id')
      const readPostsCount = _.get(payload, 'data.read_posts_count')
      const readPostsSec = _.get(payload, 'data.read_posts_sec')
      return {
        ...state,
        error: null,
        isFetching: false,
        isReady: true,
        userID,
        postID,
        readPostsCount,
        readPostsSec,
      }
    }

    case types.analytics.update.failure: {
      return {
        ...state,
        error: payload.error,
        isFetching: false,
        isReady: false,
      }
    }

    default:
      return state
  }
}
