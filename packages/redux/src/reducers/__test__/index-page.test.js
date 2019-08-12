/* global describe, it */

import fieldNames from '../../constants/redux-state-field-names'
import reducer from '../index-page'
import types from '../../constants/action-types'

// lodash
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

import { expect } from 'chai'

const _ = {
  cloneDeep,
  merge,
}

const post1 = {
  id: 'post-id-1',
  slug: 'post-slug-1',
}

const post2 = {
  id: 'post-id-2',
  slug: 'post-slug-2',
}

const post3 = {
  id: 'post-id-3',
  slug: 'post-slug-3',
}

const post4 = {
  id: 'post-id-4',
  slug: 'post-slug-4',
}

const fullTopic = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
  relateds: [post3, post4],
  full: true,
}

const nonFullTopic = {
  id: 'topic-id-1',
  slug: 'topic-slug-1',
  full: false,
}

describe('index-page reducer', () => {
  it('should return the initial state', () => {
    expect(reducer({}, {})).to.deep.equal({})
  })

  it('should handle GET_CONTENT_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {
          [fieldNames.sections.latestTopicSection]: 'topic-slug-3',
        },
        {
          type: types.GET_CONTENT_FOR_INDEX_PAGE,
          payload: {
            [fieldNames.sections.latestSection]: _.cloneDeep([post1, post2]),
            [fieldNames.sections.editorPicksSection]: _.cloneDeep([post4]),
            [fieldNames.sections.reviewsSection]: _.cloneDeep([post3]),
            [fieldNames.sections.latestTopicSection]: _.cloneDeep([fullTopic]),
            [fieldNames.sections.topicsSection]: _.cloneDeep([
              fullTopic,
              nonFullTopic,
            ]),
            [fieldNames.sections.photosSection]: _.cloneDeep([post1, post4]),
            [fieldNames.sections.infographicsSection]: _.cloneDeep([
              post2,
              post3,
            ]),
          },
        }
      )
    ).to.deep.equal({
      [fieldNames.sections.latestSection]: [post1.slug, post2.slug],
      [fieldNames.sections.editorPicksSection]: [post4.slug],
      [fieldNames.sections.reviewsSection]: [post3.slug],
      [fieldNames.sections.latestTopicSection]: [fullTopic.slug],
      [fieldNames.sections.topicsSection]: [fullTopic.slug, nonFullTopic.slug],
      [fieldNames.sections.photosSection]: [post1.slug, post4.slug],
      [fieldNames.sections.infographicsSection]: [post2.slug, post3.slug],
      [fieldNames.categories.humanRightsAndSociety]: [],
      [fieldNames.categories.environmentAndEducation]: [],
      [fieldNames.categories.politicsAndEconomy]: [],
      [fieldNames.categories.cultureAndArt]: [],
      [fieldNames.categories.livingAndMedicalCare]: [],
      [fieldNames.categories.international]: [],
      error: null,
      isFetching: false,
    })
  })

  it('should handle ERROR_TO_GET_CONTENT_FOR_INDEX_PAGE', () => {
    const err = new Error('error occurs')
    expect(
      reducer(
        {
          [fieldNames.sections.latestSection]: [post1.slug, post2.slug],
          [fieldNames.sections.editorPicksSection]: [post4.slug],
          [fieldNames.sections.reviewsSection]: [post3.slug],
          [fieldNames.sections.latestTopicSection]: [fullTopic.slug],
          [fieldNames.sections.topicsSection]: [
            fullTopic.slug,
            nonFullTopic.slug,
          ],
          [fieldNames.sections.photosSection]: [post1.slug, post4.slug],
          [fieldNames.sections.infographicsSection]: [post2.slug, post3.slug],
          error: null,
        },
        {
          type: types.ERROR_TO_GET_INDEX_PAGE_CONTENT,
          error: err,
        }
      )
    ).to.deep.equal({
      [fieldNames.sections.latestSection]: [post1.slug, post2.slug],
      [fieldNames.sections.editorPicksSection]: [post4.slug],
      [fieldNames.sections.reviewsSection]: [post3.slug],
      [fieldNames.sections.latestTopicSection]: [fullTopic.slug],
      [fieldNames.sections.topicsSection]: [fullTopic.slug, nonFullTopic.slug],
      [fieldNames.sections.photosSection]: [post1.slug, post4.slug],
      [fieldNames.sections.infographicsSection]: [post2.slug, post3.slug],
      error: err,
      isFetching: false,
    })
  })

  it('should handle GET_TOPICS_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_TOPICS_FOR_INDEX_PAGE,
          payload: {
            items: _.cloneDeep([nonFullTopic, fullTopic]),
          },
        }
      )
    ).to.deep.equal({
      [fieldNames.sections.topicsSection]: [nonFullTopic.slug, fullTopic.slug],
    })
  })

  it('should handle GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE,
          payload: {
            items: _.cloneDeep([post1]),
          },
        }
      )
    ).to.deep.equal({
      [fieldNames.sections.photosSection]: [post1.slug],
    })
  })

  it('should handle GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE,
          payload: {
            items: _.cloneDeep([post1]),
          },
        }
      )
    ).to.deep.equal({
      [fieldNames.sections.infographicsSection]: [post1.slug],
    })
  })

  it('should handle GET_EDITOR_PICKED_POSTS', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_EDITOR_PICKED_POSTS,
          payload: {
            items: _.cloneDeep([post1]),
          },
        }
      )
    ).to.deep.equal({
      [fieldNames.sections.editorPicksSection]: [post1.slug],
    })
  })
})
