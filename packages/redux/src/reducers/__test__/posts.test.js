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

  test('should handle GET_LISTED_POSTS', () => {
    expect(
      posts(
        {},
        {
          type: types.GET_LISTED_POSTS,
          payload: {
            items: [post1, post2, post3, post4],
            total: 10,
            listID: 'mock-list-id',
            page: 0,
          },
        }
      )
    ).toEqual({
      'mock-list-id': {
        items: [post1.slug, post2.slug, post3.slug, post4.slug],
        total: 10,
        error: null,
        pages: {},
      },
    })

    // page is provided
    expect(
      posts(
        {},
        {
          type: types.GET_LISTED_POSTS,
          payload: {
            items: [post1, post2, post3, post4],
            total: 10,
            listID: 'mock-list-id',
            page: 2,
          },
        }
      )
    ).toEqual({
      'mock-list-id': {
        items: [post1.slug, post2.slug, post3.slug, post4.slug],
        total: 10,
        error: null,
        pages: {
          2: [0, 3],
        },
      },
    })
  })

  test('should handle ERROR_TO_GET_LISTED_POSTS', () => {
    const err = new Error('error occurs')
    expect(
      posts(
        {
          'mock-list-id': {
            items: [post1],
            total: 5,
            error: null,
          },
        },
        {
          type: types.ERROR_TO_GET_LISTED_POSTS,
          payload: {
            error: err,
            listID: 'mock-list-id',
          },
        }
      )
    ).toEqual({
      'mock-list-id': {
        items: [post1],
        total: 5,
        error: err,
      },
    })
  })
})
