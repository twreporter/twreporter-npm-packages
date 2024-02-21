/* global expect, test, describe */
import FootprintsReducer from '../footprints'
import actionTypes from '../../constants/action-types'

import { mockActions, mockStates } from './mocks/footprints'

const { footprints: FootprintsAction } = actionTypes

describe('Footprints Reducer Testing', () => {
  test('should return the initial state', () => {
    const initialState = mockStates.InitialState
    const action = { type: 'UNKNOWN_ACTION' }
    const newState = FootprintsReducer(undefined, action)

    expect(newState).toEqual(initialState)
  })

  test(`should handle ${FootprintsAction.read.request}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[FootprintsAction.read.request]
    const newState = FootprintsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateReq)
  })

  test(`should handle ${FootprintsAction.read.success}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[FootprintsAction.read.success]
    const newState = FootprintsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateSuc)
  })

  test(`should handle ${FootprintsAction.read.failure}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[FootprintsAction.read.failure]
    const newState = FootprintsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateFail)
  })

  test(`should handle ${FootprintsAction.update.request}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[FootprintsAction.update.request]
    const newState = FootprintsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateReq)
  })

  test(`should handle ${FootprintsAction.update.success}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[FootprintsAction.update.success]
    const newState = FootprintsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateUpdateSuc)
  })

  test(`should handle ${FootprintsAction.update.failure}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[FootprintsAction.update.failure]
    const newState = FootprintsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateFail)
  })
})
