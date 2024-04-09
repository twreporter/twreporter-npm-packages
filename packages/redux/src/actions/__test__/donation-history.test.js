/* global expect, test, describe, afterEach */
import { expectActionErrorObj } from './expect-utils'
import * as actions from '../donation-history'
import actionTypes from '../../constants/action-types'
import configureStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import apiEndpoints from '../../constants/api-endpoints'
import nock from 'nock'
import thunk from 'redux-thunk'

import {
  mockUserId,
  mockOrderNumber,
  mockGetUserDonationHistoryData,
  getUserPeriodicDonationHistoryData,
} from './mocks/donation-history'

const mockStore = configureStore([thunk])

const apiOrigin = 'http://localhost:8080'

describe('Test donation history action', () => {
  describe(`Test action getUserDonationHistory`, () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: apiOrigin,
      },
    })
    afterEach(function() {
      store.clearActions()
      nock.cleanAll()
    })
    test('should dispatch an action created by `getUserDonationHistory` if fetching successed', () => {
      const responseObj = mockGetUserDonationHistoryData
      nock(apiOrigin)
        .get(
          `/v1/${apiEndpoints.users}/${mockUserId}/donations?limit=10&offset=0`
        )
        .reply(200, responseObj)
      return store
        .dispatch(actions.getUserDonationHistory('jwt', mockUserId, 0, 10))
        .then(() => {
          const requestExp = {
            type: actionTypes.donationHistory.donationHistory.read.request,
            url: `${apiOrigin}/v1/${apiEndpoints.users}/${mockUserId}/donations?limit=10&offset=0`,
          }
          const successExp = {
            type: actionTypes.donationHistory.donationHistory.read.success,
            payload: {
              statusCode: 200,
              data: mockGetUserDonationHistoryData,
            },
          }
          expect(store.getActions()[0]).toEqual(requestExp)
          expect(store.getActions()[1]).toEqual(successExp)
        })
    })
    test('should dispatch an action created by `getUserDonationHistory` if fetching failed', () => {
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpected error.',
      }
      nock(apiOrigin)
        .get(
          `/v1/${apiEndpoints.users}/${mockUserId}/donations?limit=10&offset=0`
        )
        .reply(mockStatusCode, mockAPIRes)
      return store
        .dispatch(actions.getUserDonationHistory('jwt', mockUserId, 0, 10))
        .catch(failAction => {
          const requestExp = {
            type: actionTypes.donationHistory.donationHistory.read.request,
            url: `${apiOrigin}/v1/${apiEndpoints.users}/${mockUserId}/donations?limit=10&offset=0`,
          }
          const errorExp = {
            type: actionTypes.donationHistory.donationHistory.read.failure,
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
  describe(`Test action getUserPeriodicDonationHistory`, () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: apiOrigin,
      },
    })
    afterEach(function() {
      store.clearActions()
      nock.cleanAll()
    })
    test('should dispatch an action created by `getUserPeriodicDonationHistory` if fetching successed', () => {
      const responseObj = getUserPeriodicDonationHistoryData
      nock(apiOrigin)
        .get(
          `/v1/${apiEndpoints.periodicDonations}/orders/${mockOrderNumber}/payments?limit=10&offset=0`
        )
        .reply(200, responseObj)
      return store
        .dispatch(
          actions.getUserPeriodicDonationHistory('jwt', mockOrderNumber, 0, 10)
        )
        .then(() => {
          const requestExp = {
            type:
              actionTypes.donationHistory.periodicDonationHistory.read.request,
            url: `${apiOrigin}/v1/${apiEndpoints.periodicDonations}/orders/${mockOrderNumber}/payments?limit=10&offset=0`,
          }
          const successExp = {
            type:
              actionTypes.donationHistory.periodicDonationHistory.read.success,
            payload: {
              statusCode: 200,
              data: getUserPeriodicDonationHistoryData,
            },
          }
          expect(store.getActions()[0]).toEqual(requestExp)
          expect(store.getActions()[1]).toEqual(successExp)
        })
    })
    test('should dispatch an action created by `getUserPeriodicDonationHistory` if fetching failed', () => {
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpected error.',
      }
      nock(apiOrigin)
        .get(
          `/v1/${apiEndpoints.periodicDonations}/orders/${mockOrderNumber}/payments?limit=10&offset=0`
        )
        .reply(mockStatusCode, mockAPIRes)
      return store
        .dispatch(
          actions.getUserPeriodicDonationHistory('jwt', mockOrderNumber, 0, 10)
        )
        .catch(failAction => {
          const requestExp = {
            type:
              actionTypes.donationHistory.periodicDonationHistory.read.request,
            url: `${apiOrigin}/v1/${apiEndpoints.periodicDonations}/orders/${mockOrderNumber}/payments?limit=10&offset=0`,
          }
          const errorExp = {
            type:
              actionTypes.donationHistory.periodicDonationHistory.read.failure,
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
