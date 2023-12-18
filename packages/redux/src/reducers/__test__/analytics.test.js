/* global expect, test, describe */
import AnalyticsReducer from '../analytics'
import actionTypes from '../../constants/action-types'

import { mockActions, mockStates } from './mocks/analytics'

const { analytics: AnalyticsAction } = actionTypes

describe('Analytics Reducer Testing', () => {
  describe(`The Action: ${AnalyticsAction.update.failure}`, () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateFailwithInit
      expect(
        AnalyticsReducer(
          initialState,
          mockActions[AnalyticsAction.update.failure]
        )
      ).toEqual(expectedState)
    })
    test('should return expected state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateFailwithPre
      expect(
        AnalyticsReducer(preState, mockActions[AnalyticsAction.update.failure])
      ).toEqual(expectedState)
    })
  })

  describe(`The Action: ${AnalyticsAction.update.request}`, () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateReqwithInit
      expect(
        AnalyticsReducer(
          initialState,
          mockActions[AnalyticsAction.update.request]
        )
      ).toEqual(expectedState)
    })
    test('should return the expected state when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateReqwithPre
      expect(
        AnalyticsReducer(preState, mockActions[AnalyticsAction.update.request])
      ).toEqual(expectedState)
    })
  })

  describe(`The Action: ${AnalyticsAction.update.success}`, () => {
    test('should return expected state when previous state is initial state', () => {
      const initialState = mockStates.InitialState
      const expectedState = mockStates.ExpStateSucPreIsInit
      expect(
        AnalyticsReducer(
          initialState,
          mockActions[AnalyticsAction.update.success]
        )
      ).toEqual(expectedState)
    })
    test('should return expected state when previous when previous state exist', () => {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateSucPreIsExist
      expect(
        AnalyticsReducer(preState, mockActions[AnalyticsAction.update.success])
      ).toEqual(expectedState)
    })
  })
})
