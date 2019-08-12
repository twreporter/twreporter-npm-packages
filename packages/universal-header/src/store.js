import reducer from './reducers/'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'

/**
 * @param {Object} initialState
 * @returns {Object}
 */
export function configureStore(initialState = {}) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export default {
  configureStore,
}
