import actionTypes from '../../../constants/action-types'

const { postFollowups } = actionTypes

const ERROR_MSG = new Error('Unexpected error')

const defaultLimit = 10

export const mockActions = {
  [postFollowups.read.request]: {
    type: postFollowups.read.request,
  },
  [postFollowups.read.success]: {
    type: postFollowups.read.success,
    payload: {
      data: {
        data: [
          {
            post_id: '664482780e762c0700163174',
            post_slug: 'test-use-all-items-20240205',
            date: '2024-05-28T16:00:00Z',
            title: '測試用追蹤標題1',
            summary:
              '測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字',
            content: {
              api_data: null,
            },
          },
        ],
        meta: {
          total: 1,
          offset: 0,
          limit: 10,
        },
        status: 'success',
      },
    },
  },
  [postFollowups.read.failure]: {
    type: postFollowups.read.failure,
    payload: {
      error: ERROR_MSG,
    },
  },
}

export const mockStates = {
  InitialState: {
    isFetching: false,
    postFollowups: [],
    offset: 0,
    total: 0,
    limit: defaultLimit,
    error: null,
  },

  ExpStateReq: {
    isFetching: true,
    postFollowups: [],
    offset: 0,
    total: 0,
    limit: defaultLimit,
    error: null,
  },

  ExpStateSuc: {
    isFetching: false,
    postFollowups: [
      {
        post_id: '664482780e762c0700163174',
        post_slug: 'test-use-all-items-20240205',
        date: '2024-05-28T16:00:00Z',
        title: '測試用追蹤標題1',
        summary:
          '測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字測試摘要文字',
        content: {
          api_data: null,
        },
      },
    ],
    offset: 0,
    total: 1,
    limit: 10,
    error: null,
  },

  ExpStateFail: {
    isFetching: false,
    postFollowups: [],
    offset: 0,
    total: 0,
    limit: defaultLimit,
    error: ERROR_MSG,
  },
}
