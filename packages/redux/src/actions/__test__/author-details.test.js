/* global expect, test, describe, afterEach */
import { author as authorSchema } from '../../schemas/article-schema'
import { camelizeKeys } from 'humps'
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
  keywords: authorId,
  filters: 'articlesCount>0',
  hitsPerPage: 1,
  page: 0,
}

describe('Test action creators of author-details', () => {
  describe('Test action creator `requestFetchAuthorDetails`', () => {
    const createdAction = actions.requestFetchAuthorDetails(authorId)
    test('should return an action with property `type`', () => {
      const expectedActionType = actionTypes.FETCH_AUTHOR_DETAILS_REQUEST
      expect(createdAction).toHaveProperty('type', expectedActionType)
    })
    test('should return an action with property `keywords`', () => {
      expect(createdAction).toHaveProperty('keywords', authorId)
    })
  })
  describe('Test action creator `failToFetchAuthorDetails`', () => {
    const error = new Error('mock-error')
    const createdAction = actions.failToFetchAuthorDetails(error)
    test('should return an action with property `type`', () => {
      const expectedActionType = actionTypes.FETCH_AUTHOR_DETAILS_FAILURE
      expect(createdAction).toHaveProperty('type', expectedActionType)
    })
    test('should return an action with property `error`', () => {
      expect(createdAction).toHaveProperty('error', error)
    })
  })
  describe('Test action creator `receiveFetchAuthorDetails`', () => {
    const normalizedData = {
      entities: [
        {
          id: authorId,
        },
      ],
      results: ['mock-author-id'],
    }
    const createdAction = actions.receiveFetchAuthorDetails(normalizedData)
    test('should return an action with property `type`', () => {
      const expectedActionType = actionTypes.FETCH_AUTHOR_DETAILS_SUCCESS
      expect(createdAction).toHaveProperty('type', expectedActionType)
    })
    test('should return an action with property `normalizedData`', () => {
      expect(createdAction).toHaveProperty('normalizedData', normalizedData)
    })
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
    test('should dispatch an action created by `requestFetchAuthorDetails`', done => {
      nock('http://localhost:8080')
        .get('/v1/search/authors')
        .query(searchParas)
        .reply(200, { hits: [] })
      store
        .dispatch(actions.fetchAuthorDetails(authorId))
        .then(function() {
          const actionsInStore = store.getActions()
          expect(actionsInStore[0]).toEqual(
            actions.requestFetchAuthorDetails(authorId)
          )
          done()
        })
        .catch(function(error) {
          done(error)
        })
    })
    test('should dispatch an action created by `receiveFetchAuthorDetails` if fetching successed', done => {
      const mockAuthorData = {
        id: authorId,
        email: 'mock-email',
        thumbnail: {},
      }
      const normalizedData = normalize(
        camelizeKeys(mockAuthorData),
        authorSchema
      )
      nock('http://localhost:8080')
        .get('/v1/search/authors')
        .query(searchParas)
        .reply(200, { hits: [mockAuthorData] })
      store
        .dispatch(actions.fetchAuthorDetails(authorId))
        .then(function() {
          const actionsInStore = store.getActions()
          expect(actionsInStore[1]).toEqual(
            actions.receiveFetchAuthorDetails(normalizedData)
          )
          done()
        })
        .catch(function(error) {
          done(error)
        })
    })
    test('should dispatch an action created by `failToFetchAuthorDetails` if fetching failed', done => {
      nock('http://localhost:8080')
        .get('/v1/search/authors')
        .query(searchParas)
        .reply(500)
      store
        .dispatch(actions.fetchAuthorDetails(authorId))
        .then(function() {
          const actionsInStore = store.getActions()
          expect(actionsInStore[1].type).toBe(
            actionTypes.FETCH_AUTHOR_DETAILS_FAILURE
          )
          expect(actionsInStore[1].error).toBeInstanceOf(Error)
          done()
        })
        .catch(function(error) {
          done(error)
        })
    })
  })
})
