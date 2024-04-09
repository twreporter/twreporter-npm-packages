import types from '../constants/action-types'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
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
    case types.donationHistory.donationHistory.read.request: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case types.donationHistory.donationHistory.read.success: {
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
    case types.donationHistory.donationHistory.read.failure: {
      return {
        ...state,
        isFetching: false,
        error: _.get(action, 'payload.error'),
      }
    }
    case types.donationHistory.periodicDonationHistory.read.request: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case types.donationHistory.periodicDonationHistory.read.success: {
      const orderNumber = _.get(action, 'payload.data.order_number')
      const periodicDonationHistory = _.get(action, 'payload.data.records', [])
      const meta = _.get(action, 'payload.data.meta')
      const donationHistory = _.map(state.donationHistory, data => {
        if (data.order_number === orderNumber) {
          data.periodic_history = {
            meta,
            records: periodicDonationHistory,
          }
        }
        return data
      })
      return {
        ...state,
        isFetching: false,
        donationHistory,
        error: null,
      }
    }
    case types.donationHistory.periodicDonationHistory.read.failure: {
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
