import types from '../constants/action-types'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const defaultLimit = 10

const initState = {
  isFetching: false,
  footprints: [],
  error: null,
  offset: 0,
  total: 0,
  limit: defaultLimit,
}

export default function footprints(state = initState, action) {
  switch (action.type) {
    case types.footprints.update.request:
    case types.footprints.read.request: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case types.footprints.read.success: {
      const footprints = _.get(action, 'payload.data.records', [])
      const meta = _.get(action, 'payload.data.meta')
      const { offset, total, limit } = meta

      return {
        ...state,
        isFetching: false,
        footprints,
        error: null,
        offset,
        total,
        limit,
      }
    }
    case types.footprints.update.success: {
      return {
        ...state,
        isFetching: false,
        error: null,
      }
    }
    case types.footprints.update.failure:
    case types.footprints.read.failure: {
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
