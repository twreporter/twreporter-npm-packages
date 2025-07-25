import actionTypes from '../../../constants/action-types'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import { EMAIL_SUBSCRIPTION_KEY } from '@twreporter/core/lib/constants/email-subscription'
import { READ_PREFERENCE } from '@twreporter/core/src/constants/read-preference'

const { user } = actionTypes

const ERROR_MSG = new Error('mock setUser failure')

export const mockActions = {
  [user.read.request]: {
    type: user.read.request,
  },
  [user.read.success]: {
    type: user.read.success,
    payload: {
      data: {
        data: {
          user_id: '1',
          email: 'abc@email.com',
          first_name: 'first',
          last_name: 'last',
          roles: [
            {
              id: 1,
              name: '探索者',
              name_us: 'explorer',
              key: MEMBER_ROLE.explorer,
            },
          ],
          registration_date: '2023-06-02T11:19:32Z',
          activated: '2023-06-02T11:19:32Z',
          read_preference: [READ_PREFERENCE.art],
          maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
          agree_data_collection: true,
          read_posts_count: 5,
          read_posts_sec: 1234,
          is_periodic_patron: true,
        },
      },
    },
  },
  [user.read.failure]: {
    type: user.read.failure,
    payload: {
      error: ERROR_MSG,
    },
  },
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

export const mockStates = {
  InitialState: {
    error: null,
    isFetching: false,
    isReady: false,
    userID: -1,
    email: '',
    firstName: '',
    lastName: '',
    roles: [],
    registrationDate: '',
    activated: false,
    readPreference: [],
    maillist: [],
    agreeDataCollection: true,
    readPostsCount: 0,
    readPostsSec: 0,
    isPeriodicPatron: false,
  },

  ExpStateReqwithInit: {
    error: null,
    isFetching: true,
    isReady: false,
    userID: -1,
    email: '',
    firstName: '',
    lastName: '',
    roles: [],
    registrationDate: '',
    activated: false,
    readPreference: [],
    maillist: [],
    agreeDataCollection: true,
    readPostsCount: 0,
    readPostsSec: 0,
    isPeriodicPatron: false,
  },

  ExpStateReqwithPre: {
    error: null,
    isFetching: true,
    isReady: false,
    userID: '1',
    email: 'abc@email.com',
    firstName: 'first',
    lastName: 'last',
    roles: [
      {
        id: 1,
        name: '探索者',
        name_us: 'explorer',
        key: MEMBER_ROLE.explorer,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
    agreeDataCollection: true,
    readPostsCount: 5,
    readPostsSec: 1234,
    isPeriodicPatron: true,
  },

  ExpStateSucwithInit: {
    error: null,
    isFetching: false,
    isReady: true,
    userID: '1',
    email: 'abc@email.com',
    firstName: 'first',
    lastName: 'last',
    roles: [
      {
        id: 1,
        name: '探索者',
        name_us: 'explorer',
        key: MEMBER_ROLE.explorer,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
    agreeDataCollection: true,
    readPostsCount: 5,
    readPostsSec: 1234,
    isPeriodicPatron: true,
  },

  ExpStateSucAfterGetUser: {
    error: null,
    isFetching: false,
    isReady: true,
    userID: '1',
    email: 'abc@email.com',
    firstName: 'first',
    lastName: 'last',
    roles: [
      {
        id: 1,
        name: '探索者',
        name_us: 'explorer',
        key: MEMBER_ROLE.explorer,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
    agreeDataCollection: true,
    readPostsCount: 5,
    readPostsSec: 1234,
    isPeriodicPatron: true,
  },

  ExpStateSucPreIsInitAfterSetUser: {
    error: null,
    isFetching: false,
    isReady: true,
    userID: -1,
    email: '',
    firstName: '',
    lastName: '',
    roles: [],
    registrationDate: '',
    activated: false,
    readPreference: [READ_PREFERENCE.culture],
    maillist: [
      EMAIL_SUBSCRIPTION_KEY.featured,
      EMAIL_SUBSCRIPTION_KEY.behindTheScenes,
    ],
    agreeDataCollection: true,
    readPostsCount: 0,
    readPostsSec: 0,
    isPeriodicPatron: false,
  },

  ExpStateSucPreIsExistAfterSetUser: {
    error: null,
    isFetching: false,
    isReady: true,
    userID: '1',
    email: 'abc@email.com',
    firstName: 'first',
    lastName: 'last',
    roles: [
      {
        id: 1,
        name: '探索者',
        name_us: 'explorer',
        key: MEMBER_ROLE.explorer,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
    readPreference: [READ_PREFERENCE.culture],
    maillist: [
      EMAIL_SUBSCRIPTION_KEY.featured,
      EMAIL_SUBSCRIPTION_KEY.behindTheScenes,
    ],
    agreeDataCollection: true,
    readPostsCount: 5,
    readPostsSec: 1234,
    isPeriodicPatron: true,
  },

  ExpStateFailwithInit: {
    error: ERROR_MSG,
    isFetching: false,
    isReady: false,
    userID: -1,
    email: '',
    firstName: '',
    lastName: '',
    roles: [],
    registrationDate: '',
    activated: false,
    readPreference: [],
    maillist: [],
    agreeDataCollection: true,
    readPostsCount: 0,
    readPostsSec: 0,
    isPeriodicPatron: false,
  },

  ExpStateFailwithPre: {
    error: ERROR_MSG,
    isFetching: false,
    isReady: false,
    userID: '1',
    email: 'abc@email.com',
    firstName: 'first',
    lastName: 'last',
    roles: [
      {
        id: 1,
        name: '探索者',
        name_us: 'explorer',
        key: MEMBER_ROLE.explorer,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
    agreeDataCollection: true,
    readPostsCount: 5,
    readPostsSec: 1234,
    isPeriodicPatron: true,
  },
}
