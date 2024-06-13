import { bindActionCreators } from 'redux'
import actions from '../actions'

export const bindActionsToStore = (store) => {
  store.actions = bindActionCreators(actions, store.dispatch)
}
