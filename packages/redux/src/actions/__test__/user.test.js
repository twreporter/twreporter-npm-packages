/* global expect, test, describe, afterEach */
import { expectActionErrorObj } from './expect-utils'
import * as actions from '../user'
import actionTypes from '../../constants/action-types'
import configureStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import apiEndpoints from '../../constants/api-endpoints'
import nock from 'nock'
import { thunk } from 'redux-thunk'

import { mockUserId, mockSetUserData, mockGetUserData } from './mocks/user'

const mockStore = configureStore([thunk])

const apiOrigin = 'http://localhost:8080'

describe('Test user action', () => {
  describe(`Test action getUserData`, () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: apiOrigin,
      },
    })
    afterEach(function() {
      store.clearActions()
      nock.cleanAll()
    })
    test('should dispatch an action created by `getUserData` if fetching successed', () => {
      const responseObj = {
        status: 'success',
        data: mockGetUserData,
      }
      nock(apiOrigin)
        .get(`/v2/${apiEndpoints.users}/${mockUserId}`)
        .reply(200, responseObj)
      return store.dispatch(actions.getUserData('jwt', mockUserId)).then(() => {
        const requestExp = {
          type: actionTypes.user.read.request,
          url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}`,
        }
        const successExp = {
          type: actionTypes.user.read.success,
          payload: {
            statusCode: 200,
            data: {
              data: mockGetUserData,
              status: 'success',
            },
          },
        }
        expect(store.getActions()[0]).toEqual(requestExp)
        expect(store.getActions()[1]).toEqual(successExp)
      })
    })
    test('should dispatch an action created by `setUserData` if updating failed', () => {
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpected error.',
      }
      nock(apiOrigin)
        .get(`/v2/${apiEndpoints.users}/${mockUserId}`)
        .reply(mockStatusCode, mockAPIRes)
      return store
        .dispatch(actions.getUserData('jwt', mockUserId))
        .catch(failAction => {
          const requestExp = {
            type: actionTypes.user.read.request,
            url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}`,
          }
          const errorExp = {
            type: actionTypes.user.read.failure,
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

  describe(`Test action setUserData`, () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: apiOrigin,
      },
    })
    afterEach(function() {
      store.clearActions()
      nock.cleanAll()
    })
    test('should dispatch an action created by `setUserData` if updating successed', () => {
      const responseObj = {
        status: 'ok',
        record: mockSetUserData,
      }
      nock(apiOrigin)
        .post(`/v2/${apiEndpoints.users}/${mockUserId}`)
        .reply(200, responseObj)
      return store
        .dispatch(
          actions.setUserData(
            'jwt',
            mockUserId,
            mockSetUserData.read_preference,
            mockSetUserData.maillist
          )
        )
        .then(() => {
          const requestExp = {
            type: actionTypes.user.update.request,
            url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}`,
          }
          const successExp = {
            type: actionTypes.user.update.success,
            payload: {
              statusCode: 200,
              data: {
                record: mockSetUserData,
                status: 'ok',
              },
            },
          }
          expect(store.getActions()[0]).toEqual(requestExp)
          expect(store.getActions()[1]).toEqual(successExp)
        })
    })
    test('should dispatch an action created by `setUserData` if updating failed', () => {
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpected error.',
      }
      nock(apiOrigin)
        .post(`/v2/${apiEndpoints.users}/${mockUserId}`)
        .reply(mockStatusCode, mockAPIRes)
      return store
        .dispatch(
          actions.setUserData(
            'jwt',
            mockUserId,
            mockSetUserData.read_preference,
            mockSetUserData.maillist
          )
        )
        .catch(failAction => {
          const requestExp = {
            type: actionTypes.user.update.request,
            url: `${apiOrigin}/v2/${apiEndpoints.users}/${mockUserId}`,
          }
          const errorExp = {
            type: actionTypes.user.update.failure,
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
