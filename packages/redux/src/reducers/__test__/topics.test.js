/* global describe, it */

import { topic, topics } from '../topics'
import types from '../../constants/action-types'
import { expect } from 'chai'
import pagination from '../../utils/pagination'

const { offsetToPage } = pagination

const topic1 = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
}

const topic2 = {
  id: 'topic-id-2',
  slug: 'topic-slug-2',
}

describe('topic reducer', () => {
  it('should return the initial state', () => {
    expect(topic({}, {})).to.deep.equal({})
  })

  it('should handle GET_A_FULL_TOPIC', () => {
    expect(
      topic(
        {},
        {
          type: types.GET_A_FULL_TOPIC,
          payload: topic1,
        }
      )
    ).to.deep.equal({
      slug: topic1.slug,
      error: null,
      isFetching: false,
    })
  })

  it('should handle ERROR_TO_GET_A_FULL_TOPIC ', () => {
    const err = new Error('error occurs')
    expect(
      topic(
        {},
        {
          type: types.ERROR_TO_GET_A_FULL_TOPIC,
          payload: {
            slug: 'mock-slug',
            error: err,
          },
        }
      )
    ).to.deep.equal({
      slug: 'mock-slug',
      error: err,
      isFetching: false,
    })
  })
})

describe('topics reducer', () => {
  it('should return the initial state', () => {
    expect(topics({}, {})).to.deep.equal({})
  })

  it('should handle GET_TOPICS', () => {
    const total = 10
    const limit = 3
    const offset = 6
    const { page, nPerPage, totalPages } = offsetToPage({
      total,
      limit,
      offset,
    })
    expect(
      topics(
        {},
        {
          type: types.GET_TOPICS,
          payload: {
            items: [topic1, topic2],
            total,
            limit,
            offset,
          },
        }
      )
    ).to.deep.equal({
      items: {
        [page]: [topic1.slug, topic2.slug],
      },
      page,
      nPerPage,
      totalPages,
      error: null,
      isFetching: false,
    })
  })

  it('should handle ERROR_TO_GET_TOPICS', () => {
    const err = new Error('error occurs')
    expect(
      topics(
        {
          items: [topic1.slug, topic2.slug],
          total: 10,
          error: null,
        },
        {
          type: types.ERROR_TO_GET_TOPICS,
          payload: {
            error: err,
          },
        }
      )
    ).to.deep.equal({
      items: [topic1.slug, topic2.slug],
      total: 10,
      error: err,
      isFetching: false,
    })
  })
})
