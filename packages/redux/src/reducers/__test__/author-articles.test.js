/* global expect, test, describe */
import { articlesByAuthor as reducer } from '../author-articles'
import {
  mockActions,
  mockStates,
  FETCH_SEC_AUTHOR_COLLECTION_SUCCESS,
  FETCH_FIRST_AUTHOR_SEC_TIMES,
} from './mocks/author-articles'
// lodash
import omit from 'lodash/omit'
import merge from 'lodash/merge'

const _ = { omit, merge }

describe('Author Reducer Testing', () => {
  describe('The Action: undefinied || Initialize App', () => {
    test('should return the initial state when previous state is undefined', () => {
      const initialState = mockStates.InitialState
      expect(reducer(undefined, {})).toEqual(initialState)
    })
    test('should return the previous state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateSucwithInit
      expect(reducer(preState, {})).toEqual(expectedState)
    })
  })

  describe('The Action: FETCH_AUTHOR_COLLECTION_REQUEST', () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateReqwithInit
      expect(
        reducer(initialState, mockActions.FETCH_AUTHOR_COLLECTION_REQUEST)
      ).toEqual(expectedState)
    })
    test('should return the expected state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateReqwithPre
      expect(
        reducer(preState, mockActions.FETCH_AUTHOR_COLLECTION_REQUEST)
      ).toEqual(expectedState)
    })
  })

  describe('The Action: FETCH_AUTHOR_COLLECTION_SUCCESS', () => {
    describe('Previous State: Initial State. One Case', () => {
      test('should return expected state when previous state is initial state', () => {
        const initialState = mockStates.InitialState
        const expectedState = mockStates.ExpStateSucwithInit
        expect(
          reducer(initialState, mockActions.FETCH_AUTHOR_COLLECTION_SUCCESS)
        ).toEqual(expectedState)
      })
    })
    describe('Previous State: Exist. Two Cases: Same Author || Different Authors', () => {
      test('should return expected state when previous state exist and on condition SAME', () => {
        const preState = mockStates.ExpStateSucwithInit
        const expectedState = mockStates.ExpStateSucwithPreSame
        const theMockAction = _.merge(
          mockActions.FETCH_AUTHOR_COLLECTION_SUCCESS,
          FETCH_FIRST_AUTHOR_SEC_TIMES
        )
        expect(reducer(preState, theMockAction)).toEqual(expectedState)
      })
      test('should return expected state when previous state exist and on condition Diff', () => {
        const preState = mockStates.ExpStateSucwithInit
        const expectedState = mockStates.ExpStateSucwithPreDiff
        const theMockAction = _.merge(
          mockActions.FETCH_AUTHOR_COLLECTION_SUCCESS,
          FETCH_SEC_AUTHOR_COLLECTION_SUCCESS
        )
        expect(reducer(preState, theMockAction)).toEqual(expectedState)
      })
    })
  })

  describe('The Action: FETCH_AUTHOR_COLLECTION_FAILURE', () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateFailwithInit
      expect(
        reducer(initialState, mockActions.FETCH_AUTHOR_COLLECTION_FAILURE)
      ).toEqual(expectedState)
    })
    test('should return expected state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateFailwithPre
      expect(
        reducer(preState, mockActions.FETCH_AUTHOR_COLLECTION_FAILURE)
      ).toEqual(expectedState)
    })
  })
})
