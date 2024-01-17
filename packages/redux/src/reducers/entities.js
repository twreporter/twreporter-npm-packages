/* eslint no-param-reassign: ["error", { "props": false }] */
import fieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'

// lodash
import concat from 'lodash/concat'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import values from 'lodash/values'
import snakeCase from 'lodash/snakeCase'
import find from 'lodash/find'

const _ = {
  concat,
  forEach,
  get,
  values,
  snakeCase,
  find,
}

const defaultState = {
  posts: {
    allIds: [],
    byId: {},
    slugToId: {},
  },
  topics: {
    allIds: [],
    byId: {},
    slugToId: {},
  },
}

/** This function will check each entity in `entities` argument,
 *  if the `entity.id` is not in `allIds` argument array or
 *  `overwriteExisted` argument is true , then we will put this entity in the returned object.
 *
 *  @param {string[]} allIds - array of entity ids
 *  @param {{id: string, slug: string, full: boolean}[]} entities - array of entities
 *  @param {boolean} [overwriteExisted=false] - not to overwrite existed entity if false, otherwise overwrite
 *  @return {{byId: Object, slugToId: Object, allIds: string[]}}
 */
function _buildState(allIds, entities, overwriteExisted = false) {
  let _entities = []

  if (!Array.isArray(entities) && typeof entities === 'object') {
    _entities.push(entities)
  } else {
    _entities = entities
  }

  const byId = {}
  const ids = _.concat(allIds)
  const slugToId = {}

  _.forEach(_entities, entity => {
    const id = _.get(entity, 'id', '')
    const slug = _.get(entity, 'slug', '')
    if (ids.indexOf(id) === -1) {
      ids.push(id)
      slugToId[slug] = id
      byId[id] = entity
    } else if (overwriteExisted) {
      slugToId[slug] = id
      byId[id] = entity
    }
  })

  return {
    byId,
    slugToId,
    allIds: ids,
  }
}

/**
 *  @param {import('../typedef').Entities} [state=defaultState]
 *  @param {Object} [action={}]
 *  @param {string} [action.type]
 *  @param {Object} [action.payload]
 *  @return {import('../typedef').Entities}
 */
function entities(state = defaultState, action = {}) {
  switch (action.type) {
    case types.indexPage.read.success: {
      const allPostIds = state.posts.allIds
      const allTopicIds = state.topics.allIds

      const fieldKeys = _.concat(
        _.values(fieldNames.sections),
        _.values(fieldNames.categories)
      )
      let posts = []
      let topics = []
      _.forEach(fieldKeys, fieldKey => {
        const key = _.snakeCase(fieldKey)
        const entities = _.get(action, ['payload', 'items', key])
        if (Array.isArray(entities)) {
          if (
            key !== fieldNames.sections.latestTopicSection &&
            key !== fieldNames.sections.topicsSection
          ) {
            posts = _.concat(posts, entities)
          } else {
            topics = _.concat(topics, entities)
          }
        }
      })

      const newStateForPosts = _buildState(allPostIds, posts)
      const newStateForTopics = _buildState(allTopicIds, topics)

      return {
        posts: {
          allIds: newStateForPosts.allIds,
          byId: Object.assign({}, state.posts.byId, newStateForPosts.byId),
          slugToId: Object.assign(
            {},
            state.posts.slugToId,
            newStateForPosts.slugToId
          ),
        },
        topics: {
          allIds: newStateForTopics.allIds,
          byId: Object.assign({}, state.topics.byId, newStateForTopics.byId),
          slugToId: Object.assign(
            {},
            state.topics.slugToId,
            newStateForTopics.slugToId
          ),
        },
      }
    }

    case types.topics.read.success: {
      const allTopicIds = state.topics.allIds
      const topics = _.get(action, 'payload.items', [])

      const { allIds, byId, slugToId } = _buildState(allTopicIds, topics)

      return {
        ...state,
        topics: {
          allIds,
          byId: Object.assign({}, state.topics.byId, byId),
          slugToId: Object.assign({}, state.topics.slugToId, slugToId),
        },
      }
    }

    case types.selectedPost.read.success: {
      const allPostIds = state.posts.allIds
      const post = _.get(action, 'payload.post', {})

      const { allIds, byId, slugToId } = _buildState(allPostIds, post, true)

      return {
        ...state,
        posts: {
          allIds,
          byId: Object.assign({}, state.posts.byId, byId),
          slugToId: Object.assign({}, state.posts.slugToId, slugToId),
        },
      }
    }

    case types.selectedTopic.read.success: {
      const allTopicIds = state.topics.allIds
      const topic = _.get(action, 'payload.topic', {})

      const { allIds, byId, slugToId } = _buildState(allTopicIds, topic, true)

      return {
        ...state,
        topics: {
          allIds,
          byId: Object.assign({}, state.topics.byId, byId),
          slugToId: Object.assign({}, state.topics.slugToId, slugToId),
        },
      }
    }

    case types.postsByListId.read.success:
    case types.relatedPosts.read.success: {
      const allPostIds = state.posts.allIds
      const posts = _.get(action, 'payload.items', [])

      const { allIds, byId, slugToId } = _buildState(allPostIds, posts)

      return {
        ...state,
        posts: {
          allIds,
          byId: Object.assign({}, state.posts.byId, byId),
          slugToId: Object.assign({}, state.posts.slugToId, slugToId),
        },
      }
    }

    case types.featureTopic.read.success: {
      const allPostIds = state.posts.allIds
      const allTopicIds = state.topics.allIds

      const posts = _.get(action, 'payload.lastThreeRelatedPosts', [])
      const topics = [_.get(action, 'payload.topic', {})]

      const newStateForPosts = _buildState(allPostIds, posts)
      const newStateForTopics = _buildState(allTopicIds, topics)

      return {
        posts: {
          allIds: newStateForPosts.allIds,
          byId: Object.assign({}, state.posts.byId, newStateForPosts.byId),
          slugToId: Object.assign(
            {},
            state.posts.slugToId,
            newStateForPosts.slugToId
          ),
        },
        topics: {
          allIds: newStateForTopics.allIds,
          byId: Object.assign({}, state.topics.byId, newStateForTopics.byId),
          slugToId: Object.assign(
            {},
            state.topics.slugToId,
            newStateForTopics.slugToId
          ),
        },
      }
    }

    case types.singleBookmark.delete.success: {
      const bookmarkId = _.get(action, 'payload.bookmarkID')
      if (!bookmarkId) {
        return state
      }
      const targetPost = _.find(_.get(state, 'posts.byId', {}), post => {
        return post.bookmarkId === bookmarkId
      })
      if (targetPost && targetPost.bookmarkId) {
        targetPost.bookmarkId = ''
      }
      return state
    }

    case types.singleBookmark.create.success: {
      const bookmarkId = _.get(action, 'payload.data.record.id')
      const slug = _.get(action, 'payload.data.record.slug')
      if (!bookmarkId || !slug) {
        return state
      }
      const targetPost = _.find(_.get(state, 'posts.byId', {}), post => {
        return post.slug === slug
      })
      if (targetPost) {
        targetPost.bookmarkId = bookmarkId
      }
      return state
    }

    default: {
      return state
    }
  }
}

export default entities
