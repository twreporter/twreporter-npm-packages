import actionTypes from '../../../constants/action-types'

const { analytics } = actionTypes

const ERROR_MSG = new Error('mock update failure')

export const mockActions = {
  [analytics.update.request]: {
    type: analytics.update.request,
  },
  [analytics.update.success]: {
    type: analytics.update.success,
    payload: {
      data: {
        user_id: '1',
        post_id: 'post-id',
        read_posts_count: true,
        read_posts_sec: 222,
      },
    },
  },
  [analytics.update.failure]: {
    type: analytics.update.failure,
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
    postID: '',
    readPostsCount: false,
    readPostsSec: 0,
  },

  ExpStateReqwithInit: {
    error: null,
    isFetching: true,
    isReady: false,
    userID: -1,
    postID: '',
    readPostsCount: false,
    readPostsSec: 0,
  },

  ExpStateReqwithPre: {
    error: null,
    isFetching: true,
    isReady: false,
    userID: '1',
    postID: 'post-id',
    readPostsCount: true,
    readPostsSec: 222,
  },

  ExpStateSucwithInit: {
    error: null,
    isFetching: false,
    isReady: true,
    userID: '1',
    postID: 'post-id',
    readPostsCount: true,
    readPostsSec: 222,
  },

  ExpStateSucPreIsInit: {
    error: null,
    isFetching: false,
    isReady: true,
    userID: '1',
    postID: 'post-id',
    readPostsCount: true,
    readPostsSec: 222,
  },

  ExpStateSucPreIsExist: {
    error: null,
    isFetching: false,
    isReady: true,
    userID: '1',
    postID: 'post-id',
    readPostsCount: true,
    readPostsSec: 222,
  },

  ExpStateFailwithInit: {
    error: ERROR_MSG,
    isFetching: false,
    isReady: false,
    userID: -1,
    postID: '',
    readPostsCount: false,
    readPostsSec: 0,
  },

  ExpStateFailwithPre: {
    error: ERROR_MSG,
    isFetching: false,
    isReady: false,
    userID: '1',
    postID: 'post-id',
    readPostsCount: true,
    readPostsSec: 222,
  },
}
