/* global describe, it */

import fieldNames from '../../constants/redux-state-field-names'
import reducer from '../entities'
import types from '../../constants/action-types'

// lodash
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

import { expect } from 'chai'

const _ = {
  cloneDeep,
  merge,
}

const post2 = {
  id: 'post-id-2',
  slug: 'post-slug-2',
  full: false,
}

const post3 = {
  id: 'post-id-3',
  slug: 'post-slug-3',
  full: false,
}

const post4 = {
  id: 'post-id-4',
  slug: 'post-slug-4',
  full: false,
}

const fullTopic = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
  relateds: [post3, post4],
  full: true,
}

const nonFullTopic = {
  id: 'topic-id-2',
  slug: 'topic-slug-2',
  full: false,
}

const post1 = {
  id: 'post-id-1',
  slug: 'post-slug-1',
  relateds: [post2],
  topics: fullTopic,
  full: true,
}

describe('entities reducer', () => {
  it('should return the initial state', () => {
    expect(reducer({}, {})).to.deep.equal({})
  })

  it('should handle GET_CONTENT_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {
          posts: {
            [post3.slug]: post3,
          },
          topics: {
            [nonFullTopic.slug]: nonFullTopic,
          },
        },
        {
          type: types.GET_CONTENT_FOR_INDEX_PAGE,
          payload: {
            [fieldNames.sections.latestSection]: _.cloneDeep([post2]),
            [fieldNames.sections.editorPicksSection]: _.cloneDeep([post2]),
            [fieldNames.sections.reviewsSection]: _.cloneDeep([post3]),
            [fieldNames.sections.latestTopicSection]: _.cloneDeep([fullTopic]),
            [fieldNames.sections.topicsSection]: _.cloneDeep([nonFullTopic]),
            [fieldNames.sections.photosSection]: _.cloneDeep([post2]),
            [fieldNames.sections.infographicsSection]: _.cloneDeep([post3]),
            [fieldNames.categories.humanRightsAndSociety]: _.cloneDeep([post4]),
          },
        }
      )
    ).to.deep.equal({
      posts: {
        [post2.slug]: post2,
        [post3.slug]: post3,
        [post4.slug]: post4,
      },
      topics: {
        [fullTopic.slug]: {
          id: fullTopic.id,
          slug: fullTopic.slug,
          full: fullTopic.full,
          relateds: [post3.slug, post4.slug],
        },
        [nonFullTopic.slug]: nonFullTopic,
      },
    })
  })

  it('should handle GET_TOPICS_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_TOPICS_FOR_INDEX_PAGE,
          payload: {
            items: _.cloneDeep([nonFullTopic]),
          },
        }
      )
    ).to.deep.equal({
      posts: {},
      topics: {
        [nonFullTopic.slug]: nonFullTopic,
      },
    })
  })

  it('should handle GET_EDITOR_PICKED_POSTS', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_EDITOR_PICKED_POSTS,
          payload: {
            items: _.cloneDeep([post2]),
          },
        }
      )
    ).to.deep.equal({
      posts: {
        [post2.slug]: post2,
      },
      topics: {},
    })
  })

  it('should handle GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE,
          payload: {
            items: _.cloneDeep([post2]),
          },
        }
      )
    ).to.deep.equal({
      posts: {
        [post2.slug]: post2,
      },
      topics: {},
    })
  })

  it('should handle GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE,
          payload: {
            items: _.cloneDeep([post2]),
          },
        }
      )
    ).to.deep.equal({
      posts: {
        [post2.slug]: post2,
      },
      topics: {},
    })
  })

  it('should handle GET_LISTED_POSTS', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_LISTED_POSTS,
          payload: {
            items: _.cloneDeep([post2]),
          },
        }
      )
    ).to.deep.equal({
      posts: {
        [post2.slug]: post2,
      },
      topics: {},
    })
  })

  it('should handle GET_A_FULL_POST', () => {
    const post = _.cloneDeep(post1)

    expect(
      reducer(
        {},
        {
          type: types.GET_A_FULL_POST,
          payload: post,
        }
      )
    ).to.deep.equal({
      posts: {
        [post1.slug]: {
          slug: post.slug,
          id: post.id,
          relateds: [post2.slug],
          topics: fullTopic.slug,
          full: true,
        },
        [post2.slug]: post2,
        [post3.slug]: post3,
        [post4.slug]: post4,
      },
      topics: {
        [fullTopic.slug]: {
          id: 'topic-id-1',
          slug: 'topic-slug-1',
          relateds: [post3.slug, post4.slug],
          full: true,
        },
      },
    })
  })

  it('should handle GET_A_FULL_TOPIC', () => {
    const topic = _.cloneDeep(fullTopic)
    expect(
      reducer(
        {},
        {
          type: types.GET_A_FULL_TOPIC,
          payload: topic,
        }
      )
    ).to.deep.equal({
      posts: {
        [post3.slug]: post3,
        [post4.slug]: post4,
      },
      topics: {
        [topic.slug]: topic,
      },
    })
  })
})
