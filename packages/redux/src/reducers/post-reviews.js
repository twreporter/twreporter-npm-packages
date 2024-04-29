import types from '../constants/action-types'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const initState = {
  isFetching: false,
  postReviews: [],
  error: null,
}

export default function postReviews(state = initState, action) {
  switch (action.type) {
    case types.postReviews.read.request: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case types.postReviews.read.success: {
      const postReviews = _.get(action, 'payload.data', [])
      return {
        ...state,
        isFetching: false,
        postReviews,
        error: null,
      }
    }
    case types.postReviews.read.failure: {
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
