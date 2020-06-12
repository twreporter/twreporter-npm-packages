/* global expect, test, describe */

import fieldNames from '../../constants/redux-state-field-names'
import reducer from '../entities'
import types from '../../constants/action-types'

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

const topic1 = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
  relateds: [post3.id, post4.id],
  full: true,
}

const topic2 = {
  id: 'topic-id-2',
  slug: 'topic-slug-2',
  full: false,
}

const post1 = {
  id: 'post-id-1',
  slug: 'post-slug-1',
  relateds: [post2.id],
  topics: topic1,
  full: true,
}

describe('entities reducer', () => {
  test('should return the initial state', () => {
    expect(reducer({}, {})).toEqual({})
  })

  test('should handle GET_CONTENT_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {
          posts: {
            byId: {
              [post3.id]: post3,
            },
            slugToId: {
              [post3.slug]: post3.id,
            },
            allIds: [post3.id],
          },
          topics: {
            byId: {
              [topic2.id]: topic2,
            },
            slugToId: {
              [topic2.slug]: topic2.id,
            },
            allIds: [topic2.id],
          },
        },
        {
          type: types.GET_CONTENT_FOR_INDEX_PAGE,
          payload: {
            items: {
              [fieldNames.sections.latestSection]: [post2],
              [fieldNames.sections.editorPicksSection]: [post2],
              [fieldNames.sections.reviewsSection]: [post3],
              [fieldNames.sections.latestTopicSection]: [topic1],
              [fieldNames.sections.topicsSection]: [topic2],
              [fieldNames.sections.photosSection]: [post2],
              [fieldNames.sections.infographicsSection]: [post3],
              [fieldNames.categories.humanRightsAndSociety]: [post4],
            },
          },
        }
      )
    ).toEqual({
      posts: {
        byId: {
          [post2.id]: post2,
          [post3.id]: post3,
          [post4.id]: post4,
        },
        slugToId: {
          [post2.slug]: post2.id,
          [post3.slug]: post3.id,
          [post4.slug]: post4.id,
        },
        allIds: [post3.id, post2.id, post4.id],
      },
      topics: {
        byId: {
          [topic1.id]: topic1,
          [topic2.id]: topic2,
        },
        slugToId: {
          [topic1.slug]: topic1.id,
          [topic2.slug]: topic2.id,
        },
        allIds: [topic2.id, topic1.id],
      },
    })
  })

  test('should handle GET_TOPICS_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_TOPICS_FOR_INDEX_PAGE,
          payload: {
            items: [topic2],
          },
        }
      )
    ).toEqual({
      topics: {
        byId: {
          [topic2.id]: topic2,
        },
        slugToId: {
          [topic2.slug]: topic2.id,
        },
        allIds: [topic2.id],
      },
    })
  })

  test('should handle GET_EDITOR_PICKED_POSTS', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_EDITOR_PICKED_POSTS,
          payload: {
            items: [post2],
          },
        }
      )
    ).toEqual({
      posts: {
        byId: {
          [post2.id]: post2,
        },
        slugToId: {
          [post2.slug]: post2.id,
        },
        allIds: [post2.id],
      },
    })
  })

  test('should handle GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE,
          payload: {
            items: [post2],
          },
        }
      )
    ).toEqual({
      posts: {
        byId: {
          [post2.id]: post2,
        },
        slugToId: {
          [post2.slug]: post2.id,
        },
        allIds: [post2.id],
      },
    })
  })

  test('should handle GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE,
          payload: {
            items: [post2],
          },
        }
      )
    ).toEqual({
      posts: {
        byId: {
          [post2.id]: post2,
        },
        slugToId: {
          [post2.slug]: post2.id,
        },
        allIds: [post2.id],
      },
    })
  })

  test('should handle GET_LISTED_POSTS', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_LISTED_POSTS,
          payload: {
            items: [post2],
          },
        }
      )
    ).toEqual({
      posts: {
        byId: {
          [post2.id]: post2,
        },
        slugToId: {
          [post2.slug]: post2.id,
        },
        allIds: [post2.id],
      },
    })
  })

  test('should handle GET_A_FULL_POST', () => {
    expect(
      reducer(
        {
          posts: {
            byId: {
              [post1.id]: post1,
            },
            slugToId: {
              [post1.slug]: post1.id,
            },
            allIds: [post1.id],
          },
        },
        {
          type: types.GET_A_FULL_POST,
          payload: {
            post: post2,
          },
        }
      )
    ).toEqual({
      posts: {
        byId: {
          [post1.id]: post1,
          [post2.id]: post2,
        },
        slugToId: {
          [post1.slug]: post1.id,
          [post2.slug]: post2.id,
        },
        allIds: [post1.id, post2.id],
      },
    })
  })

  test('should handle GET_A_FULL_TOPIC', () => {
    expect(
      reducer(
        {
          topics: {
            byId: {
              [topic1.id]: topic1,
            },
            slugToId: {
              [topic1.slug]: topic1.id,
            },
            allIds: [topic1.id],
          },
        },
        {
          type: types.GET_A_FULL_TOPIC,
          payload: {
            topic: topic2,
          },
        }
      )
    ).toEqual({
      topics: {
        byId: {
          [topic1.id]: topic1,
          [topic2.id]: topic2,
        },
        slugToId: {
          [topic1.slug]: topic1.id,
          [topic2.slug]: topic2.id,
        },
        allIds: [topic1.id, topic2.id],
      },
    })
  })
})
