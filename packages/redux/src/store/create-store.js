import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import axios from 'axios'
import bindActionsToStore from './bind-actions-to-store'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'

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
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose
  const storeEnhancer = composeEnhancers(
    // NOTICE:
    // `bindActionsToStore` should be former than
    // `applyMiddleware(thunkMiddleware.withExtraArgument({ httpClientWithToken }))`.
    // Otherwise, store.actions dispatch won't be enhanced by redux-thunk middleware.
    bindActionsToStore,
    applyMiddleware(thunkMiddleware.withExtraArgument({ httpClientWithToken }))
  )
  const store = _createStore(rootReducer, initialState, storeEnhancer)
  if (isDev && module.hot) {
    // Enable Webpack hot module replacement for reducers
    // Or it will cause multiple store instances to show in Redux Dev Tools.
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    })
  }
  return store
}
