/* global expect, test, describe, afterEach, afterAll */

/*
  Testing functions:
    fetchAFullTopic
    fetchTopics
    fetchFeatureTopic
*/

import * as actions from '../topics'
import configureMockStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import httpProtocolConsts from '../../constants/http-protocol'
import nock from 'nock'
import pagination from '../../utils/pagination'
import thunk from 'redux-thunk'
import types from '../../constants/action-types'
import { expectActionErrorObj } from './expect-utils'

const { pageToOffset } = pagination

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const topic1 = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
}
const topic2 = {
  id: 'topic-id-2',
  slug: 'topic-slug-2',
}

/* Fetch a full topic, whose assets like relateds, leading_video ...etc are all complete,
 * @param {string} slug - slug of topic
 */
/*
========= Testing fetchAFullTopic ==========
*/
describe('Testing fetchAFullTopic:', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  describe('Topic is already existed in entities', () => {
    test('Should dispatch alreadyExisted action', () => {
      const fullTopic = Object.assign({}, topic1, {
        full: true,
      })
      const store = mockStore({
        [fieldNames.entities]: {
          [fieldNames.topicsInEntities]: {
            byId: {
              [fullTopic.id]: fullTopic,
            },
            allIds: [fullTopic.id],
            slugToId: {
              [fullTopic.slug]: fullTopic.id,
            },
          },
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      return store
        .dispatch(actions.fetchAFullTopic(fullTopic.slug))
        .then(() => {
          const expected = {
            type: types.selectedTopic.read.alreadyExists,
            payload: {
              topic: fullTopic,
            },
          }
          expect(store.getActions().length).toBe(1) // dispatch types.CHANGE_SELECTED_TOPIC
          expect(store.getActions()[0]).toEqual(expected)
        })
    })
  })
  describe('It loads a full topic successfully', () => {
    test('Should dispatch request action and success action', () => {
      const metaOfTopic = Object.assign({}, topic1, {
        full: false,
      })
      const fullTopic = Object.assign({}, topic1, {
        full: true,
      })
      const store = mockStore({
        [fieldNames.entities]: {
          [fieldNames.topicsInEntities]: {
            byId: {
              [metaOfTopic.id]: metaOfTopic,
            },
            allIds: [metaOfTopic.id],
            slugToId: {
              [metaOfTopic.slug]: metaOfTopic.id,
            },
          },
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockApiResponse = {
        status: 'success',
        data: fullTopic,
      }

      nock('http://localhost:8080')
        .get(encodeURI(`/v2/topics/${metaOfTopic.slug}?full=true`))
        .reply(200, mockApiResponse)

      return store
        .dispatch(actions.fetchAFullTopic(metaOfTopic.slug))
        .then(() => {
          const expected = [
            {
              type: types.selectedTopic.read.request,
              payload: {
                slug: metaOfTopic.slug,
              },
            },
            {
              type: types.selectedTopic.read.success,
              payload: {
                topic: fullTopic,
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
    test('Should dispatch request action and failure action', () => {
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
          slug: 'Cannot find the topic from the slug',
        },
      }
      nock('http://localhost:8080')
        .get(encodeURI(`/v2/topics/${mockSlug}?full=true`))
        .reply(mockStatusCode, mockAPIRes)

      return store.dispatch(actions.fetchAFullTopic(mockSlug)).catch(() => {
        const expected = [
          {
            type: types.selectedTopic.read.request,
            payload: {
              slug: mockSlug,
            },
          },
          {
            type: types.selectedTopic.read.failure,
            payload: {
              error: expect.any(Error),
              slug: mockSlug,
            },
          },
        ]
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && FAILURE
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

/* Fetch topics(only containing meta properties),
 * and it will load more if (total > items you have currently).
 * @param {number} limit - the number of posts you want to get in one request
 */
/*
========= Testing fetchTopics ==========
*/
describe('Testing fetchTopics:', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  test('Dispatch already existed action', () => {
    const nPerPage = 1
    const page = 2
    const store = mockStore({
      [fieldNames.topicList]: {
        nPerPage,
        page,
        totalPages: 2,
        items: {
          1: [topic1.slug],
          [page]: [topic2.slug],
        },
        isFetching: false,
        error: null,
      },
      [fieldNames.origins]: {
        api: 'http://localhost:8080',
      },
    })

    return store.dispatch(actions.fetchTopics(page, nPerPage)).then(() => {
      expect(store.getActions().length).toBe(1)
      expect(store.getActions()[0]).toEqual({
        type: types.topics.read.alreadyExists,
        payload: {
          page,
          nPerPage,
        },
      })
    })
  })
  describe('Dispatch success action', () => {
    test('if it loads topics successfully', () => {
      const store = mockStore({
        [fieldNames.topicList]: {
          items: {
            1: [topic1.slug],
          },
          totalPages: 5,
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const page = 2
      const nPerPage = 1
      const { limit, offset } = pageToOffset({ page, nPerPage })
      const total = 5
      const mockApiResponse = {
        status: 'success',
        data: {
          records: [topic2],
          meta: {
            limit,
            total,
            offset,
          },
        },
      }
      nock('http://localhost:8080')
        .get(encodeURI(`/v2/topics?limit=${limit}&offset=${offset}`))
        .reply(200, mockApiResponse)

      return store.dispatch(actions.fetchTopics(page, nPerPage)).then(() => {
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0].type).toEqual(types.topics.read.request)
        expect(store.getActions()[1].type).toBe(types.topics.read.success)
        expect(store.getActions()[1].payload).toEqual({
          items: [topic2],
          total,
          limit,
          offset,
        })
      })
    })
  })
  describe('Dispatch failure action', () => {
    test('if api returns the response with 500 status code', () => {
      const limit = 1
      const offset = 0
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpecetd error',
      }
      nock('http://localhost:8080')
        .get(`/v2/topics?limit=${limit}&offset=${offset}`)
        .reply(mockStatusCode, mockAPIRes)

      const page = 1
      const nPerPage = 1
      return store.dispatch(actions.fetchTopics(page, nPerPage)).catch(() => {
        const expected = [
          {
            type: types.topics.read.request,
            url: `http://localhost:8080/v2/topics?limit=${limit}&offset=${offset}`,
          },
          {
            type: types.topics.read.failure,
            payload: {
              error: expect.any(Error),
            },
          },
        ]
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && FAILURE
        expect(store.getActions()[0]).toEqual(expected[0])
        expect(store.getActions()[1]).toEqual(expected[1])
        expectActionErrorObj(
          store.getActions()[1].payload.error,
          mockStatusCode,
          mockAPIRes
        )
      })
    })
    test('if the parameter nPerPage is invalid', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const page = 1
      const nPerPage = -1
      return store
        .dispatch(actions.fetchTopics(page, nPerPage))
        .catch(failAction => {
          const expected = [
            {
              type: types.topics.read.failure,
              payload: {
                error: expect.any(Error),
              },
            },
          ]
          expect(failAction).toEqual(expected[0])
          expect(failAction.payload.error.statusCode).toBe(
            httpProtocolConsts.statusCode.badRequest
          )
        })
    })
    test('if the parameter page is invalid', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const page = -1
      const nPerPage = 10
      return store
        .dispatch(actions.fetchTopics(page, nPerPage))
        .catch(failAction => {
          const expected = [
            {
              type: types.topics.read.failure,
              payload: {
                error: expect.any(Error),
              },
            },
          ]
          expect(failAction).toEqual(expected[0])
          expect(failAction.payload.error.statusCode).toBe(
            httpProtocolConsts.statusCode.badRequest
          )
        })
    })
  })
})

describe('Test function `fetchFeatureTopic`', () => {
  const mockApiHost = 'http://localhost:8080'

  const mockPost1 = {
    id: 'post-id-1',
  }

  const mockPost2 = {
    id: 'post-id-2',
  }

  const mockPost3 = {
    id: 'post-id-3',
  }

  const mockPost4 = {
    id: 'post-id-4',
  }

  const mockFeatureTopic = {
    id: 'topic-id-1',
    relateds: [mockPost1.id, mockPost2.id, mockPost3.id, mockPost4.id],
  }

  const mockFeatureTopicWithoutRelateds = Object.assign({}, mockFeatureTopic, {
    relateds: [],
  })

  test('Dispatch already existed action', () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: mockApiHost,
      },
      [fieldNames.featureTopic]: {
        id: mockFeatureTopic.id,
        error: null,
        isFetching: false,
        lastThreeRelatedPostIds: mockFeatureTopic.relateds.slice(-3),
      },
    })

    const returnValue = {
      type: types.featureTopic.read.alreadyExists,
    }

    const expectedActions = [returnValue]

    expect.assertions(3)

    return store.dispatch(actions.fetchFeatureTopic()).then(result => {
      expect(result).toEqual(returnValue)
      expect(store.getActions().length).toBe(expectedActions.length)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('Dispatch success action', () => {
    afterAll(() => {
      nock.clearAll()
    })

    test('by requesting api to fetch the topic which does not have related posts', () => {
      nock(mockApiHost)
        .get('/v2/topics')
        .query({
          limit: 1,
          offset: 0,
        })
        .reply(200, {
          status: 'success',
          data: {
            meta: {
              limit: 1,
              offset: 0,
              total: 10,
            },
            records: [mockFeatureTopicWithoutRelateds],
          },
        })

      const store = mockStore({
        [fieldNames.origins]: {
          api: mockApiHost,
        },
      })

      const returnValue = {
        type: types.featureTopic.read.success,
        payload: {
          topic: mockFeatureTopicWithoutRelateds,
          lastThreeRelatedPosts: [],
        },
      }

      const expectedActions = [
        {
          type: types.featureTopic.read.request,
        },
        returnValue,
      ]

      expect.assertions(3)

      return store.dispatch(actions.fetchFeatureTopic()).then(result => {
        expect(result).toEqual(returnValue)
        expect(store.getActions().length).toBe(expectedActions.length)
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    test('by requesting api to fetch the topic and corresponding related posts', () => {
      nock(mockApiHost)
        .get('/v2/topics')
        .query({
          limit: 1,
          offset: 0,
        })
        .reply(200, {
          status: 'success',
          data: {
            meta: {
              limit: 1,
              offset: 0,
              total: 10,
            },
            records: [mockFeatureTopic],
          },
        })

      nock(mockApiHost)
        .get('/v2/posts')
        .query({
          id: [mockPost2.id, mockPost3.id, mockPost4.id],
        })
        .reply(200, {
          status: 'success',
          data: {
            meta: {
              limit: 10,
              offset: 0,
              total: 3,
            },
            records: [mockPost2, mockPost3, mockPost4],
          },
        })

      const store = mockStore({
        [fieldNames.origins]: {
          api: mockApiHost,
        },
      })

      const returnValue = {
        type: types.featureTopic.read.success,
        payload: {
          topic: mockFeatureTopic,
          lastThreeRelatedPosts: [mockPost2, mockPost3, mockPost4],
        },
      }

      const expectedActions = [
        {
          type: types.featureTopic.read.request,
        },
        returnValue,
      ]

      expect.assertions(3)

      return store.dispatch(actions.fetchFeatureTopic()).then(result => {
        expect(result).toEqual(returnValue)
        expect(store.getActions().length).toBe(expectedActions.length)
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('Dispatch failure action', () => {
    afterAll(() => {
      nock.clearAll()
    })

    test('because of fetching topic failure', () => {
      nock(mockApiHost)
        .get('/v2/topics')
        .query({
          limit: 1,
          offset: 0,
        })
        .reply(500, {
          status: 'error',
          message: 'Unexpected error',
        })

      const store = mockStore({
        [fieldNames.origins]: {
          api: mockApiHost,
        },
      })

      const returnValue = {
        type: types.featureTopic.read.failure,
        payload: {
          error: expect.any(Error),
        },
      }

      const expectedActions = [
        {
          type: types.featureTopic.read.request,
        },
        returnValue,
      ]

      expect.assertions(3)

      return store.dispatch(actions.fetchFeatureTopic()).catch(result => {
        expect(result).toEqual(returnValue)
        expect(store.getActions().length).toBe(expectedActions.length)
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    test('because of fetching related posts failure', () => {
      nock(mockApiHost)
        .get('/v2/topics')
        .query({
          limit: 1,
          offset: 0,
        })
        .reply(200, {
          status: 'success',
          data: {
            meta: {
              limit: 1,
              offset: 0,
              total: 10,
            },
            records: [mockFeatureTopic],
          },
        })

      nock(mockApiHost)
        .get('/v2/posts')
        .query({
          id: [mockPost2.id, mockPost3.id, mockPost4.id],
        })
        .reply(500, {
          status: 'error',
          message: 'Unexpected error',
        })

      const store = mockStore({
        [fieldNames.origins]: {
          api: mockApiHost,
        },
      })

      const returnValue = {
        type: types.featureTopic.read.failure,
        payload: {
          error: expect.objectContaining({
            statusCode: 500,
            name: 'AxiosError',
          }),
        },
      }

      const expectedActions = [
        {
          type: types.featureTopic.read.request,
        },
        returnValue,
      ]

      expect.assertions(3)

      return store.dispatch(actions.fetchFeatureTopic()).catch(result => {
        expect(result).toEqual(returnValue)
        expect(store.getActions().length).toBe(expectedActions.length)
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
