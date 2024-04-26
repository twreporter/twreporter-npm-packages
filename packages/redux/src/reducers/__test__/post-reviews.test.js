/* global expect, test, describe */
import PostReviewsReducer from '../post-reviews'
import actionTypes from '../../constants/action-types'

import { mockActions, mockStates } from './mocks/post-reviews'

const { postReviews: PostReviewsAction } = actionTypes

describe('Post Reviews Reducer Testing', () => {
  test('should return the initial state', () => {
    const initialState = mockStates.InitialState
    const action = { type: 'UNKNOWN_ACTION' }
    const newState = PostReviewsReducer(undefined, action)

    expect(newState).toEqual(initialState)
  })

  test(`should handle ${PostReviewsAction.read.request}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[PostReviewsAction.read.request]
    const newState = PostReviewsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateReq)
  })

  test(`should handle ${PostReviewsAction.read.success}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[PostReviewsAction.read.success]
    const newState = PostReviewsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateSuc)
  })

  test(`should handle ${PostReviewsAction.read.failure}`, () => {
    const initialState = mockStates.InitialState
    const action = mockActions[PostReviewsAction.read.failure]
    const newState = PostReviewsReducer(initialState, action)

    expect(newState).toEqual(mockStates.ExpStateFail)
  })
})
