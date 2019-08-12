/* global expect, test, describe, afterEach */
import * as actions from '../../../src/actions/authors'
import types from '../../constants/action-types'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'

import {
  responseObjSet,
  currentDate,
  mockResponseSet,
  mockDefaultStates,
  mockSearchParasSet,
  constKeywords,
} from './mocks/authors.js'

import { NUMBER_OF_FIRST_RESPONSE_PAGE } from '../../constants/authors-list'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

process.env.NODE_ENV = 'development'

function checker({
  mockDefaultState,
  keywords,
  mockResponse,
  typeReq,
  typeSuc,
}) {
  const store = mockStore(mockDefaultState)
  return store.dispatch(actions.searchAuthorsIfNeeded(keywords)).then(() => {
    const actionReq = store.getActions()[0]
    const actionSuc = store.getActions()[1]

    const expectedActions = [
      {
        type: typeReq,
        keywords,
      },
      {
        type: typeSuc,
        keywords,
        normalizedData: mockResponse.normalizedData,
        totalPages: mockResponse.totalPages,
        currentPage: mockResponse.currentPage,
        receivedAt: currentDate,
      },
    ]

    expect(actionReq).toEqual(expectedActions[0])
    expect(actionSuc).toEqual(expect.arrayContaining(expectedActions[1]))
    expect(expectedActions[1]).toEqual(expect.arrayContaining(actionSuc))
    expect(actionSuc.type).toEqual(expectedActions[1].type)
    expect(actionSuc.keywords).toEqual(expectedActions[1].keywords)
    expect(actionSuc.normalizedData).toEqual(expectedActions[1].normalizedData)
    expect(typeof actionSuc.receivedAt).toBe('number')
  })
}

const failChecker = ({
  mockDefaultState,
  keywords,
  typeReq,
  typeFail,
  error,
}) => {
  const store = mockStore(mockDefaultState)
  return store.dispatch(actions.searchAuthorsIfNeeded(keywords)).then(() => {
    const actionReq = store.getActions()[0]
    const actionFail = store.getActions()[1]
    const expectedActions = [
      {
        type: typeReq,
        keywords,
      },
      {
        type: typeFail,
        error,
        failedAt: Date.now(),
      },
    ]

    expect(actionReq).toEqual(expectedActions[0])
    expect(actionFail).toEqual(expect.arrayContaining(expectedActions[1]))
    expect(expectedActions[1]).toEqual(expect.arrayContaining(actionFail))
    expect(actionFail.type).toEqual(expectedActions[1].type)
    expect(typeof actionFail.failedAt).toBe('number')
    expect(actionFail.error.code).toBe(true)
  })
}

describe('Two main situations in authors.js file: 1) Keywords is null and list all authors 2) Keywords has value and search specific author', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('Keywords == null', () => {
    describe('Fetch authors list successfully', () => {
      describe('Load First Page of the authors list', () => {
        test('Actual actions should be same as expected actions', () => {
          const keywords = ''
          const mockDefaultState = mockDefaultStates.initialState
          const searchParas = {
            ...mockSearchParasSet.keyNullSearchParas,
            page: NUMBER_OF_FIRST_RESPONSE_PAGE,
          }
          const mockResponse = mockResponseSet.keyNullResponse
          nock('http://localhost:8080')
            .get('/v1/search/authors')
            .query(searchParas)
            .reply(200, responseObjSet.keyNullResponse)

          const checkerParas = {
            mockDefaultState,
            keywords,
            mockResponse,
            typeReq: types.LIST_ALL_AUTHORS_REQUEST,
            typeSuc: types.LIST_ALL_AUTHORS_SUCCESS,
          }
          return checker(checkerParas)
        })
      })

      describe('After loaded first page, now we want to load more', () => {
        test('Actual actions should be same as expected actions', () => {
          const keywords = ''
          const mockDefaultState = mockDefaultStates.afterFirstPageState
          const searchParas = {
            ...mockSearchParasSet.keyNullSearchParas,
            page: mockDefaultState.authorsList.currentPage + 1,
          }
          const mockResponse = mockResponseSet.keyNullResponse
          nock('http://localhost:8080')
            .get('/v1/search/authors')
            .query(searchParas)
            .reply(200, responseObjSet.keyNullResponse)

          const checkerParas = {
            mockDefaultState,
            keywords,
            mockResponse,
            typeReq: types.LIST_ALL_AUTHORS_REQUEST,
            typeSuc: types.LIST_ALL_AUTHORS_SUCCESS,
          }
          return checker(checkerParas)
        })
      })

      describe('Want to load more pages but Algolia has no more', () => {
        test('should handle the resolved promise (the running tset should be finished)', () => {
          const keywords = ''
          const mockDefaultState = mockDefaultStates.gotNothing
          const store = mockStore(mockDefaultState)
          return store
            .dispatch(actions.searchAuthorsIfNeeded(keywords))
            .then(val => {
              expect(val).toBe('Promise Resolved')
            })
        })
      })
    })
    describe('Fetch authors list unsuccessfully', () => {
      test('Actual actions should be same as expected actions', () => {
        const keywords = ''
        const mockDefaultState = mockDefaultStates.initialState
        const searchParas = {
          ...mockSearchParasSet.keyNullSearchParas,
          page: NUMBER_OF_FIRST_RESPONSE_PAGE,
        }
        nock('http://localhost:8080')
          .get('/v1/search/authors')
          .query(searchParas)
          .replyWithError({
            message: 'this is error message for testing',
            code: true,
          })

        const checkerParas = {
          mockDefaultState,
          keywords,
          typeReq: types.LIST_ALL_AUTHORS_REQUEST,
          typeFail: types.LIST_ALL_AUTHORS_FAILURE,
          error: true,
        }
        return failChecker(checkerParas)
      })
    })
  })

  describe('Keywords != null ', () => {
    describe('Fetch specific author successfully', () => {
      describe('keywords are new', () => {
        test('Actual actions should be same as expected actions', () => {
          const keywords = constKeywords
          const mockDefaultState = mockDefaultStates.hasNoPreviousKeywords
          const searchParas = {
            ...mockSearchParasSet.keyWithValueParas,
            page: NUMBER_OF_FIRST_RESPONSE_PAGE,
          }
          const mockResponse = mockResponseSet.keyWithValueResponse
          // console.log(searchParas)
          nock('http://localhost:8080')
            .get('/v1/search/authors')
            .query(searchParas)
            .reply(200, responseObjSet.keyWithVlaueResponse)

          const checkerParas = {
            mockDefaultState,
            keywords,
            mockResponse,
            typeReq: types.SEARCH_AUTHORS_REQUEST,
            typeSuc: types.SEARCH_AUTHORS_SUCCESS,
          }
          return checker(checkerParas)
        })
      })

      describe('keywords are same', () => {
        test('should handle the resolved promise (the running tset should be finished)', () => {
          const keywords = constKeywords
          const mockDefaultState = mockDefaultStates.hasPreviousKeywords
          const store = mockStore(mockDefaultState)
          return store
            .dispatch(actions.searchAuthorsIfNeeded(keywords))
            .then(val => {
              expect(val).toBe('Promise Resolved')
            })
        })
      })
    })

    describe('Fetch specific author unsuccessfully', () => {
      test('Actual actions should be same as expected actions', () => {
        const keywords = constKeywords
        const mockDefaultState = mockDefaultStates.hasNoPreviousKeywords
        const searchParas = {
          ...mockSearchParasSet.keyWithValueParas,
          page: NUMBER_OF_FIRST_RESPONSE_PAGE,
        }
        nock('http://localhost:8080')
          .get('/v1/search/authors')
          .query(searchParas)
          .replyWithError({
            message: 'this is error message for testing',
            code: true,
          })

        const checkerParas = {
          mockDefaultState,
          keywords,
          typeReq: types.SEARCH_AUTHORS_REQUEST,
          typeFail: types.SEARCH_AUTHORS_FAILURE,
          error: true,
        }
        return failChecker(checkerParas)
      })
    })
  })

  describe('Server error 404', () => {
    test('Actual actions should be same as expected actions', () => {
      const keywords = ''
      const mockDefaultState = mockDefaultStates.initialState
      const searchParas = {
        ...mockSearchParasSet.keyNullSearchParas,
        page: NUMBER_OF_FIRST_RESPONSE_PAGE,
      }
      nock('http://localhost:8080')
        .get('/v1/search/authors')
        .query(searchParas)
        .reply(404)

      const store = mockStore(mockDefaultState)
      return store
        .dispatch(actions.searchAuthorsIfNeeded(keywords))
        .then(() => {
          const actionReq = store.getActions()[0]
          const actionFail = store.getActions()[1]
          const expectedActions = [
            {
              type: types.LIST_ALL_AUTHORS_REQUEST,
              keywords,
            },
            {
              type: types.LIST_ALL_AUTHORS_FAILURE,
              error: Error,
              failedAt: Date.now(),
            },
          ]

          expect(actionReq).toEqual(expectedActions[0])
          expect(actionFail).toEqual(expect.arrayContaining(expectedActions[1]))
          expect(expectedActions[1]).toEqual(expect.arrayContaining(actionFail))
          expect(actionFail.type).toEqual(expectedActions[1].type)
          expect(typeof actionFail.failedAt).toBe('number')
          expect(actionFail.error).toBeInstanceOf(expectedActions[1].error)
        })
    })
  })
})
