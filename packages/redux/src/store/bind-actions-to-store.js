import { bindActionCreators } from 'redux'
import actions from '../actions'

/**
 * A store enhancer that will attach a property `actions` consisting of action creators bound to store.
 * Ref. https://redux.js.org/glossary#store-enhancer
 *
 * @export
 * @param {Function} prevStoreCreator
 * @returns
 */
export default function bindActionsToStore(prevStoreCreator) {
  return function(reducer, preloadedState) {
    const _store = prevStoreCreator(reducer, preloadedState)
    _store.actions = bindActionCreators(actions, _store.dispatch)
    return _store
  }
}
