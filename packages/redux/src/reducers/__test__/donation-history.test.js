/* global expect, test, describe */
import DontaionHistoryReducer from '../donation-history'
import actionTypes from '../../constants/action-types'

import { mockActions, mockStates } from './mocks/donation-history'

const { donationHistory: DontaionHistoryAction } = actionTypes

describe('Donation History Reducer Testing', () => {
  test('should return the initial state', () => {
    const initialState = mockStates.InitialState
    const action = { type: 'UNKNOWN_ACTION' }
    const newState = DontaionHistoryReducer(undefined, action)

    expect(newState).toEqual(initialState)
  })

  test(`should handle ${DontaionHistoryAction.read.request}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[DontaionHistoryAction.read.request]
    const newState = DontaionHistoryReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateReq)
  })

  test(`should handle ${DontaionHistoryAction.read.success}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[DontaionHistoryAction.read.success]
    const newState = DontaionHistoryReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateSuc)
  })

  test(`should handle ${DontaionHistoryAction.read.failure}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[DontaionHistoryAction.read.failure]
    const newState = DontaionHistoryReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateFail)
  })
})
