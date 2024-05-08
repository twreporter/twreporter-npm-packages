/* global expect, test, describe, afterEach */
import { expectActionErrorObj } from './expect-utils'
import * as actions from '../post-reviews'
import actionTypes from '../../constants/action-types'
import configureStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import apiEndpoints from '../../constants/api-endpoints'
import nock from 'nock'
import thunk from 'redux-thunk'

import { mockPostReviewsData } from './mocks/post-reviews'

const mockStore = configureStore([thunk])

const apiOrigin = 'http://localhost:8080'

describe('Test postRewiews action', () => {
  describe(`Test action getPostReviews`, () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: apiOrigin,
      },
    })
    afterEach(function() {
      store.clearActions()
      nock.cleanAll()
    })
    test('should dispatch an action created by `getPostReviews` if fetching successed', () => {
      const responseObj = mockPostReviewsData
      nock(apiOrigin)
        .get(`/v2/${apiEndpoints.postReviews}`)
        .reply(200, responseObj)
      return store.dispatch(actions.getPostReviews('jwt')).then(() => {
        const requestExp = {
          type: actionTypes.postReviews.read.request,
          url: `${apiOrigin}/v2/${apiEndpoints.postReviews}`,
        }
        const successExp = {
          type: actionTypes.postReviews.read.success,
          payload: {
            statusCode: 200,
            data: mockPostReviewsData,
          },
        }
        expect(store.getActions()[0]).toEqual(requestExp)
        expect(store.getActions()[1]).toEqual(successExp)
      })
    })
    test('should dispatch an action created by `getPostReviews` if fetching failed', () => {
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpected error.',
      }
      nock(apiOrigin)
        .get(`/v2/${apiEndpoints.postReviews}`)
        .reply(mockStatusCode, mockAPIRes)
      return store.dispatch(actions.getPostReviews('jwt')).catch(failAction => {
        const requestExp = {
          type: actionTypes.postReviews.read.request,
          url: `${apiOrigin}/v2/${apiEndpoints.postReviews}`,
        }
        const errorExp = {
          type: actionTypes.postReviews.read.failure,
          payload: {
            error: expect.any(Error),
          },
        }
        expect(store.getActions()[0]).toEqual(requestExp)
        expect(store.getActions()[1]).toEqual(failAction)
        expect(store.getActions()[1]).toEqual(errorExp)
        expectActionErrorObj(
          store.getActions()[1].payload.error,
          mockStatusCode,
          mockAPIRes
        )
      })
    })
  })
})
