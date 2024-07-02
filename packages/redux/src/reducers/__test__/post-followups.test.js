/* global expect, test, describe */
import postFollowupsReducer from '../post-followups'
import actionTypes from '../../constants/action-types'

import { mockActions, mockStates } from './mocks/post-followups'

const { postFollowups: postFollowupsAction } = actionTypes

describe('Post Followups Reducer Testing', () => {
  test('should return the initial state', () => {
    const initialState = mockStates.InitialState
    const action = { type: 'UNKNOWN_ACTION' }
    const newState = postFollowupsReducer(undefined, action)

    expect(newState).toEqual(initialState)
  })

  test(`should handle ${postFollowupsAction.read.request}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[postFollowupsAction.read.request]
    const newState = postFollowupsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateReq)
  })

  test(`should handle ${postFollowupsAction.read.success}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[postFollowupsAction.read.success]
    const newState = postFollowupsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateSuc)
  })

  test(`should handle ${postFollowupsAction.read.failure}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[postFollowupsAction.read.failure]
    const newState = postFollowupsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateFail)
  })
})
