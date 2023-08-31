/* global expect, test, describe */
import UserReducer from '../user'
import actionTypes from '../../constants/action-types'

import { mockActions, mockStates } from './mocks/user'

const { user: UserAction } = actionTypes

describe('User Reducer Testing', () => {
  describe('The Action: undefinied || Initialize App', () => {
    test('should return the initial state when previous state is undefined', () => {
      const initialState = mockStates.InitialState
      expect(UserReducer(undefined, {})).toEqual(initialState)
    })
    test('should return the previous state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateSucwithInit
      expect(UserReducer(preState, {})).toEqual(expectedState)
    })
  })

  describe(`The Action: ${UserAction.read.failure}`, () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateFailwithInit
      expect(
        UserReducer(initialState, mockActions[UserAction.read.failure])
      ).toEqual(expectedState)
    })
    test('should return expected state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateFailwithPre
      expect(
        UserReducer(preState, mockActions[UserAction.read.failure])
      ).toEqual(expectedState)
    })
  })

  describe(`The Action: ${UserAction.update.failure}`, () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateFailwithInit
      expect(
        UserReducer(initialState, mockActions[UserAction.update.failure])
      ).toEqual(expectedState)
    })
    test('should return expected state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateFailwithPre
      expect(
        UserReducer(preState, mockActions[UserAction.update.failure])
      ).toEqual(expectedState)
    })
  })

  describe(`The Action: ${UserAction.read.request}`, () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateReqwithInit
      expect(
        UserReducer(initialState, mockActions[UserAction.read.request])
      ).toEqual(expectedState)
    })
    test('should return the expected state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateReqwithPre
      expect(
        UserReducer(preState, mockActions[UserAction.read.request])
      ).toEqual(expectedState)
    })
  })

  describe(`The Action: ${UserAction.update.request}`, () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateReqwithInit
      expect(
        UserReducer(initialState, mockActions[UserAction.update.request])
      ).toEqual(expectedState)
    })
    test('should return the expected state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateReqwithPre
      expect(
        UserReducer(preState, mockActions[UserAction.update.request])
      ).toEqual(expectedState)
    })
  })

  describe(`The Action: ${UserAction.read.success}`, () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateSucAfterGetUser
      expect(
        UserReducer(initialState, mockActions[UserAction.read.success])
      ).toEqual(expectedState)
    })
    test('should return expected state when previous when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateSucAfterGetUser
      expect(
        UserReducer(preState, mockActions[UserAction.read.success])
      ).toEqual(expectedState)
    })
  })

  describe(`The Action: ${UserAction.update.success}`, () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateSucPreIsInitAfterSetUser
      expect(
        UserReducer(initialState, mockActions[UserAction.update.success])
      ).toEqual(expectedState)
    })
    test('should return expected state when previous when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateSucPreIsExistAfterSetUser
      expect(
        UserReducer(preState, mockActions[UserAction.update.success])
      ).toEqual(expectedState)
    })
  })
})
