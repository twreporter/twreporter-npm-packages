/* global expect, test, describe */
'use strict'
import {
  authorsList as reducer,
  searchedAuthorsList as searchedReducer,
} from '../authors'
// import * as types from '../../../src/constants/action-types'
import {
  mockStatesSet,
  mockActionsSet,
  searchedMockStatesSet,
  MOCK_KEYWORDS,
} from './mocks/authors'

describe('Authors Reducer Testing', () => {
  describe('authors list page and load more', () => {
    describe('The Action: undefinied || Initialize App', () => {
      test('should return the initial state when previous state is undefined', () => {
        const initialState = mockStatesSet.initialState
        expect(reducer(undefined, {})).toEqual(initialState)
      })
      test('should return the previous state when previous state exist', () => {
        const expectedState = mockStatesSet.expStateSucwithInit
        expect(reducer(mockStatesSet.expStateSucwithInit, {})).toEqual(
          expectedState
        )
      })
    })

    describe('The Action: LIST_ALL_AUTHORS_REQUEST', () => {
      test('should return expected state when previous state is initial state', () => {
        const initialState = mockStatesSet.initialState
        const expectedState = {
          ...mockStatesSet.initialState,
          isFetching: true,
        }
        expect(
          reducer(initialState, mockActionsSet.LIST_ALL_AUTHORS_REQUEST)
        ).toEqual(expectedState)
      })
      test('should return the expected state when previous state exist', () => {
        const preState = mockStatesSet.expStateSucwithInit
        const expectedState = {
          ...mockStatesSet.expStateSucwithInit,
          isFetching: true,
        }
        expect(
          reducer(preState, mockActionsSet.LIST_ALL_AUTHORS_REQUEST)
        ).toEqual(expectedState)
      })
    })

    describe('The Action: LIST_ALL_AUTHORS_SUCCESS', () => {
      test('should return expected state when previous state is initialState', () => {
        const initialState = { ...mockStatesSet.initialState, isFetching: true }
        const expectedState = mockStatesSet.expStateSucwithInit
        expect(
          reducer(initialState, mockActionsSet.LIST_ALL_AUTHORS_SUCCESS)
        ).toEqual(expectedState)
      })
      test('should return expected state when previous state exist', () => {
        const preState = {
          ...mockStatesSet.expStateSucwithInit,
          isFetching: true,
        }
        const expectedState = mockStatesSet.expStateSucwithPre
        expect(
          reducer(preState, { ...mockActionsSet.LIST_ALL_AUTHORS_SUCCESS })
        ).toEqual(expectedState)
      })
    })

    describe('The Action: LIST_ALL_AUTHORS_FAILURE', () => {
      test('should return expected state when previous state is initial state', () => {
        const initialState = { ...mockStatesSet.initialState, isFetching: true }
        const expectedState = mockStatesSet.expStateFailwithInit
        expect(
          reducer(initialState, mockActionsSet.LIST_ALL_AUTHORS_FAILURE)
        ).toEqual(expectedState)
      })
      test('should return expected state when previous state exist', () => {
        const preState = {
          ...mockStatesSet.expStateSucwithInit,
          isFetching: true,
        }
        const expectedState = mockStatesSet.expStateFailwithPre
        expect(
          reducer(preState, mockActionsSet.LIST_ALL_AUTHORS_FAILURE)
        ).toEqual(expectedState)
      })
    })
  })

  describe('search specific author', () => {
    describe('The Action: undefinied || Initialize App', () => {
      test('should return the initial state when previous state is undefined', () => {
        const initialState = searchedMockStatesSet.initialState
        expect(searchedReducer(undefined, {})).toEqual(initialState)
      })
      test('should return the previous state when previous state exist', () => {
        const expectedState = searchedMockStatesSet.expStateSuc
        expect(searchedReducer(searchedMockStatesSet.expStateSuc, {})).toEqual(
          expectedState
        )
      })
    })

    describe('The Action: SEARCH_AUTHORS_REQUEST', () => {
      test('should return expected state when previous state is initial state', () => {
        const initialState = {}
        const expectedState = {
          ...searchedMockStatesSet.initialState,
          isFetching: true,
          keywords: MOCK_KEYWORDS,
        }
        expect(
          searchedReducer(initialState, mockActionsSet.SEARCH_AUTHORS_REQUEST)
        ).toEqual(expectedState)
      })
      test('should return the expected state when previous state exist', () => {
        const preState = searchedMockStatesSet.expStateSucwithInit
        const expectedState = {
          ...searchedMockStatesSet.initialState,
          isFetching: true,
          keywords: MOCK_KEYWORDS,
        }
        expect(
          searchedReducer(preState, mockActionsSet.SEARCH_AUTHORS_REQUEST)
        ).toEqual(expectedState)
      })
    })

    describe('The Action: SEARCH_AUTHORS_SUCCESS', () => {
      test('should return expected state when previous state is initialState', () => {
        const initialState = {
          ...searchedMockStatesSet.initialState,
          isFetching: true,
          keywords: MOCK_KEYWORDS,
        }
        const expectedState = searchedMockStatesSet.expStateSuc
        expect(
          searchedReducer(initialState, mockActionsSet.SEARCH_AUTHORS_SUCCESS)
        ).toEqual(expectedState)
      })
      test('should return expected state when previous state exist, but pre state will be replaced by init state added with new keywords and isFetching', () => {
        const preState = {
          ...searchedMockStatesSet.initialState,
          isFetching: true,
          keywords: MOCK_KEYWORDS,
        }
        const expectedState = searchedMockStatesSet.expStateSuc
        expect(
          searchedReducer(preState, mockActionsSet.SEARCH_AUTHORS_SUCCESS)
        ).toEqual(expectedState)
      })
    })

    describe('The Action: SEARCH_AUTHORS_FAILURE', () => {
      test('should return expected state when previous state is initial state', () => {
        const initialState = {
          ...searchedMockStatesSet.initialState,
          isFetching: true,
          keywords: MOCK_KEYWORDS,
        }
        const expectedState = searchedMockStatesSet.expStateFail
        expect(
          searchedReducer(initialState, mockActionsSet.SEARCH_AUTHORS_FAILURE)
        ).toEqual(expectedState)
      })
      test('should return expected state when previous state exist, but pre state will be replaced by init state added with new keywords and isFetching', () => {
        const preState = {
          ...searchedMockStatesSet.initialState,
          isFetching: true,
          keywords: MOCK_KEYWORDS,
        }
        const expectedState = searchedMockStatesSet.expStateFail
        expect(
          searchedReducer(preState, mockActionsSet.SEARCH_AUTHORS_FAILURE)
        ).toEqual(expectedState)
      })
    })
  })
})
