import types from '../constants/action-types'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const defaultLimit = 10

const initState = {
  isFetching: false,
  donationHistory: [],
  error: null,
  offset: 0,
  total: 0,
  limit: defaultLimit,
}

export default function donationHistory(state = initState, action) {
  switch (action.type) {
    case types.donationHistory.read.request: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case types.donationHistory.read.success: {
      const donationHistory = _.get(action, 'payload.data.records', [])
      const meta = _.get(action, 'payload.data.meta')
      const { offset, total, limit } = meta
      return {
        ...state,
        isFetching: false,
        donationHistory,
        error: null,
        offset,
        total,
        limit,
      }
    }
    case types.donationHistory.read.failure: {
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
