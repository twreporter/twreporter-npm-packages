import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import axios from 'axios'
import bindActionsToStore from './bind-actions-to-store'
import * as bs from '../utils/browser-storage'
import detectEnv from '../utils/detect-env'
import rootReducer from '../reducers'
import debounce from 'lodash/debounce'
import thunkMiddleware from 'redux-thunk'

const _ = {
  debounce,
}

/**
 * Create a redux store with custom setting
 *
 * @param {Object} [preloadedState={}] The initial state. Must be a plain object with the same shape as the keys of root reducer.
 * @param {string} [cookie=''] The cookie string that will pass to the httpclient, so that the client can send request with given cookie.
 * @param {boolean} [isDev=false]
 * @returns
 */
export default async function createStore(
  preloadedState = {},
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
  if (detectEnv.isBrowser()) {
    try {
      // sync redux state with browser storage
      const reduxState = await bs.syncReduxState(preloadedState)
      const store = _createStore(rootReducer, reduxState, storeEnhancer)
      if (isDev && module.hot) {
        // Enable Webpack hot module replacement for reducers
        // Or it will cause multiple store instances to show in Redux Dev Tools.
        module.hot.accept('../reducers', () => {
          store.replaceReducer(require('../reducers').default)
        })
      }
      // Subscribe the redux store changes.
      // Sync the browser storage after redux state change.
      // Use `debounce` (instead of throttle) to save the last result in duration into storage
      store.subscribe(
        _.debounce(
          () =>
            bs.saveCacheableStateToStorage(store.getState()).catch(error => {
              console.error(
                'Try to cache new redux state but there is an error on saving state to browser storage:',
                error
              )
            }),
          3000,
          /*
            According to lodash document, if `option.leading` and `option.trailing` are both true,
            the func is invoked on the trailing edge of the timeout only if the debounced function
            is invoked more than once during the wait timeout.
            So we can guarantee that the final state change will be cached.
            And we set `option.maxWait` to ensure that it will save chache once at least in every 10 secs.
          */
          {
            maxWait: 10000,
            leading: true,
            trailing: true,
          }
        )
      )
      return store
    } catch (err) {
      console.error('Sync-ing with browser storage occurs error:', err)
      return _createStore(rootReducer, preloadedState, storeEnhancer)
    }
  }
  const store = _createStore(rootReducer, preloadedState, storeEnhancer)
  return store
}
