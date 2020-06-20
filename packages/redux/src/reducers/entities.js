/* eslint no-param-reassign: ["error", { "props": false }] */
import fieldNames from '../constants/redux-state-field-names'
import types from '../constants/action-types'

// lodash
import concat from 'lodash/concat'
import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'
import values from 'lodash/values'

const _ = {
  concat,
  filter,
  forEach,
  get,
  map,
  merge,
  values,
}

/**  @type {import('../typedef').ReduxState.entities} */
const defaultState = {
  [fieldNames.postsInEntities]: {
    allIds: [],
    byId: {},
    slugToId: {},
  },
  [fieldNames.topicsInEntities]: {
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
 *  @param {{id: string, slug: string, full: bool}[]} entities - array of entities
 *  @param {bool} [overwriteExisted=false] - not to overwrite existed entity if false, otherwise overwrite
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
 *  @param {import('../typedef').ReduxState.entities} state
 *  @param {Object} action
 *  @param {string} action.type
 *  @param {Object} action.payload
 *  @return {import('../typedef').ReduxState.entities}
 */
function entities(state = defaultState, action = {}) {
  switch (action.type) {
    case types.GET_CONTENT_FOR_INDEX_PAGE: {
      const allPostIds = _.get(
        state,
        [fieldNames.postsInEntities, 'allIds'],
        []
      )
      const allTopicIds = _.get(
        state,
        [fieldNames.topicsInEntities, 'allIds'],
        []
      )

      const fieldKeys = _.concat(
        _.values(fieldNames.sections),
        _.values(fieldNames.categories)
      )
      let posts = []
      let topics = []
      _.forEach(fieldKeys, fieldKey => {
        const entities = _.get(action, ['payload', 'items', fieldKey])
        if (Array.isArray(entities)) {
          if (
            fieldKey !== fieldNames.sections.latestTopicSection &&
            fieldKey !== fieldNames.sections.topicsSection
          ) {
            posts = _.concat(posts, entities)
          } else {
            topics = _.concat(topics, entities)
          }
        }
      })

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: _buildState(allPostIds, posts),
        [fieldNames.topicsInEntities]: _buildState(allTopicIds, topics),
      })
    }

    case types.GET_TOPICS: {
      const allTopicIds = _.get(
        state,
        [fieldNames.topicsInEntities, 'allIds'],
        []
      )
      const topics = _.get(action, 'payload.items', [])

      return _.merge({}, state, {
        [fieldNames.topicsInEntities]: _buildState(allTopicIds, topics),
      })
    }

    case types.GET_A_FULL_POST: {
      const allPostIds = _.get(
        state,
        [fieldNames.postsInEntities, 'allIds'],
        []
      )
      const post = _.get(action, 'payload.post', {})

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: _buildState(allPostIds, post, true),
      })
    }

    case types.GET_A_FULL_TOPIC: {
      const allTopicIds = _.get(
        state,
        [fieldNames.topicsInEntities, 'allIds'],
        []
      )
      const topic = _.get(action, 'payload.topic', {})

      return _.merge({}, state, {
        [fieldNames.topicsInEntities]: _buildState(allTopicIds, topic, true),
      })
    }

    case types.GET_LISTED_POSTS:
    case types.relatedPosts.read.success: {
      const allPostIds = _.get(
        state,
        [fieldNames.postsInEntities, 'allIds'],
        []
      )
      const posts = _.get(action, 'payload.items', [])

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: _buildState(allPostIds, posts),
      })
    }

    case types.featureTopic.read.success: {
      const allPostIds = _.get(
        state,
        [fieldNames.postsInEntities, 'allIds'],
        []
      )

      const allTopicIds = _.get(
        state,
        [fieldNames.topicsInEntities, 'allIds'],
        []
      )

      const posts = _.get(action, 'payload.lastThreeRelatedPosts', [])
      const topics = [_.get(action, 'payload.topic', {})]

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: _buildState(allPostIds, posts),
        [fieldNames.topicsInEntities]: _buildState(allTopicIds, topics),
      })
    }

    default: {
      return state
    }
  }
}

export default entities
