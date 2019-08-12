/* global expect, test, describe, afterEach */

/*
  Testing functions:
    fetchIndexPageContent
*/

import configureMockStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import nock from 'nock'
import thunk from 'redux-thunk'
import types from '../../constants/action-types'
import * as actions from '../index-page'

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

const fullTopic = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
  relateds: [post3, post4],
  full: true,
}

const nonFullTopic = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
  full: false,
}

process.env.NODE_ENV = 'development'

/* Fetch a full post, whose assets like relateds, leading_video ...etc are all complete,
 * @param {string} slug - slug of post
 */
/*
========= Testing fetchAFullPost ==========
*/
describe('Testing fetchIndexPageContent:', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  describe('Contents are already existed', () => {
    test('Should dispatch no actions and return Promise.resolve()', () => {
      const store = mockStore({
        [fieldNames.indexPage]: {
          [fieldNames.sections.latestSection]: [post1, post2],
          [fieldNames.sections.editorPicksSection]: [post3],
          [fieldNames.sections.latestTopicSection]: fullTopic,
          [fieldNames.sections.reviewsSection]: [post4],
          [fieldNames.sections.topicsSection]: [nonFullTopic],
          [fieldNames.sections.photosSection]: [post2],
          [fieldNames.sections.infographicsSection]: [post3],
        },
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      return store.dispatch(actions.fetchIndexPageContent()).then(result => {
        expect(store.getActions().length).toBe(0) // no action is dispatched
        expect(result).toBeUndefined()
      })
    })
  })
  describe('Lacks of contents', () => {
    test('Should dispatch types.GET_CONTENT_FOR_INDEX_PAGE', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      const mockApiResponse = {
        records: {
          [fieldNames.sections.latestSection]: [post1, post2],
          [fieldNames.sections.editorPicksSection]: [post3],
          [fieldNames.sections.latestTopicSection]: [fullTopic],
          [fieldNames.sections.reviewsSection]: [post4],
          [fieldNames.sections.topicsSection]: [nonFullTopic],
          [fieldNames.sections.photosSection]: [post2],
          [fieldNames.sections.infographicsSection]: [post3],
        },
      }
      nock('http://localhost:8080')
        .get(encodeURI('/v1/index_page'))
        .reply(200, mockApiResponse)

      return store.dispatch(actions.fetchIndexPageContent()).then(() => {
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && SUCCESS
        expect(store.getActions()[0].type).toEqual(
          types.START_TO_GET_INDEX_PAGE_CONTENT
        )
        expect(store.getActions()[1].type).toBe(
          types.GET_CONTENT_FOR_INDEX_PAGE
        )
        expect(store.getActions()[1].payload).toEqual({
          [fieldNames.sections.latestSection]: [post1, post2],
          [fieldNames.sections.editorPicksSection]: [post3],
          [fieldNames.sections.latestTopicSection]: [fullTopic],
          [fieldNames.sections.reviewsSection]: [post4],
          [fieldNames.sections.topicsSection]: [nonFullTopic],
          [fieldNames.sections.photosSection]: [post2],
          [fieldNames.sections.infographicsSection]: [post3],
        })
      })
    })
  })
  describe('If the api returns a failure', () => {
    test('Should dispatch types.ERROR_TO_GET_INDEX_PAGE_CONTENT', () => {
      const store = mockStore({
        [fieldNames.origins]: {
          api: 'http://localhost:8080',
        },
      })
      nock('http://localhost:8080')
        .get('/v1/index_Page')
        .reply(404)

      return store.dispatch(actions.fetchIndexPageContent()).then(() => {
        expect(store.getActions().length).toBe(2) // 2 actions: REQUEST && FAILURE
        expect(store.getActions()[0].type).toEqual(
          types.START_TO_GET_INDEX_PAGE_CONTENT
        )
        expect(store.getActions()[1].type).toBe(
          types.ERROR_TO_GET_INDEX_PAGE_CONTENT
        )
        expect(store.getActions()[1].errorMsg).not.toBe('')
      })
    })
  })
})
