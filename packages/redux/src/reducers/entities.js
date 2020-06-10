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

function normalizeTopic(topic, postEntities, topicEntities) {
  if (typeof topic !== 'object') {
    return {
      postEntities,
      topicEntities,
    }
  }

  if (topic.full) {
    const relatedPosts = _.get(topic, 'relateds', [])

    topic.relateds = relatedPosts.map(post => {
      if (typeof post === 'object') {
        if (!postEntities[post.slug] || post.full) {
          postEntities[post.slug] = post
        }
      }
      return _.get(post, 'slug', '')
    })
  }

  if (!topicEntities[topic.slug] || topic.full) {
    topicEntities[topic.slug] = topic
  }

  return {
    postEntities,
    topicEntities,
  }
}

function normalizePost(post, _postEntities, _topicEntities) {
  let postEntities = _postEntities
  let topicEntities = _topicEntities
  if (typeof post !== 'object') {
    return {
      postEntities,
      topicEntities,
    }
  }

  const postSlug = post.slug

  if (post.full) {
    const topic = _.get(post, 'topics')
    const normalizedObj = normalizeTopic(topic, postEntities, topicEntities)
    postEntities = normalizedObj.postEntities
    topicEntities = normalizedObj.topicEntities
    post.topics = _.get(topic, 'slug', topic)

    post.relateds = _.map(post.relateds, _post => {
      if (typeof _post === 'object') {
        if (!postEntities[_post.slug] || _post.full) {
          postEntities[_post.slug] = _post
        }
      }
      return _.get(_post, 'slug', _post)
    })
  }

  if (!postEntities[postSlug] || post.full) {
    postEntities[postSlug] = post
  }

  return {
    postEntities,
    topicEntities,
  }
}

function normalizeAssets(assets, _postEntities, _topicEntities, style) {
  let postEntities = _postEntities
  let topicEntities = _topicEntities
  if (!Array.isArray(assets)) {
    return {
      postEntities,
      topicEntities,
    }
  }

  const normalize = style === 'post' ? normalizePost : normalizeTopic

  assets.forEach(asset => {
    const normalizedObj = normalize(asset, postEntities, topicEntities)
    postEntities = normalizedObj.postEntities
    topicEntities = normalizedObj.topicEntities
  })

  return {
    postEntities,
    topicEntities,
  }
}

// This will normalize the posts and topics.
// EX:
// action = {
//  latest: [{
//    slug: 'post_1'
//    is_feature: false,
//    style: 'article'
//  }, {
//    slug: 'post_2'
//    is_feature: false,
//    style: 'article'
//  }],
//  editor_picks: [{
//    slug: 'post_3',
//    is_feature: true
//    style: 'article'
//  }],
//  reviews: [{
//    slug: 'post_4',
//    is_feature: false
//    style: 'review'
//  }],
//  latest_topics: {
//    slug: 'topic_1',
//    relateds: [{
//      slug: 'post_5'
//      is_feature: false
//      style: 'article'
//    },{
//      slug: 'post_6'
//      is_feature: false
//      style: 'article'
//    }]
//  }
// }
//
// the result will be
// {
//   posts: {
//    'post_1': {
//      slug: 'post_1'
//      is_feature: false,
//      style: 'article'
//    },
//    'post_2': {
//      slug: 'post_2'
//      is_feature: false,
//      style: 'article'
//    },
//    'post_3': {
//      slug: 'post_3'
//      is_feature: true,
//      style: 'article'
//    },
//    'post_4': {
//      slug: 'post_4'
//      is_feature: false,
//      style: 'review'
//    },
//    'post_5': {
//      slug: 'post_5'
//      is_feature: false,
//      style: 'article'
//    },
//    'post_6': {
//      slug: 'post_6'
//      is_feature: false,
//      style: 'article'
//    },
//   },
//   topics: {
//      'topic_1': {
//        slug: 'topic_1',
//        relateds: [ 'post_5', 'post_6']
//      }
//   }
// }
function entities(state = {}, action = {}) {
  let payload
  let normalizedObj = {
    postEntities: _.get(state, fieldNames.postsInEntities, {}),
    topicEntities: _.get(state, fieldNames.topicsInEntities, {}),
  }
  switch (action.type) {
    case types.GET_CONTENT_FOR_INDEX_PAGE: {
      payload = action.payload

      const sections = _.filter(_.values(fieldNames.sections), section => {
        return (
          section !== fieldNames.sections.latestTopicSection &&
          section !== fieldNames.sections.topicsSection
        )
      })
      const categories = _.values(fieldNames.categories)
      const fields = _.concat(sections, categories)

      fields.forEach(field => {
        const posts = _.get(payload, ['items', field], [])
        normalizedObj = normalizeAssets(
          posts,
          normalizedObj.postEntities,
          normalizedObj.topicEntities,
          'post'
        )
      })

      normalizedObj = normalizeTopic(
        _.get(payload, ['items', fieldNames.sections.latestTopicSection, 0]),
        normalizedObj.postEntities,
        normalizedObj.topicEntities
      )

      normalizedObj = normalizeAssets(
        _.get(payload, ['items', fieldNames.sections.topicsSection], []),
        normalizedObj.postEntities,
        normalizedObj.topicEntities,
        'topic'
      )

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: normalizedObj.postEntities,
        [fieldNames.topicsInEntities]: normalizedObj.topicEntities,
      })
    }

    case types.GET_TOPICS:
    case types.GET_TOPICS_FOR_INDEX_PAGE: {
      payload = _.get(action, 'payload.items', [])

      normalizedObj = normalizeAssets(
        payload,
        normalizedObj.postEntities,
        normalizedObj.topicEntities,
        'topic'
      )

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: normalizedObj.postEntities,
        [fieldNames.topicsInEntities]: normalizedObj.topicEntities,
      })
    }

    case types.GET_EDITOR_PICKED_POSTS:
    case types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE:
    case types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE:
    case types.GET_LISTED_POSTS: {
      payload = _.get(action, 'payload.items', [])

      normalizedObj = normalizeAssets(
        payload,
        normalizedObj.postEntities,
        normalizedObj.topicEntities,
        'post'
      )

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: normalizedObj.postEntities,
        [fieldNames.topicsInEntities]: normalizedObj.topicEntities,
      })
    }

    case types.GET_A_FULL_POST: {
      const post = _.get(action, 'payload.post', {})
      normalizedObj = normalizePost(
        post,
        normalizedObj.postEntities,
        normalizedObj.topicEntities
      )

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: normalizedObj.postEntities,
        [fieldNames.topicsInEntities]: normalizedObj.topicEntities,
      })
    }

    case types.GET_A_FULL_TOPIC: {
      const topic = _.get(action, 'payload.topic', {})
      normalizedObj = normalizeTopic(
        topic,
        normalizedObj.postEntities,
        normalizedObj.topicEntities
      )

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: normalizedObj.postEntities,
        [fieldNames.topicsInEntities]: normalizedObj.topicEntities,
      })
    }

    case types.relatedsOf.post.read.success: {
      const allIds = _.get(state, [fieldNames.postsInEntities, 'allIds'], [])
      const relateds = _.get(action, 'payload.items', [])

      const byIds = {}
      const postIds = []
      const slugToId = {}

      _.forEach(relateds, relatedPost => {
        const id = _.get(relatedPost, 'id', '')
        const slug = _.get(relatedPost, 'slug', '')
        if (allIds.indexOf(id) === -1) {
          postIds.push(id)
          slugToId[slug] = id
          byIds[id] = relatedPost
        }
      })

      return _.merge({}, state, {
        [fieldNames.postsInEntities]: {
          byIds,
          slugToId,
          allIds: allIds.concat(postIds),
        },
      })
    }

    default: {
      return state
    }
  }
}

export default entities
