/* global expect, test, describe */

import fieldNames from '../../constants/redux-state-field-names'
import reducer from '../entities'
import types from '../../constants/action-types'

const metaPost1 = {
  id: 'post-id-1',
  slug: 'post-slug-1',
  full: false,
}

const metaPost2 = {
  id: 'post-id-2',
  slug: 'post-slug-2',
  full: false,
}

const metaPost3 = {
  id: 'post-id-3',
  slug: 'post-slug-3',
  full: false,
}

const metaPost4 = {
  id: 'post-id-4',
  slug: 'post-slug-4',
  full: false,
}

const metaTopic1 = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
  relateds: [metaPost1.id, metaPost3.id, metaPost4.id],
  full: false,
}

const fullTopic1 = Object.assign({}, metaTopic1, {
  full: true,
})

const metaTopic2 = {
  id: 'topic-id-2',
  slug: 'topic-slug-2',
  relateds: [],
  full: false,
}

const fullPost1 = Object.assign({}, metaPost1, {
  relateds: [metaPost2.id],
  topics: metaTopic1,
  full: true,
})

const initialState = {
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

describe('entities reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('should return the original state', () => {
    const originalState = {
      [fieldNames.postsInEntities]: {
        allIds: [metaPost2.id],
        byId: {
          [metaPost2.id]: metaPost2,
        },
        slugToId: {
          [metaPost2.id]: metaPost2.slug,
        },
      },
      [fieldNames.topicsInEntities]: {
        allIds: [],
        byId: {},
        slugToId: {},
      },
    }

    expect(reducer(originalState, {})).toEqual(originalState)
  })

  describe('should handle `types.indexPage.read.success`', () => {
    test('when state is initialState', () => {
      expect(
        reducer(initialState, {
          type: types.indexPage.read.success,
          payload: {
            items: {
              [fieldNames.sections.latestSection]: [metaPost1],
              [fieldNames.sections.editorPicksSection]: [metaPost2],
              [fieldNames.sections.reviewsSection]: [metaPost3],
              [fieldNames.sections.latestTopicSection]: [metaTopic1],
              [fieldNames.sections.topicsSection]: [metaTopic2],
              [fieldNames.sections.photosSection]: [metaPost4],
              [fieldNames.sections.infographicsSection]: [],
              [fieldNames.categories.humanRightsAndSociety]: [],
            },
          },
        })
      ).toEqual({
        posts: {
          byId: {
            [metaPost1.id]: metaPost1,
            [metaPost2.id]: metaPost2,
            [metaPost3.id]: metaPost3,
            [metaPost4.id]: metaPost4,
          },
          slugToId: {
            [metaPost1.slug]: metaPost1.id,
            [metaPost2.slug]: metaPost2.id,
            [metaPost3.slug]: metaPost3.id,
            [metaPost4.slug]: metaPost4.id,
          },
          allIds: expect.arrayContaining([
            metaPost1.id,
            metaPost2.id,
            metaPost3.id,
            metaPost4.id,
          ]),
        },
        topics: {
          byId: {
            [metaTopic1.id]: metaTopic1,
            [metaTopic2.id]: metaTopic2,
          },
          slugToId: {
            [metaTopic1.slug]: metaTopic1.id,
            [metaTopic2.slug]: metaTopic2.id,
          },
          allIds: [metaTopic1.id, metaTopic2.id],
        },
      })
    })

    test('without overwriting existed entities', () => {
      const state = {
        [fieldNames.postsInEntities]: {
          byId: {
            [fullPost1.id]: fullPost1,
          },
          slugToId: {
            [fullPost1.slug]: fullPost1.id,
          },
          allIds: [fullPost1.id],
        },
        [fieldNames.topicsInEntities]: {
          byId: {
            [fullTopic1.id]: fullTopic1,
          },
          slugToId: {
            [fullTopic1.slug]: fullTopic1.id,
          },
          allIds: [fullTopic1.id],
        },
      }
      expect(
        reducer(state, {
          type: types.indexPage.read.success,
          payload: {
            items: {
              [fieldNames.sections.latestSection]: [metaPost1],
              [fieldNames.sections.latestTopicSection]: [metaTopic1],
            },
          },
        })
      ).toEqual(state)
    })
  })

  test('should handle types.postsByListId.read.success', () => {
    expect(
      reducer(
        {},
        {
          type: types.postsByListId.read.success,
          payload: {
            items: [metaPost2],
          },
        }
      )
    ).toEqual({
      posts: {
        byId: {
          [metaPost2.id]: metaPost2,
        },
        slugToId: {
          [metaPost2.slug]: metaPost2.id,
        },
        allIds: [metaPost2.id],
      },
    })
  })

  test('should handle types.topics.read.success', () => {
    expect(
      reducer(
        {},
        {
          type: types.topics.read.success,
          payload: {
            items: [metaTopic1, metaTopic2],
          },
        }
      )
    ).toEqual({
      topics: {
        byId: {
          [metaTopic1.id]: metaTopic1,
          [metaTopic2.id]: metaTopic2,
        },
        slugToId: {
          [metaTopic1.slug]: metaTopic1.id,
          [metaTopic2.slug]: metaTopic2.id,
        },
        allIds: [metaTopic1.id, metaTopic2.id],
      },
    })
  })

  test('should handle types.selectedPost.read.success', () => {
    expect(
      reducer(
        {
          posts: {
            byId: {
              [metaPost1.id]: metaPost1,
            },
            slugToId: {
              [metaPost1.slug]: metaPost1.id,
            },
            allIds: [metaPost1.id],
          },
        },
        {
          type: types.selectedPost.read.success,
          payload: {
            post: fullPost1,
          },
        }
      )
    ).toEqual({
      posts: {
        byId: {
          [fullPost1.id]: fullPost1,
        },
        slugToId: {
          [fullPost1.slug]: fullPost1.id,
        },
        allIds: [fullPost1.id],
      },
    })
  })

  test('should handle types.selectedTopic.read.success', () => {
    expect(
      reducer(
        {
          topics: {
            byId: {
              [metaTopic1.id]: metaTopic1,
            },
            slugToId: {
              [metaTopic1.slug]: metaTopic1.id,
            },
            allIds: [metaTopic1.id],
          },
        },
        {
          type: types.selectedTopic.read.success,
          payload: {
            topic: fullTopic1,
          },
        }
      )
    ).toEqual({
      topics: {
        byId: {
          [fullTopic1.id]: fullTopic1,
        },
        slugToId: {
          [fullTopic1.slug]: fullTopic1.id,
        },
        allIds: [fullTopic1.id],
      },
    })
  })

  test('should handle `types.featureTopic.read.success`', () => {
    expect(
      reducer(
        {
          topics: {
            byId: {
              [fullTopic1.id]: fullTopic1,
            },
            slugToId: {
              [fullTopic1.slug]: fullTopic1.id,
            },
            allIds: [fullTopic1.id],
          },
          posts: {
            byId: {
              [fullPost1.id]: fullPost1,
            },
            slugToId: {
              [fullPost1.slug]: fullPost1.id,
            },
            allIds: [fullPost1.id],
          },
        },
        {
          type: types.featureTopic.read.success,
          payload: {
            topic: metaTopic1,
            lastThreeRelatedPosts: [metaPost1, metaPost2, metaPost3],
          },
        }
      )
    ).toEqual({
      topics: {
        byId: {
          [fullTopic1.id]: fullTopic1,
        },
        slugToId: {
          [fullTopic1.slug]: fullTopic1.id,
        },
        allIds: [fullTopic1.id],
      },
      posts: {
        byId: {
          [fullPost1.id]: fullPost1,
          [metaPost2.id]: metaPost2,
          [metaPost3.id]: metaPost3,
        },
        slugToId: {
          [fullPost1.slug]: fullPost1.id,
          [metaPost2.slug]: metaPost2.id,
          [metaPost3.slug]: metaPost3.id,
        },
        allIds: [fullPost1.id, metaPost2.id, metaPost3.id],
      },
    })
  })
})
