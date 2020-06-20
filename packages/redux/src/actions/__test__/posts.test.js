/* global expect, test, describe, afterEach, afterAll, beforeAll */

/*
  Testing functions:
    fetchAFullPost
    fetchListedPosts
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
      const mockAPIRes = {
        status: 'fail',
        data: {
          slug: 'Cannot find the post from the slug',
        },
      }
      nock(mockApiHost)
        .get(`/v2/posts/${mockSlug}?full=true`)
        .reply(mockStatusCode, mockAPIRes)

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
            mockAPIRes
          )
        })
    })
  })
})

/* Fetch a listed posts(only containing meta properties),
 * such as the posts belonging to the same tag/category/topic.
 * @param {string} listID - id of the tag, category or topic
 * @param {string} listType - tags, categories or topics
 * @param {number} limit - the number of posts you want to get in one request
 */
/*
========= Testing fetchListedPosts ==========
*/
describe('Testing fetchListedPosts:', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  describe('There is no more posts to load', () => {
    test('Should dispatch no actions and return Promise.resolve()', () => {
      const mockArgs = [
        'mock_target_uuid', // listID
        'categories', // type
        10, // limit
      ]
      const store = mockStore({
        lists: {
          mock_target_uuid: {
            total: 4,
            items: [post1, post2, post3, post4],
          },
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      expect.assertions(3)
      return store
        .dispatch(actions.fetchListedPosts(...mockArgs))
        .then(result => {
          const expected = {
            type: types.noMoreItemsToFetch,
          }
          expect(store.getActions().length).toBe(1)
          expect(result).toEqual(expected)
          expect(store.getActions()[0]).toEqual(expected)
        })
    })
    test('Items of page are already fetched', () => {
      const listID = 'mock_target_uuid'
      const listType = 'categories'
      const limit = 10
      const page = 1
      const mockArgs = [listID, listType, limit, page]
      const store = mockStore({
        lists: {
          mock_target_uuid: {
            total: 10,
            items: [post1, post2, post3, post4],
            pages: {
              // page 1 already fetched, and items post1, post2, post3 and post4
              1: [0, 3],
            },
          },
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      return store
        .dispatch(actions.fetchListedPosts(...mockArgs))
        .then(result => {
          const expected = {
            type: types.dataAlreadyExists,
            payload: {
              function: actions.fetchListedPosts.name,
              arguments: {
                listID,
                listType,
                limit,
                page,
              },
              message: expect.any(String),
            },
          }
          expect(store.getActions().length).toBe(1)
          expect(result).toEqual(expected)
          expect(store.getActions()[0]).toEqual(expected)
        })
    })
  })
  describe('It loads posts successfully', () => {
    test('Should load items when there is no items in the store', () => {
      const mockArgs = [
        'mock_target_uuid', // listID
        'categories', // type
        1, // limit
        0, // page
      ]
      const store = mockStore({
        // empty lists
        lists: {},
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockPath = '/v1/posts'
      const mockQuery = {
        where: '{"categories":{"in":["mock_target_uuid"]}}',
        limit: 1,
        offset: 0,
      }
      const mockUrl = formURL('http://localhost:8080', mockPath, mockQuery)
      const mockApiResponse = {
        records: [
          {
            _id: 'mock_category_article_id_01',
            title: 'mock_category_article_title',
            slug: 'mock-category-article-slug',
            style: 'article',
            og_description: 'mock_category_article_title_og_description',
          },
        ],
        meta: {
          limit: 1,
          total: 2,
          offset: 0,
        },
      }
      const expectedRequestAction = {
        type: types.START_TO_GET_POSTS,
        url: mockUrl,
      }
      const expectedSuccessAction = {
        type: types.GET_LISTED_POSTS,
        payload: {
          items: [
            {
              _id: 'mock_category_article_id_01',
              title: 'mock_category_article_title',
              slug: 'mock-category-article-slug',
              style: 'article',
              og_description: 'mock_category_article_title_og_description',
            },
          ],
          total: 2,
          listID: 'mock_target_uuid',
          page: 0,
        },
      }
      nock(mockApiHost)
        .get(mockPath)
        .query(mockQuery)
        .reply(200, mockApiResponse)
      return store.dispatch(actions.fetchListedPosts(...mockArgs)).then(() => {
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0]).toEqual(expectedRequestAction)
        expect(store.getActions()[1].type).toBe(expectedSuccessAction.type)
        expect(store.getActions()[1].payload).toEqual(
          expectedSuccessAction.payload
        )
      })
    })
    test('Should load items when page is provided', () => {
      const mockArgs = [
        'mock_target_uuid', // listID
        'categories', // type
        1, // limit
        2, // page
      ]
      const store = mockStore({
        // empty lists
        lists: {},
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockQuery = {
        where: '{"categories":{"in":["mock_target_uuid"]}}',
        limit: 1,
        offset: 1,
      }
      const mockPath = '/v1/posts'
      const mockUrl = formURL('http://localhost:8080', mockPath, mockQuery)
      const mockApiResponse = {
        records: [
          {
            _id: 'mock_category_article_id_01',
            title: 'mock_category_article_title',
            slug: 'mock-category-article-slug',
            style: 'article',
            og_description: 'mock_category_article_title_og_description',
          },
        ],
        meta: {
          limit: 1,
          total: 2,
          offset: 0,
        },
      }
      const expectedRequestAction = {
        type: types.START_TO_GET_POSTS,
        url: mockUrl,
      }
      const expectedSuccessAction = {
        type: types.GET_LISTED_POSTS,
        payload: {
          items: [
            {
              _id: 'mock_category_article_id_01',
              title: 'mock_category_article_title',
              slug: 'mock-category-article-slug',
              style: 'article',
              og_description: 'mock_category_article_title_og_description',
            },
          ],
          total: 2,
          listID: 'mock_target_uuid',
          page: 2,
        },
      }
      nock(mockApiHost)
        .get(mockPath)
        .query(mockQuery)
        .reply(200, mockApiResponse)
      return store.dispatch(actions.fetchListedPosts(...mockArgs)).then(() => {
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0]).toEqual(expectedRequestAction)
        expect(store.getActions()[1].type).toBe(expectedSuccessAction.type)
        expect(store.getActions()[1].payload).toEqual(
          expectedSuccessAction.payload
        )
      })
    })
  })
  describe('If the api returns a failure', () => {
    test('Should dispatch types.START_TO_GET_POSTS and types.ERROR_TO_GET_POSTS', () => {
      const mock = {
        listID: 'mock_target_uuid',
        type: 'categories',
        limit: 1,
      }
      const mockArgs = [
        mock.listID, // listID
        mock.type, // type
        mock.limit, // limit
      ]
      const store = mockStore({
        // empty lists
        lists: {},
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockPath = '/v1/posts'
      const mockQuery = {
        where: `{"${mock.type}":{"in":["${mock.listID}"]}}`,
        limit: mock.limit,
        offset: 0,
      }
      const mockUrl = formURL('http://localhost:8080', mockPath, mockQuery)
      const mockStatusCode = 404
      const mockAPIRes = {
        status: 'fail',
        data: null,
      }
      nock(mockApiHost)
        .get(mockPath)
        .query(mockQuery)
        .reply(mockStatusCode, mockAPIRes)
      return store.dispatch(actions.fetchListedPosts(...mockArgs)).catch(() => {
        const expected = [
          {
            type: types.START_TO_GET_POSTS,
            url: mockUrl,
          },
          {
            type: types.ERROR_TO_GET_LISTED_POSTS,
            payload: {
              error: expect.any(Error),
              listID: mock.listID,
              page: 0,
            },
          },
        ]
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0]).toEqual(expected[0])
        expect(store.getActions()[1]).toEqual(expected[1])
        expectActionErrorObj(
          store.getActions()[1].payload.error,
          mockStatusCode,
          mockAPIRes
        )
      })
    })
  })
})

describe('Test function `fetchRelatedPostsOfAnEntity`', () => {
  function _expect(store, entityId, limit, returnValue, expectedActions) {
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
          error: 'internal server error',
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
