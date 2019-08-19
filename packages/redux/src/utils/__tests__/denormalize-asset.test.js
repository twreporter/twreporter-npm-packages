/* global expect, test, describe */

import { denormalizePosts, denormalizeTopics } from '../denormalize-asset'

describe('denormalize assets testing', () => {
  const postEntities = {
    'post-slug-1': {
      slug: 'post-slug-1',
      relateds: ['post-slug-2', 'post-slug-3'],
    },
    'post-slug-2': {
      slug: 'post-slug-2',
      relateds: ['post-slug-1', 'post-slug-3'],
    },
    'post-slug-3': {
      slug: 'post-slug-3',
      relateds: ['post-slug-1', 'post-slug-2'],
    },
    'post-slug-4': {
      slug: 'post-slug-4',
      topics: 'topic-slug-1',
    },
  }
  const topicEntities = {
    'topic-slug-1': {
      slug: 'topic-slug-1',
      relateds: ['post-slug-4'],
    },
    'topic-slug-2': {
      slug: 'topic-slug-2',
      relateds: ['post-slug-1', 'post-slug-2'],
    },
  }
  describe('denormalize posts', () => {
    test('should handle empty array', () => {
      expect(denormalizePosts([], postEntities)).toEqual([])
    })
    test('should handle single slug', () => {
      expect(denormalizePosts('post-slug-1', postEntities)).toEqual([
        {
          slug: 'post-slug-1',
          relateds: ['post-slug-2', 'post-slug-3'],
        },
      ])
    })
    test('should handle multiple slugs', () => {
      expect(
        denormalizePosts(['post-slug-1', 'post-slug-2'], postEntities)
      ).toEqual([
        {
          slug: 'post-slug-1',
          relateds: ['post-slug-2', 'post-slug-3'],
        },
        {
          slug: 'post-slug-2',
          relateds: ['post-slug-1', 'post-slug-3'],
        },
      ])
    })
    test('shoulde return new object', () => {
      const post = denormalizePosts(['post-slug-1'], postEntities)
      expect(post).not.toBe(postEntities['post-slug-1'])
      expect(post[0].relateds).not.toBe(postEntities['post-slug-1'].relateds)
    })
  })
  describe('denormalize topics', () => {
    test('should handle empty array', () => {
      expect(denormalizeTopics([], topicEntities, postEntities)).toEqual([])
    })
    test('should handle single slug', () => {
      expect(
        denormalizeTopics('topic-slug-1', topicEntities, postEntities)
      ).toEqual([
        {
          slug: 'topic-slug-1',
          relateds: [
            {
              slug: 'post-slug-4',
              topics: 'topic-slug-1',
            },
          ],
        },
      ])
    })
    test('should handle multiple slugs', () => {
      expect(
        denormalizeTopics(
          ['topic-slug-1', 'topic-slug-2'],
          topicEntities,
          postEntities
        )
      ).toEqual([
        {
          slug: 'topic-slug-1',
          relateds: [
            {
              slug: 'post-slug-4',
              topics: 'topic-slug-1',
            },
          ],
        },
        {
          slug: 'topic-slug-2',
          relateds: [
            {
              slug: 'post-slug-1',
              relateds: ['post-slug-2', 'post-slug-3'],
            },
            {
              slug: 'post-slug-2',
              relateds: ['post-slug-1', 'post-slug-3'],
            },
          ],
        },
      ])
    })
    test('shoulde return new object', () => {
      const topic = denormalizeTopics(
        ['topic-slug-1'],
        topicEntities,
        postEntities
      )
      expect(topic[0]).not.toBe(topicEntities['topic-slug-1'])
      expect(topic[0].relateds).not.toBe(topicEntities['topic-slug-1'].relateds)
    })
  })
})
