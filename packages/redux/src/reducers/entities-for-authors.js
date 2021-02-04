import actionTypes from '../constants/action-types'
// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

/**
 *  @param {import('../typedef').EntitiesForAuthors} state - redux state
 *  @param {Object} state.articles - article entities
 *  @param {Object} state.authors - author entities
 *  @param {Object} action - redux action
 *  @param {string} action.type
 *  @param {import('../typedef').EntitiesForAuthors.(authors|articles)} action.payload.normalizedData.entities
 */
export default function entitiesForAuthors(state = {}, action) {
  const entities = _.get(action, 'payload.normalizedData.entities')
  if (entities) {
    switch (action.type) {
      case actionTypes.FETCH_AUTHOR_COLLECTION_SUCCESS:
        return _.merge({}, state, { articles: entities.articles })
      default:
        return _.merge({}, state, entities)
    }
  }
  return state
}
