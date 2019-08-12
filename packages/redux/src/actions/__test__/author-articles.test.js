/* global expect, test, describe, afterEach */
import { MAX_ARTICLES_PER_FETCH } from '../../constants/author-page'
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
  author: {},
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

const failChecker = (store, error) => {
  const actionReq = store.getActions()[0]
  const actionFail = store.getActions()[1]
  const expectedActions = [
    {
      type: actionTypes.FETCH_AUTHOR_COLLECTION_REQUEST,
      authorId,
    },
    {
      type: actionTypes.FETCH_AUTHOR_COLLECTION_FAILURE,
      error: {},
      failedAt: {},
      authorId,
    },
  ]
  expect(actionReq).toEqual(expectedActions[0])
  expect(actionFail).toEqual(expect.arrayContaining(expectedActions[1]))
  expect(expectedActions[1]).toEqual(expect.arrayContaining(actionFail))
  expect(actionFail.type).toEqual(expectedActions[1].type)
  expect(typeof actionFail.failedAt).toBe('number')
  expect(actionFail.error).toBeInstanceOf(error)
}

describe('Atuhor Action Testing', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('API server response Error directly: web status code is greater than 400', () => {
    nock('http://localhost:8080')
      .get('/v1/search/posts')
      .query(searchParas)
      .reply(404, mockResponse)

    const store = mockStore(mockDefaultState)
    return store
      .dispatch(actions.fetchAuthorCollectionIfNeeded(authorId))
      .then(() => {
        failChecker(store, Error)
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
        const actionReq = store.getActions()[0]
        const actionSuc = store.getActions()[1]
        const expectedActions = [
          {
            type: actionTypes.FETCH_AUTHOR_COLLECTION_REQUEST,
            authorId,
          },
          {
            type: actionTypes.FETCH_AUTHOR_COLLECTION_SUCCESS,
            normalizedData: items,
            authorId,
            currentPage: 0,
            totalPages: 28,
            totalResults: 145,
            receivedAt: Date.now(),
          },
        ]
        expect(actionReq).toEqual(expectedActions[0])
        expect(actionSuc).toEqual(expect.arrayContaining(expectedActions[1]))
        expect(expectedActions[1]).toEqual(expect.arrayContaining(actionSuc))
        expect(actionSuc.type).toEqual(expectedActions[1].type)
        expect(actionSuc.normalizedData).toEqual(
          expectedActions[1].normalizedData
        )
        expect(actionSuc.authorId).toEqual(expectedActions[1].authorId)
        expect(actionSuc.currentPage).toEqual(expectedActions[1].currentPage)
        expect(actionSuc.totalPages).toEqual(expectedActions[1].totalPages)
        expect(actionSuc.totalResults).toEqual(expectedActions[1].totalResults)
        expect(typeof actionSuc.receivedAt).toBe('number')
      })
  })

  test('The Actions: FETCH_AUTHOR_COLLECTION_REQUEST && FETCH_AUTHOR_COLLECTION_FAILURE', () => {
    nock('http://localhost:8080')
      .get('/v1/search/posts')
      .query(searchParas)
      .replyWithError('this is error message')

    const store = mockStore(mockDefaultState)

    return store
      .dispatch(actions.fetchAuthorCollectionIfNeeded(authorId))
      .then(() => {
        failChecker(store, Error)
      })
  })
})
