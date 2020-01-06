/* global expect, test, describe, afterEach */
import { MAX_ARTICLES_PER_FETCH } from '../../constants/author-page'
import { expectActionErrorObj } from './expect-utils'
import { mockResponse, items } from './mocks/author-articles'
import * as actions from '../../../src/actions/author-articles'
import actionTypes from '../../constants/action-types'
import configureMockStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import nock from 'nock'
import thunk from 'redux-thunk'

// all constants
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockDefaultState = {
  articlesByAuthor: {},
  entities: {
    authors: {
      isFetching: false,
    },
    articles: {},
  },
  [fieldNames.origins]: {
    api: 'http://localhost:8080',
  },
}
const authorId = 'theAurhtorId'
const searchParas = {
  keywords: authorId,
  hitsPerPage: MAX_ARTICLES_PER_FETCH,
  page: 0,
}

process.env.NODE_ENV = 'development'

describe('Atuhor Action Testing', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('The Actions: FETCH_AUTHOR_COLLECTION_REQUEST && FETCH_AUTHOR_COLLECTION_FAILURE', () => {
    const mockStatusCode = 500
    const mockAPIRes = {
      message: 'mock internal server error',
      status: 'error',
    }
    nock('http://localhost:8080')
      .get('/v1/search/posts')
      .query(searchParas)
      .reply(mockStatusCode, mockAPIRes)

    const store = mockStore(mockDefaultState)
    return store
      .dispatch(actions.fetchAuthorCollectionIfNeeded(authorId))
      .catch(failAction => {
        const expected = [
          {
            type: actionTypes.FETCH_AUTHOR_COLLECTION_REQUEST,
            payload: {
              authorId,
            },
          },
          {
            type: actionTypes.FETCH_AUTHOR_COLLECTION_FAILURE,
            payload: {
              error: expect.any(Error),
              failedAt: expect.any(Number),
              authorId,
            },
          },
        ]
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

  test('The Actions: FETCH_AUTHOR_COLLECTION_REQUEST && FETCH_AUTHOR_COLLECTION_SUCCESS', () => {
    nock('http://localhost:8080')
      .get('/v1/search/posts')
      .query(searchParas)
      .reply(200, mockResponse)

    const store = mockStore(mockDefaultState)

    return store
      .dispatch(actions.fetchAuthorCollectionIfNeeded(authorId))
      .then(() => {
        const expected = [
          {
            type: actionTypes.FETCH_AUTHOR_COLLECTION_REQUEST,
            payload: {
              authorId,
            },
          },
          {
            type: actionTypes.FETCH_AUTHOR_COLLECTION_SUCCESS,
            payload: {
              normalizedData: items,
              authorId,
              currentPage: 0,
              totalPages: 28,
              totalResults: 145,
              receivedAt: expect.any(Number),
            },
          },
        ]
        expect(store.getActions()[0]).toEqual(expected[0])
        expect(store.getActions()[1]).toEqual(expected[1])
      })
  })

  test('The Actions: dataAlreadyExists', () => {
    nock('http://localhost:8080')
      .get('/v1/search/posts')
      .query(searchParas)
      .reply(200, mockResponse)

    const store = mockStore({
      articlesByAuthor: {
        [authorId]: {
          hasMore: false,
          isFetching: false,
        },
      },
    })

    return store
      .dispatch(actions.fetchAuthorCollectionIfNeeded(authorId))
      .then(() => {
        const expected = [
          {
            type: actionTypes.dataAlreadyExists,
            payload: {
              function: actions.fetchAuthorCollectionIfNeeded.name,
              arguments: {
                authorId,
              },
              message: expect.any(String),
            },
          },
        ]
        expect(store.getActions()[0]).toEqual(expected[0])
      })
  })
})
