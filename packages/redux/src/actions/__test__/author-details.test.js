/* global expect, test, describe, afterEach */
import { author as authorSchema } from '../../schemas/article-schema'
import { camelizeKeys } from 'humps'
import { expectActionErrorObj } from './expect-utils'
import { normalize } from 'normalizr'
import * as actions from '../author-details'
import actionTypes from '../../constants/action-types'
import configureStore from 'redux-mock-store'
import fieldNames from '../../constants/redux-state-field-names'
import nock from 'nock'
import thunk from 'redux-thunk'

const mockStore = configureStore([thunk])

const authorId = 'mock-author-id'
const searchParas = {
  author_id: authorId,
}

describe('Test action creators of author-details', () => {
  test('Test action creator `requestFetchAuthorDetails`', () => {
    const expected = {
      type: actionTypes.authorDetails.read.request,
      payload: {
        authorId,
      },
    }
    const createdAction = actions.requestFetchAuthorDetails(authorId)
    expect(createdAction).toEqual(expected)
  })
  test('Test action creator `receiveFetchAuthorDetails`', () => {
    const normalizedData = {
      entities: [
        {
          id: authorId,
        },
      ],
      results: ['mock-author-id'],
    }
    const createdAction = actions.receiveFetchAuthorDetails(normalizedData)
    const expected = {
      type: actionTypes.authorDetails.read.success,
      payload: {
        normalizedData,
      },
    }
    expect(createdAction).toEqual(expected)
  })
  describe('Test action creator `fetchAuthorDetails`', () => {
    const store = mockStore({
      [fieldNames.origins]: {
        api: 'http://localhost:8080',
      },
    })
    afterEach(function() {
      store.clearActions()
      nock.cleanAll()
    })
    test('should dispatch an action created by `receiveFetchAuthorDetails` if fetching successed', () => {
      const mockAuthorData = {
        id: authorId,
        email: 'mock-email',
        job_title: 'mock-job',
        thumbnail: {},
        bio: `大家好，我是王小明`,
        name: `王小明`,
        updated_at: `2021-01-27T12:00:00Z`,
      }
      const normalizedData = normalize(
        camelizeKeys(mockAuthorData),
        authorSchema
      )
      const responseObj = {
        status: 'success',
        data: mockAuthorData,
      }
      nock('http://localhost:8080')
        .get(`/v2/authors/${authorId}`)
        .query(searchParas)
        .reply(200, responseObj)
      return store
        .dispatch(actions.fetchAuthorDetails(authorId))
        .then(function() {
          const expected = [
            {
              type: actionTypes.authorDetails.read.request,
              payload: {
                authorId,
              },
            },
            {
              type: actionTypes.authorDetails.read.success,
              payload: {
                normalizedData,
              },
            },
          ]
          expect(store.getActions()[0]).toEqual(expected[0])
          expect(store.getActions()[1]).toEqual(expected[1])
        })
    })
    test('should dispatch an action created by `failToFetchAuthorDetails` if fetching failed', () => {
      const mockStatusCode = 500
      const mockAPIRes = {
        status: 'error',
        message: 'Unexpected error.',
      }
      nock('http://localhost:8080')
        .get(`/v2/authors/${authorId}`)
        .query(searchParas)
        .reply(mockStatusCode, mockAPIRes)
      return store
        .dispatch(actions.fetchAuthorDetails(authorId))
        .catch(function(failAction) {
          const expected = [
            {
              type: actionTypes.authorDetails.read.request,
              payload: {
                authorId,
              },
            },
            {
              type: actionTypes.authorDetails.read.failure,
              payload: {
                error: expect.any(Error),
              },
            },
          ]
          expect(store.getActions()[0]).toEqual(expected[0])
          expect(store.getActions()[1]).toEqual(failAction)
          expect(store.getActions()[1]).toEqual(expected[1])
          expectActionErrorObj(
            store.getActions()[1].payload.error,
            mockStatusCode,
            mockAPIRes
          )
        })
    })
  })
})
