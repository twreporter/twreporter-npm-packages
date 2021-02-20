/* global expect, test, describe */
import reducer from '../entities-for-authors'
import { mockActions, mockStates } from './mocks/entities-for-authors'

describe('Entities For Authors Reducer Testing', () => {
  describe('The Action: undefinied || Initialize App', () => {
    test('should return the initial state when previous state is undefined', () => {
      const initialState = mockStates.InitialState
      expect(reducer(undefined, {})).toEqual(initialState)
    })
    test('should return the previous state when previous state exist', () => {
      const preState = mockStates.PrevState
      const expectedState = mockStates.PrevState
      expect(reducer(preState, {})).toEqual(expectedState)
    })
  })
  describe('fetch author collections', () => {
    describe('The Action: FETCH_AUTHOR_COLLECTION_SUCCESS', () => {
      describe('Previous State: Initial State.', () => {
        test('should return expected state when previous state is initial state', () => {
          const initialState = mockStates.InitialState
          const expectedState =
            mockStates.ExpectedStateSuccessWithFetchAuthorCollection
          expect(
            reducer(initialState, mockActions.FETCH_AUTHOR_COLLECTION_SUCCESS)
          ).toEqual(expectedState)
        })
      })
      describe('Previous State: Exist. Two Cases: `Same Author` and `Different Author`', () => {
        test('should return expected state when previous state exist in case `Same Author`', () => {
          const preState =
            mockStates.ExpectedStateSuccessWithFetchAuthorCollection
          const expectedState =
            mockStates.ExpectedStateSuccessWithFetchAuthorCollectionsMore
          const theMockAction =
            mockActions.fetchSameAuthorCollectionTwiceSuccess
          expect(reducer(preState, theMockAction)).toEqual(expectedState)
        })
        test('should return expected state when previous state exist in case `Different Author`', () => {
          const preState =
            mockStates.ExpectedStateSuccessWithFetchAuthorCollection
          const expectedState =
            mockStates.ExpectedStateSuccessWithFetchAuthorCollection
          const theMockAction =
            mockActions.fetchDifferentAuthorCollectionSameArticlesSuccess
          expect(reducer(preState, theMockAction)).toEqual(expectedState)
        })
      })
    })
    describe('The Action: FETCH_AUTHOR_COLLECTION_FAILURE', () => {
      test('should return expected state when previous state exist', () => {
        const preState =
          mockStates.ExpectedStateSuccessWithFetchAuthorCollection
        const expectedState =
          mockStates.ExpectedStateSuccessWithFetchAuthorCollection
        expect(
          reducer(preState, mockActions.FETCH_AUTHOR_COLLECTION_FAILURE)
        ).toEqual(expectedState)
      })
    })
  })

  describe('list all authors', () => {
    describe('The Action: LIST_ALL_AUTHORS_SUCCESS', () => {
      describe('Previous State: Initial State.', () => {
        test('should return expected state when previous state is initial state', () => {
          const initialState = mockStates.InitialState
          const expectedState = mockStates.ExpectedStateSuccessWithFetchAuthors
          expect(
            reducer(initialState, mockActions.LIST_ALL_AUTHORS_SUCCESS)
          ).toEqual(expectedState)
        })
      })
      describe('Previous State: Exist.', () => {
        test('should return expected state when previous state exist', () => {
          const prevState = mockStates.ExpectedStateSuccessWithFetchAuthors
          const expectedState =
            mockStates.ExpectedStateSuccessWithFetchMoreAuthors
          expect(reducer(prevState, mockActions.fetchMoreAuthors)).toEqual(
            expectedState
          )
        })
      })
    })
    describe('The Action: LIST_ALL_AUTHORS_FAILURE', () => {
      test('should return expected state when previous state is initial state', () => {
        const initialState = mockStates.InitialState
        const expectedState = mockStates.InitialState
        expect(
          reducer(initialState, mockActions.FETCH_AUTHOR_COLLECTION_FAILURE)
        ).toEqual(expectedState)
      })
      test('should return expected state when previous state exist', () => {
        const preState =
          mockStates.ExpectedStateSuccessWithFetchAuthorCollection
        const expectedState =
          mockStates.ExpectedStateSuccessWithFetchAuthorCollection
        expect(
          reducer(preState, mockActions.FETCH_AUTHOR_COLLECTION_FAILURE)
        ).toEqual(expectedState)
      })
    })
  })

  describe('search specific authors', () => {
    describe('The Action: SEARCH_AUTHORS_SUCCESS', () => {
      test('should return expected state when previous state is initialState', () => {
        const initialState = mockStates.InitialState
        const expectedState =
          mockStates.ExpectedStateSuccessWithSearchSpecificAuthor
        expect(
          reducer(initialState, mockActions.SEARCH_AUTHORS_SUCCESS)
        ).toEqual(expectedState)
      })
      test('should return expected state when previous state exist', () => {
        const preState = mockStates.ExpectedStateSuccessWithFetchAuthors
        const expectedState =
          mockStates.ExpectedStateSuccessWithSpecificAuthorAppended
        expect(reducer(preState, mockActions.SEARCH_AUTHORS_SUCCESS)).toEqual(
          expectedState
        )
      })
    })

    describe('The Action: SEARCH_AUTHORS_FAILURE', () => {
      test('should return expected state when previous state exist', () => {
        const preState = mockStates.ExpectedStateSuccessWithFetchAuthors
        const expectedState = mockStates.ExpectedStateSuccessWithFetchAuthors
        expect(reducer(preState, mockActions.SEARCH_AUTHORS_FAILURE)).toEqual(
          expectedState
        )
      })
    })
  })
})
