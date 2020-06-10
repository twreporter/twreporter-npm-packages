import types from '../constants/action-types'

// lodash
import filter from 'lodash/filter'
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  filter,
  get,
  merge,
}

/**
 *  @param {import('../typedef').ReduxState.relatedPostsof} state
 *  @param {Object} action
 *  @param {string} action.type
 *  @param {Object} action.payload
 *  @param {string} action.payload.targetEntityId
 *  @param {string[]} action.payload.targetRelatedPostsIds
 *  @param {Object} action.payload.error
 */
export default function relatedPostsOf(state = {}, action = {}) {
  switch (action.type) {
    case types.GET_A_FULL_POST: {
      const post = _.get(action, 'payload.post', {})
      const entityId = _.get(post, 'id', '')
      const relateds = _.get(post, 'relateds', [])
      const topicRelateds = _.get(post, 'topics.relateds', [])
      let more = []

      if (Array.isArray(relateds)) {
        more = more.concat(relateds)
      }

      if (Array.isArray(topicRelateds)) {
        more = more.concat(topicRelateds)
      }

      const allIds = _.get(state, 'allIds', [])
      let nextAllIds = [...allIds]

      if (allIds.indexOf(entityId) === -1) {
        nextAllIds.push(entityId)
      }

      return _.merge({}, state, {
        byId: {
          [entityId]: {
            isFetching: false,
            error: null,
            more,
            items: [],
          },
        },
        allIds: nextAllIds,
      })
    }

    case types.relatedPosts.read.request: {
      const entityId = _.get(action, 'payload.targetEntityId', '')
      return _.merge({}, state, {
        byId: {
          [entityId]: {
            isFetching: true,
          },
        },
      })
    }

    case types.relatedPosts.read.success: {
      const targetEntityId = _.get(action, 'payload.targetEntityId', '')
      const targetRelatedPostsIds = _.get(
        action,
        'payload.targetRelatedPostsIds',
        []
      )

      /** @type {import('../typedef').RelatedPostsOfAnEntity} */
      const relatedPostsOfAnEntity = _.get(state, ['byId', targetEntityId], {})

      // filter out those posts fetched successfully
      const more = _.filter(_.get(relatedPostsOfAnEntity, 'more'), id => {
        return targetRelatedPostsIds.indexOf(id) === -1
      })

      const items = _.get(relatedPostsOfAnEntity, 'items', [])

      return _.merge({}, state, {
        byId: {
          [targetEntityId]: {
            isFetching: false,
            error: null,
            more,
            items: items.concat(targetRelatedPostsIds),
          },
        },
      })
    }

    case types.relatedPosts.read.failure: {
      const targetEntityId = _.get(action, 'payload.targetEntityId', '')
      return _.merge({}, state, {
        byId: {
          [targetEntityId]: {
            isFetching: false,
            error: _.get(action, 'payload.error', null),
          },
        },
      })
    }

    default:
      return state
  }
}
