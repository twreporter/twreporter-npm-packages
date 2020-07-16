/* global expect, test, describe */

import relatedPostsOf from '../related-posts-of'
import types from '../../constants/action-types'

const initialState = {
  byId: {},
  allIds: [],
}

const suites = [
  {
    describe: 'should return input state',
    cases: [
      {
        test: 'when action is null',
        args: {
          state: initialState,
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
    describe: 'should handle `types.selectedTopic.read.success`',
    cases: [
      {
        test: 'action.payload is undefined',
        args: {
          state: initialState,
          action: {
            type: types.selectedTopic.read.success,
            payload: undefined,
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload is {}',
        args: {
          state: initialState,
          action: {
            type: types.selectedTopic.read.success,
            payload: {},
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload is null',
        args: {
          state: initialState,
          action: {
            type: types.selectedTopic.read.success,
            payload: null,
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload.topic is null',
        args: {
          state: initialState,
          action: {
            type: types.selectedTopic.read.success,
            payload: {
              topic: null,
            },
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload.topic is {}',
        args: {
          state: initialState,
          action: {
            type: types.selectedTopic.read.success,
            payload: {
              topic: {},
            },
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload.topic is undefined',
        args: {
          state: initialState,
          action: {
            type: types.selectedTopic.read.success,
            payload: {
              topic: undefined,
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
            type: types.selectedTopic.read.success,
            payload: {
              topic: {
                id: 'topic-id-1',
                relateds: ['post-id-1'],
              },
            },
          },
        },
        expected: {
          byId: {
            'topic-id-1': {
              isFetching: false,
              error: null,
              more: ['post-id-1'],
              items: [],
            },
          },
          allIds: ['topic-id-1'],
        },
      },
      {
        test: 'state and action.payload are well populated',
        args: {
          state: {
            byId: {
              'topic-id-1': {
                isFetching: false,
                error: null,
                items: [],
                more: ['post-id-1'],
              },
              'topic-id-2': {
                isFetching: false,
                error: null,
                items: ['post-id-2'],
                more: [],
              },
            },
            allIds: ['topic-id-1', 'topic-id-2'],
          },
          action: {
            type: types.selectedTopic.read.success,
            payload: {
              topic: {
                id: 'topic-id-2',
                relateds: ['post-id-2'],
              },
            },
          },
        },
        expected: {
          byId: {
            'topic-id-1': {
              isFetching: false,
              error: null,
              more: ['post-id-1'],
              items: [],
            },
            'topic-id-2': {
              isFetching: false,
              error: null,
              more: ['post-id-2'],
              items: [],
            },
          },
          allIds: ['topic-id-1', 'topic-id-2'],
        },
      },
    ],
  },
  {
    describe: 'should handle `types.selectedPost.read.success`',
    cases: [
      {
        test: 'action.payload is undefined',
        args: {
          state: initialState,
          action: {
            type: types.selectedPost.read.success,
            payload: undefined,
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload is {}',
        args: {
          state: initialState,
          action: {
            type: types.selectedPost.read.success,
            payload: {},
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload is null',
        args: {
          state: initialState,
          action: {
            type: types.selectedPost.read.success,
            payload: null,
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload.post is null',
        args: {
          state: initialState,
          action: {
            type: types.selectedPost.read.success,
            payload: {
              post: null,
            },
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload.post is {}',
        args: {
          state: initialState,
          action: {
            type: types.selectedPost.read.success,
            payload: {
              post: {},
            },
          },
        },
        expected: initialState,
      },
      {
        test: 'action.payload.post is undefined',
        args: {
          state: initialState,
          action: {
            type: types.selectedPost.read.success,
            payload: {
              post: undefined,
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
            type: types.selectedPost.read.success,
            payload: {
              post: {
                id: 'post-id-1',
                relateds: ['post-id-3'],
                topics: {
                  relateds: ['post-id-4'],
                },
              },
            },
          },
        },
        expected: {
          byId: {
            'post-id-1': {
              isFetching: false,
              error: null,
              more: ['post-id-3', 'post-id-4'],
              items: [],
            },
          },
          allIds: ['post-id-1'],
        },
      },
      {
        test: 'state and action.payload are well populated',
        args: {
          state: {
            byId: {
              'topic-id-1': {
                isFetching: false,
                error: null,
                items: [],
                more: ['post-id-1'],
              },
            },
            allIds: ['topic-id-1'],
          },
          action: {
            type: types.selectedPost.read.success,
            payload: {
              post: {
                id: 'post-id-2',
                relateds: ['post-id-1'],
                topics: {
                  relateds: ['post-id-4'],
                },
              },
            },
          },
        },
        expected: {
          byId: {
            'topic-id-1': {
              isFetching: false,
              error: null,
              more: ['post-id-1'],
              items: [],
            },
            'post-id-2': {
              isFetching: false,
              error: null,
              more: ['post-id-1', 'post-id-4'],
              items: [],
            },
          },
          allIds: ['topic-id-1', 'post-id-2'],
        },
      },
    ],
  },
  {
    describe: 'should handle `types.relatedPosts.read.request`',
    cases: [
      {
        test: 'action.payload.targetEntityId is empty',
        args: {
          state: initialState,
          action: {
            type: types.relatedPosts.read.request,
            payload: {
              targetEntityId: null,
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
            type: types.relatedPosts.read.request,
            payload: {
              targetEntityId: 'post-id-1',
            },
          },
        },
        expected: {
          byId: {
            'post-id-1': {
              isFetching: true,
            },
          },
          allIds: [],
        },
      },
      {
        test: 'state and action.payload are well populated',
        args: {
          state: {
            byId: {
              'topic-id-1': {
                isFetching: false,
                error: null,
                items: [],
                more: ['post-id-1'],
              },
            },
            allIds: ['topic-id-1'],
          },
          action: {
            type: types.relatedPosts.read.request,
            payload: {
              targetEntityId: 'topic-id-1',
            },
          },
        },
        expected: {
          byId: {
            'topic-id-1': {
              isFetching: true,
              error: null,
              more: ['post-id-1'],
              items: [],
            },
          },
          allIds: ['topic-id-1'],
        },
      },
    ],
  },
  {
    describe: 'should handle `types.relatedPosts.read.failure`',
    cases: [
      {
        test: 'action.payload.targetEntityId is empty',
        args: {
          state: initialState,
          action: {
            type: types.relatedPosts.read.failure,
            payload: {
              targetRelatedPostsIds: null,
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
            type: types.relatedPosts.read.failure,
            payload: {
              targetEntityId: 'post-id-1',
              error: 'mock error',
            },
          },
        },
        expected: {
          byId: {
            'post-id-1': {
              isFetching: false,
              error: 'mock error',
            },
          },
          allIds: [],
        },
      },
      {
        test: 'state and action.payload are well populated',
        args: {
          state: {
            byId: {
              'topic-id-1': {
                isFetching: false,
                error: null,
                items: [],
                more: ['post-id-1'],
              },
            },
            allIds: ['topic-id-1'],
          },
          action: {
            type: types.relatedPosts.read.failure,
            payload: {
              targetEntityId: 'topic-id-1',
              error: 'mock error',
            },
          },
        },
        expected: {
          byId: {
            'topic-id-1': {
              isFetching: false,
              error: 'mock error',
              more: ['post-id-1'],
              items: [],
            },
          },
          allIds: ['topic-id-1'],
        },
      },
    ],
  },
  {
    describe: 'should handle `types.relatedPosts.read.success`',
    cases: [
      {
        test: 'action.payload.targetEntityId is empty',
        args: {
          state: initialState,
          action: {
            type: types.relatedPosts.read.success,
            payload: {
              targetRelatedPostsIds: null,
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
            type: types.relatedPosts.read.success,
            payload: {
              targetEntityId: 'post-id-1',
              targetRelatedPostsIds: ['post-id-2', 'post-id-3'],
            },
          },
        },
        expected: {
          byId: {
            'post-id-1': {
              isFetching: false,
              error: null,
              more: [],
              items: ['post-id-2', 'post-id-3'],
            },
          },
          allIds: ['post-id-1'],
        },
      },
      {
        test: 'state and action.payload are well populated',
        args: {
          state: {
            byId: {
              'topic-id-1': {
                isFetching: false,
                error: null,
                items: [],
                more: ['post-id-1'],
              },
            },
            allIds: ['topic-id-1'],
          },
          action: {
            type: types.relatedPosts.read.success,
            payload: {
              targetEntityId: 'topic-id-1',
              targetRelatedPostsIds: ['post-id-1'],
            },
          },
        },
        expected: {
          byId: {
            'topic-id-1': {
              isFetching: false,
              error: null,
              more: [],
              items: ['post-id-1'],
            },
          },
          allIds: ['topic-id-1'],
        },
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
        expect(relatedPostsOf(state, action)).toEqual(c.expected)
      })
    })
  })
})
