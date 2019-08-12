import StandaloneHeader from './standalone-header'
import Header from './containers/header'
import authAction from './actions/auth'
import authReducer from './reducers/auth'
import actionTypes from './constants/action-types'

export default {
  Header,
  StandaloneHeader,
  actionTypes,
  actions: {
    auth: authAction,
  },
  reducers: {
    auth: authReducer,
  },
}

/* eslint no-console:0 */
// import React from 'react'
// import ReactDOM from 'react-dom'
// import StandaloneHeader from './standalone-header'
// import reduxStore from './store'
// import { Provider } from 'react-redux'

// const store = reduxStore.configureStore()

// ReactDOM.hydrate((
// <Provider store={store}>
// <StandaloneHeader
// theme="normal"
// releaseBranch="staging"
/// >
// <StandaloneHeader
// theme="photography"
// releaseBranch="release"
/// >
// <StandaloneHeader
// theme="transparent"
/// >
// </Provider>
// ), document.getElementById('app'))
