/* global expect, test, describe */

import featureTopic from '../feature-topic'
import types from '../../constants/action-types'

const initialState = {
  isFetching: false,
  error: null,
  id: '',
  lastThreeRelatedPostIds: [],
}

const mockPost1 = {
  id: 'post-id-1',
}

const mockPost2 = {
  id: 'post-id-2',
}

const mockPost3 = {
  id: 'post-id-3',
}

const mockTopic = {
  id: 'topic-id-1',
}

const suites = [
  {
    describe: 'should return input state',
    cases: [
      {
        test: 'when action is null',
        args: {
          state: undefined,
          action: null,
        },
        expected: initialState,
      },
      {
        test: 'when action is {}',
        args: {
          state: initialState,
          action: {},
        },
        expected: initialState,
      },
      {
        test: 'when action is undefined',
        args: {
          state: initialState,
          action: undefined,
        },
        expected: initialState,
      },
    ],
  },
  {
    describe: 'should handle `types.featureTopic.read.request`',
    cases: [
      {
        test: 'when input state is not initialState',
        args: {
          state: {
            isFetching: false,
            error: null,
            id: mockTopic.id,
            lastThreeRelatedPost: [mockPost1, mockPost2, mockPost3],
          },
          action: {
            type: types.featureTopic.read.request,
            action: {},
          },
        },
        expected: {
          isFetching: true,
          error: null,
          id: '',
          lastThreeRelatedPostIds: [],
        },
      },
      {
        test: 'when input state is initialState',
        args: {
          state: initialState,
          action: {
            type: types.featureTopic.read.request,
            action: {},
          },
        },
        expected: Object.assign({}, initialState, {
          isFetching: true,
        }),
      },
    ],
  },
  {
    describe: 'should handle `types.featureTopic.read.failure`',
    cases: [
      {
        test: 'when input state is not initialState',
        args: {
          state: Object.assign({}, initialState, {
            isFetching: true,
          }),
          action: {
            type: types.featureTopic.read.failure,
            payload: {
              error: new Error('mock error'),
            },
          },
        },
        expected: Object.assign({}, initialState, {
          isFetching: false,
          error: new Error('mock error'),
        }),
      },
      {
        test: 'when input state is initialState',
        args: {
          state: initialState,
          action: {
            type: types.featureTopic.read.failure,
            payload: {
              error: new Error('mock error'),
            },
          },
        },
        expected: Object.assign({}, initialState, {
          error: new Error('mock error'),
        }),
      },
    ],
  },
  {
    describe: 'should handle `types.featureTopic.read.success`',
    cases: [
      {
        test: 'action.payload.id is empty',
        args: {
          state: initialState,
          action: {
            type: types.featureTopic.read.success,
            action: {
              id: null,
            },
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload is well populated',
        args: {
          state: initialState,
          action: {
            type: types.featureTopic.read.success,
            payload: {
              topic: mockTopic,
              lastThreeRelatedPosts: [mockPost1, mockPost2, mockPost3],
            },
          },
        },
        expected: Object.assign({}, initialState, {
          id: mockTopic.id,
          lastThreeRelatedPostIds: [mockPost1.id, mockPost2.id, mockPost3.id],
        }),
      },
      {
        test: 'state and action.payload are well populated',
        args: {
          state: Object.assign({}, initialState, {
            isFetching: true,
          }),
          action: {
            type: types.featureTopic.read.success,
            payload: {
              topic: mockTopic,
              lastThreeRelatedPosts: [mockPost1, mockPost2, mockPost3],
            },
          },
        },
        expected: Object.assign({}, initialState, {
          isFetching: false,
          id: mockTopic.id,
          lastThreeRelatedPostIds: [mockPost1.id, mockPost2.id, mockPost3.id],
        }),
      },
    ],
  },
]

suites.forEach(suite => {
  describe(suite.describe, () => {
    const cases = suite.cases
    cases.forEach(c => {
      test(c.test, () => {
        const { state, action } = c.args
        expect(featureTopic(state, action)).toEqual(c.expected)
      })
    })
  })
})
