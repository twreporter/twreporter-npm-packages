/* global describe, context, it, after, afterEach */

/*
  Testing functions:
    fetchAFullTopic
    fetchTopics
    fetchTopicsOnIndexPage
*/

import * as actions from '../topics'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import configureMockStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import nock from 'nock'
import pagination from '../../utils/pagination'
import thunk from 'redux-thunk'
import types from '../../constants/action-types'

const { pageToOffset } = pagination

chai.use(chaiAsPromised)
const expect = chai.expect
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
  context('Topic is already existed in entities', () => {
    it('Should dispatch types.CHANGE_SELECTED_TOPIC with topic', () => {
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
      store.dispatch(actions.fetchAFullTopic(mockSlug))
      expect(store.getActions().length).to.equal(1) // dispatch types.CHANGE_SELECTED_TOPIC
      expect(store.getActions()[0].type).to.equal(types.CHANGE_SELECTED_TOPIC)
      expect(store.getActions()[0].payload).to.deep.equal(mockTopic)
    })
  })
  context('It loads a full topic successfully', () => {
    it('Should dispatch types.START_TO_GET_A_FULL_TOPIC and types.GET_A_FULL_TOPIC', () => {
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
        expect(store.getActions().length).to.equal(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0].type).to.deep.equal(
          types.START_TO_GET_A_FULL_TOPIC
        )
        expect(store.getActions()[0].payload).to.deep.equal({
          slug: mockSlug,
        })
        expect(store.getActions()[1].type).to.equal(types.GET_A_FULL_TOPIC)
        expect(store.getActions()[1].payload).to.deep.equal(mockTopic)
      })
    })
  })
  context('If the api returns a failure', () => {
    it('Should dispatch types.START_TO_GET_A_FULL_TOPIC and types.ERROR_TO_GET_A_FULL_TOPIC', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockSlug = 'mock-slug'
      nock('http://localhost:8080')
        .get(encodeURI(`/v1/topics/${mockSlug}?full=true`))
        .reply(404)

      return store.dispatch(actions.fetchAFullTopic(mockSlug)).then(() => {
        expect(store.getActions().length).to.equal(2) // 2 actions: REQUEST && FAILURE
        expect(store.getActions()[0].type).to.deep.equal(
          types.START_TO_GET_A_FULL_TOPIC
        )
        expect(store.getActions()[1].type).to.equal(
          types.ERROR_TO_GET_A_FULL_TOPIC
        )
        expect(store.getActions()[1].payload.error).to.be.an.instanceof(Error)
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
  context('There is no such page of topics to load', () => {
    it('Should dispatch types.GET_TOPICS with empty items array', () => {
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
        expect(store.getActions().length).to.equal(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[1].type).to.equal(types.GET_TOPICS)
        expect(store.getActions()[1].payload).to.deep.equal({
          items: [],
          total,
          limit,
          offset,
        })
      })
    })
  })
  context('It loads topics successfully', () => {
    it('Should dispatch types.GET_TOPICS', () => {
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
        expect(store.getActions().length).to.equal(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0].type).to.deep.equal(
          types.START_TO_GET_TOPICS
        )
        expect(store.getActions()[1].type).to.equal(types.GET_TOPICS)
        expect(store.getActions()[1].payload).to.deep.equal({
          items: [topic2],
          total,
          limit,
          offset,
        })
      })
    })
  })
  context('If the api returns a failure', () => {
    it('Should dispatch types.ERROR_TO_GET_TOPICS', () => {
      const limit = 1
      const offset = 1
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      nock('http://localhost:8080')
        .get(encodeURI(`/v1/topics?limit=${limit}&offset=${offset}`))
        .reply(404)
      return store.dispatch(actions.fetchTopics(limit)).then(() => {
        expect(store.getActions().length).to.equal(2) // 2 actions: REQUEST && FAILURE
        expect(store.getActions()[0].type).to.deep.equal(
          types.START_TO_GET_TOPICS
        )
        expect(store.getActions()[1].type).to.equal(types.ERROR_TO_GET_TOPICS)
        expect(store.getActions()[1].payload.error).to.be.an.instanceof(Error)
      })
    })
  })
  context('If the parameter nPerPage is invalid', () => {
    it('Should dispatch no action and return a Promise.reject(err)', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const page = 1
      const nPerPage = -1
      expect(
        store.dispatch(actions.fetchTopics(page, nPerPage))
      ).eventually.to.be.an.instanceof(Error)
      return expect(store.getActions().length).to.equal(0) // no action
    })
  })
  context('If the parameter page is invalid', () => {
    it('Should dispatch no action and return a Promise.reject(err)', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const page = -1
      const nPerPage = 10
      expect(
        store.dispatch(actions.fetchTopics(page, nPerPage))
      ).eventually.to.be.an.instanceof(Error)
      return expect(store.getActions().length).to.equal(0) // no action
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
  after(() => {
    nock.cleanAll()
  })
  context('index_page.topics are already existed', () => {
    it('Should do nothing', () => {
      const store = mockStore({
        [fieldNames.indexPage]: {
          [fieldNames.sections.topicsSection]: [topic1, topic2],
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      store.dispatch(actions.fetchTopicsOnIndexPage())
      expect(store.getActions().length).to.equal(0) // no action is dispatched
      return expect(
        store.dispatch(actions.fetchTopicsOnIndexPage())
      ).eventually.equal(undefined)
    })
  })

  context('Load topics if needed', () => {
    it('Should dispatch types.GET_TOPICS_FOR_INDEX_PAGE)', () => {
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
        expect(store.getActions().length).to.equal(2) // START and GET
        expect(store.getActions()[1].type).to.equal(
          types.GET_TOPICS_FOR_INDEX_PAGE
        )
        expect(store.getActions()[1].payload.items.length).to.equal(2)
      })
    })
  })
})
