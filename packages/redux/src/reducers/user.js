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
}

export default function user(state = initState, action) {
  const { payload } = action
  switch (action.type) {
    case types.user.read.request: {
      return _.merge({}, state, {
        isFetching: true,
        isReady: false,
      })
    }

    case types.user.read.success: {
      const userID = _.get(payload, 'data.data.user_id')
      const email = _.get(payload, 'data.data.email')
      const firstName = _.get(payload, 'data.data.first_name')
      const lastName = _.get(payload, 'data.data.last_name')
      const roles = _.get(payload, 'data.data.roles')
      const registrationDate = _.get(payload, 'data.data.registration_date')
      const activated = _.get(payload, 'data.data.activated')
      const readPreference = _.get(payload, 'data.data.read_preference')
      const maillist = _.get(payload, 'data.data.maillist')
      const agreeDataCollection = _.get(
        payload,
        'data.data.agree_data_collection'
      )
      const readPostsCount = _.get(payload, 'data.data.read_posts_count')
      const readPostsSec = _.get(payload, 'data.data.read_posts_sec')
      return {
        ...state,
        error: null,
        isFetching: false,
        isReady: true,
        userID,
        email,
        firstName,
        lastName,
        roles,
        registrationDate,
        activated,
        readPreference,
        maillist,
        agreeDataCollection,
        readPostsCount,
        readPostsSec,
      }
    }

    case types.user.read.failure: {
      return {
        ...state,
        error: payload.error,
        isFetching: false,
        isReady: false,
      }
    }

    case types.user.update.request: {
      return _.merge({}, state, {
        isFetching: true,
        isReady: false,
      })
    }

    case types.user.update.success: {
      const readPreference = _.get(payload, 'data.record.read_preference', [])
      const maillist = _.get(payload, 'data.record.maillist', [])
      return {
        ...state,
        error: null,
        isFetching: false,
        isReady: true,
        maillist,
        readPreference,
      }
    }

    case types.user.update.failure: {
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
