import types from '../constants/action-types'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

/** @type {import('../typedef').ReduxState.featureTopic} */
const initialState = {
  isFetching: false,
  error: null,
  id: '',
  lastThreeRelatedPostIds: [],
}

/**
 *  @param {import('../typedef').ReduxState.featureTopic} state
 *  @param {Object} action
 *  @param {string} action.type
 *  @param {Object} action.payload
 *  @param {Object} action.payload.topic
 *  @param {Object[]} action.payload.lastThreeRelatedPosts
 *  @param {Object} action.payload.error
 */
export default function featureTopic(state = initialState, action = {}) {
  switch (_.get(action, 'type', '')) {
    case types.featureTopic.read.request: {
      return {
        isFetching: true,
        error: null,
        id: '',
        lastThreeRelatedPostIds: [],
      }
    }

    case types.featureTopic.read.failure: {
      const error = _.get(action, 'payload.error', null)
      return {
        isFetching: false,
        error,
        id: '',
        lastThreeRelatedPostIds: [],
      }
    }

    case types.featureTopic.read.success: {
      const topicId = _.get(action, 'payload.topic.id', '')

      if (!topicId) {
        return state
      }

      const relatedPosts = _.get(action, 'payload.lastThreeRelatedPosts', [])
      const relatedPostIds = _.map(relatedPosts, post => {
        return _.get(post, 'id', '')
      })

      return {
        isFetching: false,
        error: null,
        id: topicId,
        lastThreeRelatedPostIds: relatedPostIds,
      }
    }

    default:
      return state
  }
}
