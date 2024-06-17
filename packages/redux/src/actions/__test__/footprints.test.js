/* global expect, test, describe, afterEach */
import { expectActionErrorObj } from './expect-utils'
import * as actions from '../footprints'
import actionTypes from '../../constants/action-types'
import configureStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import apiEndpoints from '../../constants/api-endpoints'
import nock from 'nock'
import { thunk } from 'redux-thunk'

import {
  mockUserId,
  mockPostId,
  mockSetUserFootprintDataResponse,
  mockGetUserFootprintsData,
} from './mocks/footprints'

const mockStore = configureStore([thunk])

const apiOrigin = 'http://localhost:8080'

describe('Test footprints action', () => {
  describe(`Test action getUserFootprints`, () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: apiOrigin,
      },
    })
    afterEach(function() {
      store.clearActions()
      nock.cleanAll()
    })
    test('should dispatch an action created by `getUserFootprints` if fetching successed', () => {
      const responseObj = mockGetUserFootprintsData
      nock(apiOrigin)
        .get(
          `/v2/${apiEndpoints.users}/${mockUserId}/analytics/reading-footprint?limit=2&offset=0`
        )
        .reply(200, responseObj)
      return store
        .dispatch(actions.getUserFootprints('jwt', mockUserId, 0, 2))
        .then(() => {
          const requestExp = {
            type: actionTypes.footprints.read.request,
            url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}/analytics/reading-footprint?limit=2&offset=0`,
          }
          const successExp = {
            type: actionTypes.footprints.read.success,
            payload: {
              statusCode: 200,
              data: mockGetUserFootprintsData,
            },
          }
          expect(store.getActions()[0]).toEqual(requestExp)
          expect(store.getActions()[1]).toEqual(successExp)
        })
    })
    test('should dispatch an action created by `getUserFootprints` if fetching failed', () => {
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpected error.',
      }
      nock(apiOrigin)
        .get(
          `/v2/${apiEndpoints.users}/${mockUserId}/analytics/reading-footprint?limit=2&offset=0`
        )
        .reply(mockStatusCode, mockAPIRes)
      return store
        .dispatch(actions.getUserFootprints('jwt', mockUserId, 0, 2))
        .catch(failAction => {
          const requestExp = {
            type: actionTypes.footprints.read.request,
            url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}/analytics/reading-footprint?limit=2&offset=0`,
          }
          const errorExp = {
            type: actionTypes.footprints.read.failure,
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

  describe(`Test action setUserFootprint`, () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: apiOrigin,
      },
    })
    afterEach(function() {
      store.clearActions()
      nock.cleanAll()
    })
    test('should dispatch an action created by `setUserFootprint` if updating successed', () => {
      const responseObj = mockSetUserFootprintDataResponse
      nock(apiOrigin)
        .post(
          `/v2/${apiEndpoints.users}/${mockUserId}/analytics/reading-footprint`
        )
        .reply(200, responseObj)
      return store
        .dispatch(actions.setUserFootprint('jwt', mockUserId, mockPostId))
        .then(() => {
          const requestExp = {
            type: actionTypes.footprints.update.request,
            url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}/analytics/reading-footprint`,
          }
          const successExp = {
            type: actionTypes.footprints.update.success,
            payload: {
              statusCode: 200,
              data: mockSetUserFootprintDataResponse,
            },
          }
          expect(store.getActions()[0]).toEqual(requestExp)
          expect(store.getActions()[1]).toEqual(successExp)
        })
    })
    test('should dispatch an action created by `setUserFootprint` if updating failed', () => {
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpected error.',
      }
      nock(apiOrigin)
        .post(
          `/v2/${apiEndpoints.users}/${mockUserId}/analytics/reading-footprint`
        )
        .reply(mockStatusCode, mockAPIRes)
      return store
        .dispatch(actions.setUserFootprint('jwt', mockUserId, mockPostId))
        .catch(failAction => {
          const requestExp = {
            type: actionTypes.footprints.update.request,
            url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}/analytics/reading-footprint`,
          }
          const errorExp = {
            type: actionTypes.footprints.update.failure,
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
