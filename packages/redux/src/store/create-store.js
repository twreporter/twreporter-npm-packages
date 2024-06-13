import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import rootReducer from '../reducers'
import { bindActionsToStore } from './bind-actions-to-store'

/**
 * Create a redux store with custom setting
 *
 * @param {Object} [initialState={}] The initial state. Must be a plain object with the same shape as the keys of root reducer.
 * @param {string} [cookie=''] The cookie string that will pass to the httpclient, so that the client can send request with given cookie.
 * @param {boolean} [isDev=false]
 * @return {Object} redux store
 */
export default function createStore(
  initialState = {},
  cookie = '',
  isDev = false
) {
  const httpClientWithToken = cookie
    ? // Take user cookie from the user's request coming to the server when doing SSR.
      axios.create({
        headers: { cookie },
      })
    : // Take user cookie from the browser when making request on the client side directly
      axios.create({
        withCredentials: true,
      })

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { httpClientWithToken },
        },
      }),
    devTools: isDev,
  })

  // Bind actions to the store after creation
  bindActionsToStore(store)

  if (isDev && module.hot) {
    // Enable Webpack hot module replacement for reducers
    // Or it will cause multiple store instances to show in Redux Dev Tools.
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    })
  }

  return store
}
