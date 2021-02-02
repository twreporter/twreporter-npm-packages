/* global expect, test, describe, afterEach */
import * as actions from '../../../src/actions/authors'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import stateFieldNames from '../../constants/redux-state-field-names'
import thunk from 'redux-thunk'
import types from '../../constants/action-types'
import { expectActionErrorObj } from './expect-utils'
import {
  responseObjSet,
  mockResponseSet,
  mockDefaultStates,
  mockSearchParasSet,
  constKeywords,
} from './mocks/authors.js'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

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
    const expected = [
      {
        type: typeReq,
        payload: {
          keywords,
        },
      },
      {
        type: typeSuc,
        payload: {
          keywords,
          normalizedData: mockResponse.normalizedData,
          totalPages: mockResponse.totalPages,
          currentPage: mockResponse.currentPage,
          receivedAt: expect.any(Number),
        },
      },
    ]

    expect(store.getActions()[0]).toEqual(expected[0])
    expect(store.getActions()[1]).toEqual(expected[1])
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
          const searchParas = mockSearchParasSet.keyNullSearchParas
          const mockResponse = mockResponseSet.keyNullResponse
          const apiOrigin = _.get(mockDefaultState, [
            stateFieldNames.origins,
            'api',
          ])

          nock(apiOrigin)
            .get(`/v2/authors`)
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
          const { limit } = mockSearchParasSet.keyNullSearchParas
          const searchParas = {
            ...mockSearchParasSet.keyNullSearchParas,
            offset: (mockDefaultState.authorsList.currentPage + 1) * limit,
          }
          const mockResponse = mockResponseSet.keyNullResponse
          const apiOrigin = _.get(mockDefaultState, [
            stateFieldNames.origins,
            'api',
          ])

          nock(apiOrigin)
            .get(`/v2/authors`)
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

      describe('Want to load more pages but it has no more', () => {
        test('should handle the resolved promise (the running test should be finished)', () => {
          const keywords = ''
          const mockDefaultState = mockDefaultStates.gotNothing
          const store = mockStore(mockDefaultState)
          return store
            .dispatch(actions.searchAuthorsIfNeeded(keywords))
            .then(result => {
              const expected = {
                type: types.noMoreItemsToFetch,
                payload: {
                  function: actions.searchAuthorsIfNeeded.name,
                  arguments: {
                    currentKeywords: keywords,
                  },
                  message: expect.any(String),
                },
              }
              expect(store.getActions().length).toBe(1)
              expect(store.getActions()[0]).toEqual(expected)
              expect(result).toEqual(expected)
            })
        })
      })

      describe('Want to load more pages but last request is processing', () => {
        test('should handle the resolved promise (the running test should be finished)', () => {
          const keywords = ''
          const store = mockStore({
            authorsList: {
              isFetching: true,
              hasMore: true,
            },
          })
          return store
            .dispatch(actions.searchAuthorsIfNeeded(keywords))
            .then(result => {
              const expected = {
                type: types.lastActionIsStillProcessing,
                payload: {
                  function: actions.searchAuthorsIfNeeded.name,
                  arguments: {
                    currentKeywords: keywords,
                  },
                  message: expect.any(String),
                },
              }
              expect(store.getActions().length).toBe(1)
              expect(store.getActions()[0]).toEqual(expected)
              expect(result).toEqual(expected)
            })
        })
      })
    })
    describe('Fetch authors list unsuccessfully', () => {
      test('Actual actions should be same as expected actions', () => {
        const keywords = ''
        const mockDefaultState = mockDefaultStates.initialState
        const searchParas = mockSearchParasSet.keyNullSearchParas
        const mockStatusCode = 500
        const mockAPIRes = {
          message: 'Unexpected error.',
          status: 'error',
        }
        const apiOrigin = _.get(mockDefaultState, [
          stateFieldNames.origins,
          'api',
        ])

        nock(apiOrigin)
          .get(`/v2/authors`)
          .query(searchParas)
          .reply(mockStatusCode, mockAPIRes)

        const store = mockStore(mockDefaultState)
        return store
          .dispatch(actions.searchAuthorsIfNeeded(keywords))
          .catch(failAction => {
            const expected = [
              {
                type: types.LIST_ALL_AUTHORS_REQUEST,
                payload: {
                  keywords,
                },
              },
              {
                type: types.LIST_ALL_AUTHORS_FAILURE,
                payload: {
                  error: expect.any(Error),
                  failedAt: expect.any(Number),
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
    })
  })

  describe('Keywords != null ', () => {
    describe('Fetch specific author successfully', () => {
      describe('keywords are new', () => {
        test('Actual actions should be same as expected actions', () => {
          const keywords = constKeywords
          const mockDefaultState = mockDefaultStates.hasNoPreviousKeywords
          const searchParas = mockSearchParasSet.keyWithValueParas
          const mockResponse = mockResponseSet.keyWithValueResponse

          const apiOrigin = _.get(mockDefaultState, [
            stateFieldNames.origins,
            'api',
          ])
          nock(apiOrigin)
            .get(`/v2/authors`)
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
        test('should handle the resolved promise (the running test should be finished)', () => {
          const keywords = constKeywords
          const mockDefaultState = mockDefaultStates.hasPreviousKeywords
          const store = mockStore(mockDefaultState)
          return store
            .dispatch(actions.searchAuthorsIfNeeded(keywords))
            .then(result => {
              const expected = {
                type: types.dataAlreadyExists,
                payload: {
                  function: actions.searchAuthorsIfNeeded.name,
                  arguments: {
                    currentKeywords: keywords,
                  },
                  message: expect.any(String),
                },
              }
              expect(store.getActions().length).toBe(1)
              expect(store.getActions()[0]).toEqual(expected)
              expect(result).toEqual(expected)
            })
        })
      })
    })

    describe('Fetch specific author unsuccessfully', () => {
      test('Actual actions should be same as expected actions', () => {
        const keywords = constKeywords
        const mockDefaultState = mockDefaultStates.hasNoPreviousKeywords
        const searchParas = mockSearchParasSet.keyWithValueParas
        const mockStatusCode = 500
        const mockAPIRes = {
          message: 'Unexpected error.',
          status: 'error',
        }
        const apiOrigin = _.get(mockDefaultState, [
          stateFieldNames.origins,
          'api',
        ])
        nock(apiOrigin)
          .get(`/v2/authors`)
          .query(searchParas)
          .reply(mockStatusCode, mockAPIRes)

        const store = mockStore(mockDefaultState)
        return store
          .dispatch(actions.searchAuthorsIfNeeded(keywords))
          .catch(failAction => {
            const expected = [
              {
                type: types.SEARCH_AUTHORS_REQUEST,
                payload: {
                  keywords,
                },
              },
              {
                type: types.SEARCH_AUTHORS_FAILURE,
                payload: {
                  error: expect.any(Error),
                  failedAt: expect.any(Number),
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
    })
  })

  describe('Server returns 204 no content', () => {
    test('Actual actions should be same as expected actions', () => {
      const keywords = ''
      const mockDefaultState = mockDefaultStates.initialState
      const searchParas = mockSearchParasSet.keyNullSearchParas
      const mockStatusCode = 204
      const mockAPIRes = null

      const apiOrigin = _.get(mockDefaultState, [
        stateFieldNames.origins,
        'api',
      ])
      nock(apiOrigin)
        .get(`/v2/authors`)
        .query(searchParas)
        .reply(mockStatusCode, mockAPIRes)

      const store = mockStore(mockDefaultState)
      return store
        .dispatch(actions.searchAuthorsIfNeeded(keywords))
        .catch(failAction => {
          const expected = [
            {
              type: types.LIST_ALL_AUTHORS_REQUEST,
              payload: {
                keywords,
              },
            },
            {
              type: types.LIST_ALL_AUTHORS_FAILURE,
              payload: {
                error: expect.any(Error),
                failedAt: expect.any(Number),
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
  })
})
