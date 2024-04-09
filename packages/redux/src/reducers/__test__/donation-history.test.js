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

  test(`should handle ${DontaionHistoryAction.donationHistory.read.request}`, () => {
    const initialState = mockStates.InitialState
    const action =
      mockActions[DontaionHistoryAction.donationHistory.read.request]
    const newState = DontaionHistoryReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateReq)
  })

  test(`should handle ${DontaionHistoryAction.donationHistory.read.success}`, () => {
    const initialState = mockStates.InitialState
    const action =
      mockActions[DontaionHistoryAction.donationHistory.read.success]
    const newState = DontaionHistoryReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateSuc)
  })

  test(`should handle ${DontaionHistoryAction.donationHistory.read.failure}`, () => {
    const initialState = mockStates.InitialState
    const action =
      mockActions[DontaionHistoryAction.donationHistory.read.failure]
    const newState = DontaionHistoryReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateFail)
  })

  test(`should handle ${DontaionHistoryAction.periodicDonationHistory.read.request}`, () => {
    const initialState = mockStates.InitialStateWithHistory
    const action =
      mockActions[DontaionHistoryAction.periodicDonationHistory.read.request]
    const newState = DontaionHistoryReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateReqWithHistory)
  })

  test(`should handle ${DontaionHistoryAction.periodicDonationHistory.read.success}`, () => {
    const initialState = mockStates.InitialStateWithHistory
    const action =
      mockActions[DontaionHistoryAction.periodicDonationHistory.read.success]
    const newState = DontaionHistoryReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateSucWithPeriodicHistory)
  })

  test(`should handle ${DontaionHistoryAction.periodicDonationHistory.read.failure}`, () => {
    const initialState = mockStates.InitialStateWithHistory
    const action =
      mockActions[DontaionHistoryAction.periodicDonationHistory.read.failure]
    const newState = DontaionHistoryReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateFailWithHistory)
  })
})
