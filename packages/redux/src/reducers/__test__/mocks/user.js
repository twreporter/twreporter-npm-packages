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
              weight: 1,
            },
          ],
          registration_date: '2023-06-02T11:19:32Z',
          activated: '2023-06-02T11:19:32Z',
          read_preference: [READ_PREFERENCE.art],
          maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
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
        weight: 1,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
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
        weight: 1,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
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
        weight: 1,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
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
        weight: 1,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
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
    userID: -1,
    email: '',
    firstName: '',
    lastName: '',
    roles: [],
    registrationDate: '',
    activated: false,
    readPreference: [],
    maillist: [],
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
        weight: 1,
      },
    ],
    registrationDate: '2023-06-02T11:19:32Z',
    activated: '2023-06-02T11:19:32Z',
    readPreference: [READ_PREFERENCE.art],
    maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
  },
}
