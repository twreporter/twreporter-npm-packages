/* global expect, test, describe, afterEach, afterAll */

/*
  Testing functions:
    fetchAFullTopic
    fetchTopics
    fetchTopicsOnIndexPage
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
  full: true,
}
const topic2 = {
  id: 'topic-id-2',
  slug: 'topic-slug-2',
  full: true,
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
    test('Should dispatch types.CHANGE_SELECTED_TOPIC with topic', () => {
      const mockSlug = 'mock-slug'
      const mockTopic = {
        id: 'mock-id',
        slug: mockSlug,
        full: true,
      }
      const store = mockStore({
        [fieldNames.entities]: {
          [fieldNames.topicsInEntities]: {
            [mockSlug]: mockTopic,
          },
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      return store.dispatch(actions.fetchAFullTopic(mockSlug)).then(() => {
        const expected = {
          type: types.CHANGE_SELECTED_TOPIC,
          payload: {
            topic: mockTopic,
          },
        }
        expect(store.getActions().length).toBe(1) // dispatch types.CHANGE_SELECTED_TOPIC
        expect(store.getActions()[0]).toEqual(expected)
      })
    })
  })
  describe('It loads a full topic successfully', () => {
    test('Should dispatch types.START_TO_GET_A_FULL_TOPIC and types.GET_A_FULL_TOPIC', () => {
      const mockSlug = 'mock-slug'
      const mockTopic = {
        id: 'mock-id',
        slug: mockSlug,
        full: false,
      }
      const store = mockStore({
        entities: {
          topics: {
            [mockSlug]: mockTopic,
          },
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockApiResponse = {
        record: mockTopic,
      }

      nock('http://localhost:8080')
        .get(encodeURI(`/v1/topics/${mockSlug}?full=true`))
        .reply(200, mockApiResponse)

      return store.dispatch(actions.fetchAFullTopic(mockSlug)).then(() => {
        const expected = [
          {
            type: types.START_TO_GET_A_FULL_TOPIC,
            payload: {
              slug: mockSlug,
            },
          },
          {
            type: types.GET_A_FULL_TOPIC,
            payload: {
              topic: mockTopic,
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
    test('Should dispatch types.START_TO_GET_A_FULL_TOPIC and types.ERROR_TO_GET_A_FULL_TOPIC', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockSlug = 'mock-slug'
      const mockStatusCode = 404
      const mockAPIRes = {
        status: 'fail',
        data: null,
      }
      nock('http://localhost:8080')
        .get(encodeURI(`/v1/topics/${mockSlug}?full=true`))
        .reply(mockStatusCode, mockAPIRes)

      return store.dispatch(actions.fetchAFullTopic(mockSlug)).catch(() => {
        const expected = [
          {
            type: types.START_TO_GET_A_FULL_TOPIC,
            payload: {
              slug: mockSlug,
            },
          },
          {
            type: types.ERROR_TO_GET_A_FULL_TOPIC,
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
  describe('There is no such page of topics to load', () => {
    test('Should dispatch types.GET_TOPICS with empty items array', () => {
      const store = mockStore({
        [fieldNames.topicList]: {
          page: 2,
          totalPages: 2,
          items: {
            1: [topic1.slug],
            2: [topic2.slug],
          },
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const page = 3
      const nPerPage = 1
      const { limit, offset } = pageToOffset({ page, nPerPage })
      const total = 5
      const mockApiResponse = {
        records: [],
        meta: {
          limit,
          total,
          offset,
        },
      }
      nock('http://localhost:8080')
        .get(encodeURI(`/v1/topics?limit=${limit}&offset=${offset}`))
        .reply(200, mockApiResponse)

      return store.dispatch(actions.fetchTopics(page, nPerPage)).then(() => {
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[1].type).toBe(types.GET_TOPICS)
        expect(store.getActions()[1].payload).toEqual({
          items: [],
          total,
          limit,
          offset,
        })
      })
    })
  })
  describe('It loads topics successfully', () => {
    test('Should dispatch types.GET_TOPICS', () => {
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
        records: [topic2],
        meta: {
          limit,
          total,
          offset,
        },
      }
      nock('http://localhost:8080')
        .get(encodeURI(`/v1/topics?limit=${limit}&offset=${offset}`))
        .reply(200, mockApiResponse)

      return store.dispatch(actions.fetchTopics(page, nPerPage)).then(() => {
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0].type).toEqual(types.START_TO_GET_TOPICS)
        expect(store.getActions()[1].type).toBe(types.GET_TOPICS)
        expect(store.getActions()[1].payload).toEqual({
          items: [topic2],
          total,
          limit,
          offset,
        })
      })
    })
  })
  describe('If the api returns a failure', () => {
    test('Should dispatch types.ERROR_TO_GET_TOPICS', () => {
      const limit = 1
      const offset = 0
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockStatusCode = 404
      const mockAPIRes = {
        status: 'fail',
        data: null,
      }
      nock('http://localhost:8080')
        .get(`/v1/topics?limit=${limit}&offset=${offset}`)
        .reply(mockStatusCode, mockAPIRes)

      const page = 1
      const nPerPage = 1
      return store.dispatch(actions.fetchTopics(page, nPerPage)).catch(() => {
        const expected = [
          {
            type: types.START_TO_GET_TOPICS,
            url: `http://localhost:8080/v1/topics?limit=${limit}&offset=${offset}`,
          },
          {
            type: types.ERROR_TO_GET_TOPICS,
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
  })
  describe('If the parameter nPerPage is invalid', () => {
    test('Should dispatch no action and return a Promise.reject(err)', () => {
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
              type: types.ERROR_TO_GET_TOPICS,
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
  describe('If the parameter page is invalid', () => {
    test('Should dispatch no action and return a Promise.reject(err)', () => {
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
              type: types.ERROR_TO_GET_TOPICS,
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

/**
 * fetchTopicsOnIndexPage
 * This function will fetch the 2 to 5 latest topics.
 * It's specifically made for index page
 */
/*
========= Testing  fetchTopicsOnIndexPage ==========
*/
describe('Testing fetchTopicsOnIndexPage:', () => {
  afterAll(() => {
    nock.cleanAll()
  })
  describe('index_page.topics are already existed', () => {
    test('Should do nothing', () => {
      const store = mockStore({
        [fieldNames.indexPage]: {
          [fieldNames.sections.topicsSection]: [topic1, topic2],
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      return store.dispatch(actions.fetchTopicsOnIndexPage()).then(result => {
        expect(store.getActions().length).toBe(1)
        expect(result).toEqual({
          type: types.dataAlreadyExists,
          payload: {
            function: actions.fetchTopicsOnIndexPage.name,
            message: expect.any(String),
          },
        })
      })
    })
  })

  describe('Load topics if needed', () => {
    test('Should dispatch types.GET_TOPICS_FOR_INDEX_PAGE)', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      nock('http://localhost:8080')
        .get(encodeURI('/v1/topics?offset=1&limit=4'))
        .reply(200, {
          records: [topic1, topic2],
          meta: {
            limit: 10,
            total: 2,
            offset: 0,
          },
        })

      return store.dispatch(actions.fetchTopicsOnIndexPage()).then(() => {
        expect(store.getActions().length).toBe(2) // START and GET
        expect(store.getActions()[1].type).toBe(types.GET_TOPICS_FOR_INDEX_PAGE)
        expect(store.getActions()[1].payload.items.length).toBe(2)
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
          data: mockFeatureTopicWithoutRelateds,
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
          data: mockFeatureTopic,
        })

      nock(mockApiHost)
        .get('/v2/posts')
        .query({
          id: [mockPost2.id, mockPost3.id, mockPost4.id],
        })
        .reply(200, {
          status: 'success',
          records: [mockPost2, mockPost3, mockPost4],
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
        .reply(404, {
          status: 'fail',
          data: {
            slug: 'Cannot find the topic from the slug',
          },
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
          data: mockFeatureTopic,
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
