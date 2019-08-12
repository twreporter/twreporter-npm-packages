/* global describe, context, it */

import { expect } from 'chai'
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
  context('denormalize posts', () => {
    it('should handle empty array', () => {
      expect(denormalizePosts([], postEntities)).to.deep.equal([])
    })
    it('should handle single slug', () => {
      expect(denormalizePosts('post-slug-1', postEntities)).to.deep.equal([
        {
          slug: 'post-slug-1',
          relateds: ['post-slug-2', 'post-slug-3'],
        },
      ])
    })
    it('should handle multiple slugs', () => {
      expect(
        denormalizePosts(['post-slug-1', 'post-slug-2'], postEntities)
      ).to.deep.equal([
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
    it('shoulde return new object', () => {
      const post = denormalizePosts(['post-slug-1'], postEntities)
      expect(post).to.not.equal(postEntities['post-slug-1'])
      expect(post[0].relateds).to.not.equal(
        postEntities['post-slug-1'].relateds
      )
    })
  })
  context('denormalize topics', () => {
    it('should handle empty array', () => {
      expect(denormalizeTopics([], topicEntities, postEntities)).to.deep.equal(
        []
      )
    })
    it('should handle single slug', () => {
      expect(
        denormalizeTopics('topic-slug-1', topicEntities, postEntities)
      ).to.deep.equal([
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
    it('should handle multiple slugs', () => {
      expect(
        denormalizeTopics(
          ['topic-slug-1', 'topic-slug-2'],
          topicEntities,
          postEntities
        )
      ).to.deep.equal([
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
    it('shoulde return new object', () => {
      const topic = denormalizeTopics(
        ['topic-slug-1'],
        topicEntities,
        postEntities
      )
      expect(topic[0]).to.not.equal(topicEntities['topic-slug-1'])
      expect(topic[0].relateds).to.not.equal(
        topicEntities['topic-slug-1'].relateds
      )
    })
  })
})
