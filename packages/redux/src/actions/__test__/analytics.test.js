/* global expect, test, describe, afterEach */
import { expectActionErrorObj } from './expect-utils'
import * as actions from '../analytics'
import actionTypes from '../../constants/action-types'
import configureStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import apiEndpoints from '../../constants/api-endpoints'
import nock from 'nock'
import thunk from 'redux-thunk'

import {
  mockUserId,
  mockSetUserAnalyticsData,
  mockSetUserAnalyticsDataResponse,
} from './mocks/analytics'

const mockStore = configureStore([thunk])

const apiOrigin = 'http://localhost:8080'

describe('Test analytics action', () => {
  describe(`Test action setUserAnalyticsData`, () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: apiOrigin,
      },
    })
    afterEach(function() {
      store.clearActions()
      nock.cleanAll()
    })
    test('should dispatch an action created by `setUserAnalyticsData` if updating successed', () => {
      const responseObj = mockSetUserAnalyticsDataResponse
      nock(apiOrigin)
        .post(`/v2/${apiEndpoints.users}/${mockUserId}/analytics`)
        .reply(200, responseObj)
      return store
        .dispatch(
          actions.setUserAnalyticsData(
            'jwt',
            mockUserId,
            mockSetUserAnalyticsData.postID,
            {
              readPostCount: mockSetUserAnalyticsData.readPostsCount,
              readPostSec: mockSetUserAnalyticsData.readPostsSec,
            }
          )
        )
        .then(() => {
          const requestExp = {
            type: actionTypes.analytics.update.request,
            url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}/analytics`,
          }
          const successExp = {
            type: actionTypes.analytics.update.success,
            payload: {
              statusCode: 200,
              data: mockSetUserAnalyticsDataResponse,
            },
          }
          expect(store.getActions()[0]).toEqual(requestExp)
          expect(store.getActions()[1]).toEqual(successExp)
        })
    })
    test('should dispatch an action created by `setUserAnalyticsData` if updating failed', () => {
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpected error.',
      }
      nock(apiOrigin)
        .post(`/v2/${apiEndpoints.users}/${mockUserId}/analytics`)
        .reply(mockStatusCode, mockAPIRes)
      return store
        .dispatch(
          actions.setUserAnalyticsData(
            'jwt',
            mockUserId,
            mockSetUserAnalyticsData.postID,
            {
              readPostCount: mockSetUserAnalyticsData.readPostsCount,
              readPostSec: mockSetUserAnalyticsData.readPostsSec,
            }
          )
        )
        .catch(failAction => {
          const requestExp = {
            type: actionTypes.analytics.update.request,
            url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}/analytics`,
          }
          const errorExp = {
            type: actionTypes.analytics.update.failure,
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
