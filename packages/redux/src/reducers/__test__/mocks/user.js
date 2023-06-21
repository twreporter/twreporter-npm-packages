import actionTypes from '../../../constants/action-types'
import { EMAIL_SUBSCRIPTION_KEY } from '@twreporter/core/lib/constants/email-subscription'
import { READ_PREFERENCE } from '@twreporter/core/src/constants/read-preference'

const { user } = actionTypes

const ERROR_MSG = new Error('mock setUser failure')

export const mockActions = {
  [user.update.request]: {
    type: user.update.request,
  },
  [user.update.success]: {
    type: user.update.success,
    payload: {
      data: {
        record: {
          read_preference: [READ_PREFERENCE.culture],
          maillist: [
            EMAIL_SUBSCRIPTION_KEY.featured,
            EMAIL_SUBSCRIPTION_KEY.behindTheScenes,
          ],
        },
      },
    },
  },
  [user.update.failure]: {
    type: user.update.failure,
    payload: {
      error: ERROR_MSG,
    },
  },
}

// TODO: need add other user state after connect to getUser api
export const mockStates = {
  InitialState: {
    error: null,
    isFetching: false,
    isReady: false,
    readPreference: [],
    maillist: [],
  },

  ExpStateReqwithInit: {
    error: null,
    isFetching: true,
    isReady: false,
    readPreference: [],
    maillist: [],
  },

  ExpStateReqwithPre: {
    error: null,
    isFetching: true,
    isReady: false,
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
  },

  ExpStateSucwithInit: {
    error: null,
    isFetching: false,
    isReady: true,
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
  },

  ExpStateSuc: {
    error: null,
    isFetching: false,
    isReady: true,
    readPreference: [READ_PREFERENCE.culture],
    maillist: [
      EMAIL_SUBSCRIPTION_KEY.featured,
      EMAIL_SUBSCRIPTION_KEY.behindTheScenes,
    ],
  },

  ExpStateFailwithInit: {
    error: ERROR_MSG,
    isFetching: false,
    isReady: false,
    readPreference: [],
    maillist: [],
  },

  ExpStateFailwithPre: {
    error: ERROR_MSG,
    isFetching: false,
    isReady: false,
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
  },
}
