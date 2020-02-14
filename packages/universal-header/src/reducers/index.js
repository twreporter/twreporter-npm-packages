import { combineReducers } from 'redux'
import authReducer from './auth'

const rootReducer = combineReducers({
  origins: (state = {}) => state,
  auth: authReducer,
})

export default rootReducer
