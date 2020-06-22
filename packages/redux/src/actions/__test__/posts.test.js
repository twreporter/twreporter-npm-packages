/* global expect, test, describe, afterEach, afterAll, beforeAll */

/*
  Testing functions:
    fetchAFullPost
    fetchPostsByCategoryListId
    fetchPostsByTagListId
    fetchRelatedPostsOfAnEntity
*/

import { expectActionErrorObj } from './expect-utils'
import { formURL } from '../../utils/url'
import * as actions from '../posts'
import configureMockStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import nock from 'nock'
import thunk from 'redux-thunk'
import types from '../../constants/action-types'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

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

const mockApiHost = 'http://localhost:8080'

process.env.NODE_ENV = 'development'

/* Fetch a full post, whose assets like relateds, leading_video ...etc are all complete,
 * @param {string} slug - slug of post
 */
/*
========= Testing fetchAFullPost ==========
*/
describe('Testing fetchAFullPost:', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  describe('Post is already fully fetched', () => {
    test('Change the selected post if selected post slug is not the same as the post slug we want to fetch', () => {
      const mockSlug = 'mock-slug'
      const mockPost = {
        id: 'mock-id',
        slug: 'mock-slug',
        brief: {},
        full: true,
      }
      const store = mockStore({
        entities: {
          posts: {
            'mock-slug': mockPost,
          },
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      return store.dispatch(actions.fetchAFullPost(mockSlug)).then(() => {
        const expected = {
          type: types.CHANGE_SELECTED_POST,
          payload: {
            post: mockPost,
          },
        }
        expect(store.getActions().length).toBe(1)
        expect(store.getActions()[0]).toEqual(expected)
      })
    })
    test('Do nothing if selected post slug is the same as the post slug we want to fetch', () => {
      const mockSlug = 'mock-slug'
      const mockPost = {
        id: 'mock-id',
        slug: 'mock-slug',
        brief: {},
        full: true,
      }
      const store = mockStore({
        entities: {
          posts: {
            'mock-slug': mockPost,
          },
        },
        selected_post: {
          error: null,
          slug: 'mock-slug',
          isFetching: false,
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const expected = {
        type: types.dataAlreadyExists,
        payload: {
          function: actions.fetchAFullPost.name,
          arguments: {
            slug: mockSlug,
          },
          message: expect.any(String),
        },
      }
      return store.dispatch(actions.fetchAFullPost(mockSlug)).then(result => {
        expect(result).toEqual(expected)
        expect(store.getActions().length).toBe(1)
        expect(store.getActions()[0]).toEqual(expected)
      })
    })
  })
  describe('It loads a full post successfully', () => {
    test('Should dispatch types.START_TO_GET_POSTS and types.GET_LISTED_POSTS', () => {
      const mockSlug = 'mock-slug'
      const store = mockStore({
        entities: {
          posts: {
            'mock-slug': {
              id: 'mock-id',
              slug: 'mock-slug',
              style: 'article',
              full: false,
            },
          },
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockApiResponse = {
        status: 'success',
        data: {
          id: 'mock-id',
          slug: 'mock-slug',
          style: 'article',
          full: false,
        },
      }

      nock(mockApiHost)
        .get(`/v2/posts/${mockSlug}?full=true`)
        .reply(200, mockApiResponse)

      return store.dispatch(actions.fetchAFullPost(mockSlug)).then(() => {
        const expected = [
          {
            type: types.START_TO_GET_A_FULL_POST,
            payload: {
              slug: mockSlug,
            },
          },
          {
            type: types.GET_A_FULL_POST,
            payload: {
              post: {
                id: 'mock-id',
                slug: 'mock-slug',
                style: 'article',
                full: false,
              },
            },
          },
        ]
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0]).toEqual(expected[0])
        expect(store.getActions()[1]).toEqual(expected[1])
      })
    })
  })
  describe('If the api returns a failure', () => {
    test('Should dispatch types.START_TO_GET_POSTS and types.ERROR_TO_GET_POSTS', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockSlug = 'mock-slug'
      const mockStatusCode = 404
      const mockApiRes = {
        status: 'fail',
        data: {
          slug: 'Cannot find the post from the slug',
        },
      }
      nock(mockApiHost)
        .get(`/v2/posts/${mockSlug}?full=true`)
        .reply(mockStatusCode, mockApiRes)

      return store
        .dispatch(actions.fetchAFullPost(mockSlug))
        .catch(failAction => {
          const expected = [
            {
              type: types.START_TO_GET_A_FULL_POST,
              payload: {
                slug: mockSlug,
              },
            },
            {
              type: types.ERROR_TO_GET_A_FULL_POST,
              payload: {
                error: expect.any(Error),
                slug: mockSlug,
              },
            },
          ]
          expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && FAILURE
          expect(store.getActions()[0]).toEqual(expected[0])
          expect(store.getActions()[1]).toEqual(failAction)
          expect(store.getActions()[1]).toEqual(expected[1])
          expectActionErrorObj(
            store.getActions()[1].payload.error,
            mockStatusCode,
            mockApiRes
          )
        })
    })
  })
})

function testFetchPostsByListId(actionToFetch, paramKey) {
  const mockListId = 'list-id-1'

  describe('Return Promise.resolve', () => {
    afterAll(() => {
      nock.cleanAll()
    })
    test('when items of that page are already fetched', () => {
      const limit = 10
      const total = limit
      const page = 1
      const store = mockStore({
        lists: {
          [mockListId]: {
            total,
            items: [post1, post2, post3, post4],
            pages: {
              // page 1 already fetched, and items post1, post2, post3 and post4
              [page]: [0, 3],
            },
          },
        },
        [fieldNames.origins]: {
          api: mockApiHost,
        },
      })

      expect.assertions(3)

      return store
        .dispatch(actionToFetch(mockListId, limit, page))
        .then(result => {
          const expected = {
            type: types.postsByListId.read.alreadyExists,
            payload: {
              listId: mockListId,
              limit,
              page,
            },
          }
          expect(store.getActions().length).toBe(1)
          expect(result).toEqual(expected)
          expect(store.getActions()[0]).toEqual(expected)
        })
    })

    test('when fetch posts of certain page successfully', () => {
      const limit = 1
      const offset = 1
      const page = 2
      const total = page
      const store = mockStore({
        // empty lists
        lists: {},
        [fieldNames.origins]: {
          api: mockApiHost,
        },
      })
      const mockQuery = {
        [paramKey]: mockListId,
        limit,
        offset,
      }
      const mockPath = '/v2/posts'
      const mockUrl = formURL(mockApiHost, mockPath, mockQuery)
      const mockApiResponse = {
        records: [post2],
        meta: {
          limit,
          total,
          offset,
        },
      }
      const expectedRequestAction = {
        type: types.postsByListId.read.request,
        url: mockUrl,
      }
      const expectedSuccessAction = {
        type: types.postsByListId.read.success,
        payload: {
          items: [post2],
          total: 2,
          listId: mockListId,
          page,
        },
      }
      nock(mockApiHost)
        .get(mockPath)
        .query(mockQuery)
        .reply(200, mockApiResponse)

      expect.assertions(4)

      return store.dispatch(actionToFetch(mockListId, limit, page)).then(() => {
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0]).toEqual(expectedRequestAction)
        expect(store.getActions()[1].type).toBe(expectedSuccessAction.type)
        expect(store.getActions()[1].payload).toEqual(
          expectedSuccessAction.payload
        )
      })
    })
  })

  describe('Return Promise.reject', () => {
    afterAll(() => {
      nock.cleanAll()
    })

    function _expectFailureDueTopage(store, listId, limit, page) {
      expect.assertions(2)

      return store.dispatch(actionToFetch(listId, limit, page)).catch(() => {
        expect(store.getActions().length).toBe(1)
        expect(store.getActions()[0]).toEqual({
          type: types.postsByListId.read.failure,
          payload: {
            listId,
            error: expect.any(Error),
          },
        })
      })
    }

    test('when page is not a number', () => {
      const page = '1'
      const limit = 10
      const store = mockStore()

      return _expectFailureDueTopage(store, mockListId, limit, page)
    })

    test('when page is < 1', () => {
      const page = 0
      const limit = 10
      const store = mockStore()

      return _expectFailureDueTopage(store, mockListId, limit, page)
    })

    test('when page is NaN', () => {
      const page = NaN
      const limit = 10
      const store = mockStore()

      return _expectFailureDueTopage(store, mockListId, limit, page)
    })

    test('when it fails to fetch posts of certain page', () => {
      const limit = 1
      const page = 1
      const offset = 0
      const store = mockStore({
        // empty lists
        lists: {},
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockPath = '/v2/posts'
      const mockQuery = {
        [paramKey]: mockListId,
        limit,
        offset,
      }
      const mockUrl = formURL('http://localhost:8080', mockPath, mockQuery)
      const mockStatusCode = 500
      const mockApiRes = {
        status: 'error',
        message: 'Unexpected error',
      }
      nock(mockApiHost)
        .get(mockPath)
        .query(mockQuery)
        .reply(mockStatusCode, mockApiRes)
      return store
        .dispatch(actionToFetch(mockListId, limit, page))
        .catch(() => {
          const expected = [
            {
              type: types.postsByListId.read.request,
              url: mockUrl,
            },
            {
              type: types.postsByListId.read.failure,
              payload: {
                error: expect.any(Error),
                listId: mockListId,
                page,
              },
            },
          ]
          expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
          expect(store.getActions()[0]).toEqual(expected[0])
          expect(store.getActions()[1]).toEqual(expected[1])
          expectActionErrorObj(
            store.getActions()[1].payload.error,
            mockStatusCode,
            mockApiRes
          )
        })
    })
  })
}

describe('Test function `fetchPostsByTagListId`', () => {
  testFetchPostsByListId(actions.fetchPostsByTagListId, 'tag_id')
})

describe('Test function `fetchPostsByCategoryListId`', () => {
  testFetchPostsByListId(actions.fetchPostsByCategoryListId, 'category_id')
})

describe('Test function `fetchRelatedPostsOfAnEntity`', () => {
  function _expect(store, entityId, limit, returnValue, expectedActions) {
    expect.assertions(3)

    return store
      .dispatch(actions.fetchRelatedPostsOfAnEntity(entityId, limit))
      .then(result => {
        expect(result).toEqual(returnValue)
        expect(store.getActions().length).toBe(expectedActions.length)
        expect(store.getActions()).toEqual(expectedActions)
      })
  }

  describe('No more related posts to fetch', () => {
    test('due to entityId === null', () => {
      const store = mockStore()

      const returnValue = {
        type: types.relatedPosts.read.noMore,
        payload: {
          targetEntityId: null,
          limit: 6,
        },
      }

      const expectedActions = [returnValue]

      return _expect(store, null, 6, returnValue, expectedActions)
    })

    test("due to entityId === ''", () => {
      const store = mockStore()

      const returnValue = {
        type: types.relatedPosts.read.noMore,
        payload: {
          targetEntityId: '',
          limit: 6,
        },
      }

      const expectedActions = [returnValue]

      return _expect(store, '', 6, returnValue, expectedActions)
    })

    test('due to entityId === undefeind', () => {
      const store = mockStore()

      const returnValue = {
        type: types.relatedPosts.read.noMore,
        payload: {
          targetEntityId: undefined,
          limit: 6,
        },
      }

      const expectedActions = [returnValue]

      return _expect(store, undefined, 6, returnValue, expectedActions)
    })

    test('due to limit <= 0', () => {
      const targetPost = post1
      const relatedPost = post2

      const store = mockStore({
        [fieldNames.relatedPostsOf]: {
          byId: {
            [targetPost.id]: {
              isFetching: false,
              error: null,
              more: [relatedPost.id],
              items: [],
            },
          },
          allIds: [targetPost.id],
        },
      })

      const returnValue = {
        type: types.relatedPosts.read.noMore,
        payload: {
          targetEntityId: targetPost.id,
          limit: 0,
        },
      }

      const expectedActions = [returnValue]

      return _expect(store, targetPost.id, 0, returnValue, expectedActions)
    })
  })

  describe('Dispatch success action', () => {
    beforeAll(() => {
      nock(mockApiHost)
        .get(`/v2/posts?id=${post2.id}`)
        .reply(200, {
          records: [post2],
          meta: {
            total: 1,
          },
        })
    })

    afterAll(() => {
      nock.clearAll()
    })

    test('because of related posts already in entities', () => {
      const targetPost = post1
      const relatedPost = post2

      const store = mockStore({
        [fieldNames.origins]: {
          api: mockApiHost,
        },
        [fieldNames.entities]: {
          [fieldNames.postsInEntities]: {
            byId: {
              [targetPost.id]: targetPost,
              [relatedPost.id]: relatedPost,
            },
            allIds: [targetPost.id, relatedPost.id],
          },
        },
        [fieldNames.relatedPostsOf]: {
          byId: {
            [targetPost.id]: {
              isFetching: false,
              error: null,
              more: [relatedPost.id],
              items: [],
            },
          },
          allIds: [targetPost.id],
        },
      })

      const returnValue = {
        type: types.relatedPosts.read.success,
        payload: {
          targetEntityId: targetPost.id,
          targetRelatedPostsIds: [relatedPost.id],
        },
      }

      const expectedActions = [returnValue]

      return _expect(store, targetPost.id, 6, returnValue, expectedActions)
    })

    test('by requesting api to fetch related posts', () => {
      const targetPost = post1
      const relatedPost = post2

      const store = mockStore({
        [fieldNames.origins]: {
          api: mockApiHost,
        },
        [fieldNames.entities]: {
          [fieldNames.postsInEntities]: {
            [targetPost.id]: targetPost,
          },
        },
        [fieldNames.relatedPostsOf]: {
          byId: {
            [targetPost.id]: {
              isFetching: false,
              error: null,
              more: [relatedPost.id],
              items: [],
            },
          },
          allIds: [targetPost.id],
        },
      })

      const returnValue = {
        type: types.relatedPosts.read.success,
        payload: {
          targetEntityId: targetPost.id,
          targetRelatedPostsIds: [relatedPost.id],
          items: [relatedPost],
          total: 1,
        },
      }

      const expectedActions = [
        {
          type: types.relatedPosts.read.request,
          payload: {
            url: `${mockApiHost}/v2/posts?id=${relatedPost.id}`,
            targetEntityId: targetPost.id,
          },
        },
        returnValue,
      ]

      return _expect(store, targetPost.id, 6, returnValue, expectedActions)
    })
  })

  describe('Dispatch failure action', () => {
    beforeAll(() => {
      nock(mockApiHost)
        .get(`/v2/posts?id=${post3.id}`)
        .reply(500, {
          status: 'error',
          message: 'Unexpected error',
        })
    })

    afterAll(() => {
      nock.clearAll()
    })
    test('return failure action due to requesting api failure', () => {
      const targetPost = post1
      const relatedPost = post3

      const store = mockStore({
        [fieldNames.origins]: {
          api: mockApiHost,
        },
        [fieldNames.entities]: {
          [fieldNames.postsInEntities]: {
            [targetPost.id]: targetPost,
          },
        },
        [fieldNames.relatedPostsOf]: {
          byId: {
            [targetPost.id]: {
              isFetching: false,
              error: null,
              more: [relatedPost.id],
              items: [],
            },
          },
          allIds: [targetPost.id],
        },
      })

      const returnValue = {
        type: types.relatedPosts.read.failure,
        payload: {
          targetEntityId: targetPost.id,
          targetRelatedPostsIds: [relatedPost.id],
          error: expect.any(Error),
        },
      }

      const expectedActions = [
        {
          type: types.relatedPosts.read.request,
          payload: {
            url: `${mockApiHost}/v2/posts?id=${relatedPost.id}`,
            targetEntityId: targetPost.id,
          },
        },
        returnValue,
      ]

      return store
        .dispatch(actions.fetchRelatedPostsOfAnEntity(targetPost.id, 6))
        .catch(result => {
          expect(result).toEqual(returnValue)
          expect(store.getActions().length).toBe(expectedActions.length)
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })
})
