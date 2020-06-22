/* global expect, test, describe */

import { post, posts } from '../posts'
import types from '../../constants/action-types'

const post1 = {
  id: 'post-id-1',
  slug: 'post-slug-1',
}

const post2 = {
  id: 'post-id-2',
  slug: 'post-slug-2',
}

const post3 = {
  id: 'post-id-3',
  slug: 'post-slug-3',
}

const post4 = {
  id: 'post-id-4',
  slug: 'post-slug-4',
}

describe('post reducer', () => {
  test('should return the initial state', () => {
    expect(post({}, {})).toEqual({})
  })

  test('should handle START_TO_GET_A_FULL_POST', () => {
    expect(
      post(
        {},
        {
          type: types.START_TO_GET_A_FULL_POST,
          payload: {
            slug: 'mock-slug',
          },
        }
      )
    ).toEqual({
      isFetching: true,
      slug: 'mock-slug',
      error: null,
    })
  })

  test('should handle GET_A_FULL_POST', () => {
    expect(
      post(
        {},
        {
          type: types.GET_A_FULL_POST,
          payload: {
            post: post1,
          },
        }
      )
    ).toEqual({
      slug: post1.slug,
      error: null,
      isFetching: false,
    })
  })

  test('should handle CHANGE_SELECTED_POST', () => {
    expect(
      post(
        {},
        {
          type: types.CHANGE_SELECTED_POST,
          payload: {
            post: post1,
          },
        }
      )
    ).toEqual({
      slug: post1.slug,
      error: null,
      isFetching: false,
    })
  })

  test('should handle ERROR_TO_GET_A_FULL_POST', () => {
    const err = new Error('error occurs')
    expect(
      post(
        {},
        {
          type: types.ERROR_TO_GET_A_FULL_POST,
          payload: {
            slug: 'mock-slug',
            error: err,
          },
        }
      )
    ).toEqual({
      slug: 'mock-slug',
      error: err,
    })
  })
})

describe('posts reducer', () => {
  test('should return the initial state', () => {
    expect(posts({}, {})).toEqual({})
  })

  describe('should handle `types.postsByListId.read.success`', () => {
    const mockListId = 'list-id-1'
    const initialState = {
      [mockListId]: {
        isFetching: true,
        error: null,
      },
    }
    const mockAction = {
      type: types.postsByListId.read.success,
      payload: {},
    }

    test('when payload.listId === undefined', () => {
      expect(
        posts(
          initialState,
          Object.assign({}, mockAction, {
            listId: undefined,
          })
        )
      ).toEqual(initialState)
    })

    test("when payload.listId === ''", () => {
      expect(
        posts(
          initialState,
          Object.assign({}, mockAction, {
            listId: '',
          })
        )
      ).toEqual(initialState)
    })

    test('when payload.listId === null', () => {
      expect(
        posts(
          initialState,
          Object.assign({}, mockAction, {
            listId: null,
          })
        )
      ).toEqual(initialState)
    })

    test('when payload.items is empty array', () => {
      const page = 2
      const total = 2
      const state = Object.assign({}, initialState, {
        [mockListId]: {
          items: [post1.id, post2.id],
          pages: {
            1: [0, 1],
          },
        },
      })
      const action = Object.assign({}, mockAction, {
        payload: {
          listId: mockListId,
          items: [],
          page,
          total,
        },
      })
      expect(posts(state, action)).toEqual({
        [mockListId]: {
          items: [post1.id, post2.id],
          error: null,
          isFetching: false,
          total: 2,
          pages: {
            1: [0, 1],
          },
        },
      })
    })

    test('when payload.page is < 1', () => {
      const page = 0
      const total = 2
      const state = Object.assign({}, initialState, {
        [mockListId]: {
          items: [post1.id, post2.id],
          pages: {
            1: [0, 1],
          },
        },
      })
      const action = Object.assign({}, mockAction, {
        payload: {
          listId: mockListId,
          items: [post3, post4],
          page,
          total,
        },
      })
      expect(posts(state, action)).toEqual({
        [mockListId]: {
          items: [post1.id, post2.id],
          error: null,
          isFetching: false,
          total,
          pages: {
            1: [0, 1],
          },
        },
      })
    })

    test('when payload.items is populated array', () => {
      const page = 2
      const total = 4
      const state = Object.assign({}, initialState, {
        [mockListId]: {
          items: [post1.id, post2.id],
          pages: {
            1: [0, 1],
          },
        },
      })
      const action = Object.assign({}, mockAction, {
        payload: {
          listId: mockListId,
          items: [post3, post4],
          page,
          total,
        },
      })
      expect(posts(state, action)).toEqual({
        [mockListId]: {
          items: [post1.id, post2.id, post3.id, post4.id],
          error: null,
          isFetching: false,
          total,
          pages: {
            1: [0, 1],
            [page]: [2, 3],
          },
        },
      })
    })
  })

  describe('should handle `types.postsByListId.read.request`', () => {
    const mockListId = 'list-id-1'
    const initialState = {
      [mockListId]: {
        isFetching: false,
        error: new Error('mock error'),
      },
    }
    const mockAction = {
      type: types.postsByListId.read.request,
      payload: {},
    }
    test('when payload.listId === undefined', () => {
      expect(posts(initialState, mockAction)).toEqual(initialState)
    })

    test("when payload.listId === ''", () => {
      const action = Object.assign({}, mockAction, {
        payload: {
          listId: '',
        },
      })
      expect(posts(initialState, action)).toEqual(initialState)
    })

    test('when payload.listId === null', () => {
      const action = Object.assign({}, mockAction, {
        payload: {
          listId: null,
        },
      })
      expect(posts(initialState, action)).toEqual(initialState)
    })

    test('when payload is well populated', () => {
      const action = Object.assign({}, mockAction, {
        payload: {
          listId: mockListId,
        },
      })

      expect(posts(initialState, action)).toEqual({
        [mockListId]: {
          isFetching: true,
          error: null,
        },
      })
    })
  })

  describe('should handle `types.postsByListId.read.failure`', () => {
    const mockError = new Error('error occurs')
    const mockListId = 'list-id-1'
    const initialState = {
      [mockListId]: {
        isFetching: true,
        error: null,
      },
    }
    const mockAction = {
      type: types.postsByListId.read.failure,
      payload: {},
    }
    test('when payload.listId === undefined', () => {
      expect(posts(initialState, mockAction)).toEqual(initialState)
    })

    test("when payload.listId === ''", () => {
      const action = Object.assign({}, mockAction, {
        payload: {
          listId: '',
        },
      })
      expect(posts(initialState, action)).toEqual(initialState)
    })

    test('when payload.listId === null', () => {
      const action = Object.assign({}, mockAction, {
        payload: {
          listId: null,
        },
      })
      expect(posts(initialState, action)).toEqual(initialState)
    })

    test('when payload is well populated', () => {
      const action = Object.assign({}, mockAction, {
        payload: {
          listId: mockListId,
          error: mockError,
        },
      })

      expect(posts(initialState, action)).toEqual({
        [mockListId]: {
          isFetching: false,
          error: mockError,
        },
      })
    })
  })
})
