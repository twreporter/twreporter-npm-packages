/* global afterEach, describe, expect, jest, test */
import axios from 'axios'
import actions from '../index'
import actionTypes from '../../constants/action-types'
import auth from '../../reducers/auth'
import nock from 'nock'

const apiOrigin = 'https://api.example.com'
const types = actionTypes.jaiAbTestGroup.read

afterEach(() => {
  jest.restoreAllMocks()
  nock.cleanAll()
})

function createStore(initialAuth = auth(undefined, {})) {
  let state = initialAuth
  return {
    getState: () => ({ origins: { api: apiOrigin }, auth: state }),
    dispatch: (action) => {
      state = auth(state, action)
    },
  }
}

function tokenFor(userID) {
  return `header.${Buffer.from(JSON.stringify({ user_id: userID })).toString(
    'base64'
  )}.signature`
}

describe('getJaiAbTestGroup', () => {
  test.each(['A', 'B', 'none'])(
    'requests and stores group %s while preserving authenticated user data',
    async (group) => {
      const data = { data: { jai_ab_test_group: group } }
      const get = jest
        .spyOn(axios, 'get')
        .mockResolvedValue({ data, status: 200 })
      const initialAuth = {
        ...auth(undefined, {}),
        isAuthed: true,
        accessToken: 'jwt',
        userInfo: { user_id: 123, email: 'reader@example.com' },
      }
      let state = initialAuth
      const dispatch = jest.fn((action) => {
        state = auth(state, action)
      })
      const result = await actions.getJaiAbTestGroup('_ga=GA1.1.123.456')(
        dispatch,
        () => ({ origins: { api: apiOrigin }, auth: state })
      )

      expect(get).toHaveBeenCalledWith(`${apiOrigin}/v3/jai-ab-test-group`, {
        timeout: expect.any(Number),
        withCredentials: true,
        headers: { Authorization: 'Bearer jwt', Cookie: '_ga=GA1.1.123.456' },
      })
      expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual([
        types.request,
        types.success,
      ])
      expect(result).toEqual({
        type: types.success,
        payload: { data, statusCode: 200 },
        meta: { authRevision: 0 },
      })
      expect(state).toEqual({
        ...initialAuth,
        userInfo: { ...initialAuth.userInfo, jai_ab_test_group: group },
      })
    }
  )

  test('enables browser credentials without authorization for anonymous visitors', async () => {
    const get = jest.spyOn(axios, 'get').mockResolvedValue({
      data: { data: { jai_ab_test_group: 'B' } },
      status: 200,
    })
    const initialAuth = { ...auth(undefined, {}), accessToken: 'stale-token' }
    let state = initialAuth
    await actions.getJaiAbTestGroup()(
      (action) => {
        state = auth(state, action)
      },
      () => ({ origins: { api: apiOrigin }, auth: state })
    )

    expect(get).toHaveBeenCalledWith(`${apiOrigin}/v3/jai-ab-test-group`, {
      timeout: expect.any(Number),
      withCredentials: true,
      headers: {},
    })
    expect(state).toEqual({
      ...initialAuth,
      userInfo: { jai_ab_test_group: 'B' },
    })
  })

  test.each([actionTypes.AUTH_CLEAR, actionTypes.AUTH_SUCCESS])(
    'ignores an outstanding response after %s',
    async (type) => {
      let resolveRequest
      jest.spyOn(axios, 'get').mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveRequest = resolve
          })
      )
      const store = createStore({
        ...auth(undefined, {}),
        isAuthed: true,
        accessToken: tokenFor(123),
        userInfo: { user_id: 123 },
      })
      const request = actions.getJaiAbTestGroup()(
        store.dispatch,
        store.getState
      )
      store.dispatch({ type, payload: { data: { jwt: tokenFor(456) } } })
      const changedAuth = store.getState().auth
      resolveRequest({
        data: { data: { jai_ab_test_group: 'A' } },
        status: 200,
      })
      await request
      expect(store.getState().auth).toBe(changedAuth)
      expect(store.getState().auth.userInfo || {}).not.toHaveProperty(
        'jai_ab_test_group'
      )
    }
  )

  test.each(['before', 'after'])(
    'explicitly fetches the current group when an earlier request finishes %s authentication',
    async (order) => {
      let resolveOldRequest
      const get = jest
        .spyOn(axios, 'get')
        .mockImplementationOnce(
          () =>
            new Promise((resolve) => {
              resolveOldRequest = resolve
            })
        )
        .mockResolvedValue({
          data: { data: { jai_ab_test_group: 'B' } },
          status: 200,
        })
      const store = createStore()
      const oldRequest = actions.getJaiAbTestGroup()(
        store.dispatch,
        store.getState
      )
      const oldResponse = {
        data: { data: { jai_ab_test_group: 'A' } },
        status: 200,
      }
      if (order === 'before') {
        resolveOldRequest(oldResponse)
        await oldRequest
      }
      const jwt = tokenFor(123)
      nock(apiOrigin).post('/v2/auth/token').reply(200, { data: { jwt } })
      const result = await actions.getAccessToken('_ga=123')(
        store.dispatch,
        store.getState
      )
      expect(get).toHaveBeenCalledTimes(1)
      await actions.getJaiAbTestGroup('_ga=123')(store.dispatch, store.getState)
      if (order === 'after') {
        resolveOldRequest(oldResponse)
        await oldRequest
      }
      expect(result.type).toBe(actionTypes.AUTH_SUCCESS)
      expect(store.getState().auth.userInfo).toEqual({
        user_id: 123,
        jai_ab_test_group: 'B',
      })
      expect(get.mock.calls[1][1].headers).toEqual({
        Authorization: `Bearer ${jwt}`,
        Cookie: '_ga=123',
      })
    }
  )

  test('only fetches the anonymous group when explicitly called after auth failure', async () => {
    const get = jest.spyOn(axios, 'get').mockResolvedValue({
      data: { data: { jai_ab_test_group: 'none' } },
      status: 200,
    })
    nock(apiOrigin).post('/v2/auth/token').reply(401)
    const store = createStore()
    await expect(
      actions.getAccessToken('_ga=123')(store.dispatch, store.getState)
    ).rejects.toMatchObject({ type: actionTypes.AUTH_FAILURE })
    expect(get).not.toHaveBeenCalled()
    await actions.getJaiAbTestGroup('_ga=123')(store.dispatch, store.getState)
    expect(store.getState().auth.isAuthed).toBe(false)
    expect(store.getState().auth.userInfo).toEqual({
      jai_ab_test_group: 'none',
    })
    expect(get.mock.calls[0][1].headers).toEqual({ Cookie: '_ga=123' })
  })

  test('successful authentication does not request a group', async () => {
    const get = jest.spyOn(axios, 'get')
    nock(apiOrigin)
      .post('/v2/auth/token')
      .reply(200, { data: { jwt: tokenFor(123) } })
    const store = createStore()
    await expect(
      actions.getAccessToken()(store.dispatch, store.getState)
    ).resolves.toMatchObject({ type: actionTypes.AUTH_SUCCESS })
    expect(get).not.toHaveBeenCalled()
    expect(store.getState().auth.isAuthed).toBe(true)
    expect(store.getState().auth.userInfo).toEqual({ user_id: 123 })
  })

  test('rejects with the failure action and preserves auth on request failure', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Network error'))
    const initialAuth = {
      ...auth(undefined, {}),
      isAuthed: true,
      accessToken: 'jwt',
      userInfo: { user_id: 123, jai_ab_test_group: 'A' },
    }
    let state = initialAuth
    const dispatch = jest.fn((action) => {
      state = auth(state, action)
    })
    await expect(
      actions.getJaiAbTestGroup()(dispatch, () => ({
        origins: { api: apiOrigin },
        auth: state,
      }))
    ).rejects.toEqual({
      type: types.failure,
      payload: { error: expect.any(Error) },
    })
    expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual([
      types.request,
      types.failure,
    ])
    expect(state).toBe(initialAuth)
  })
})
