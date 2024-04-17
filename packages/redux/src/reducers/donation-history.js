import types from '../constants/action-types'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import cloneDeep from 'lodash/cloneDeep'

const _ = {
  get,
  map,
  cloneDeep,
}

const defaultLimit = 10

const initState = {
  isFetching: false,
  donationHistory: [],
  error: null,
  offset: 0,
  total: 0,
  limit: defaultLimit,
  periodicDonationHistory: {
    isFetching: false,
    records: {},
    error: null,
  },
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
      state.periodicDonationHistory.isFetching = true
      return state
    }
    case types.donationHistory.periodicDonationHistory.read.success: {
      const statePeriodicHistoryData = _.cloneDeep(
        state.periodicDonationHistory.records
      )
      const orderNumber = _.get(action, 'payload.data.order_number')
      const periodicDonationHistory = _.get(action, 'payload.data.records', [])
      const meta = _.get(action, 'payload.data.meta')
      const { offset, total, limit } = meta
      if (statePeriodicHistoryData[orderNumber]) {
        statePeriodicHistoryData[orderNumber] = {
          offset,
          total,
          limit,
          records: [
            ...statePeriodicHistoryData[orderNumber],
            ...periodicDonationHistory,
          ],
        }
      } else {
        statePeriodicHistoryData[orderNumber] = {
          offset,
          total,
          limit,
          records: [...periodicDonationHistory],
        }
      }
      return {
        ...state,
        periodicDonationHistory: {
          isFetching: false,
          records: statePeriodicHistoryData,
          error: null,
        },
      }
    }
    case types.donationHistory.periodicDonationHistory.read.failure: {
      state.periodicDonationHistory.isFetching = false
      state.periodicDonationHistory.error = _.get(action, 'payload.error')
      return state
    }
    default:
      return state
  }
}
