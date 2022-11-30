/* global expect, test, describe */

import fieldNames from '../../constants/redux-state-field-names'
import reducer from '../index-page'
import types from '../../constants/action-types'
import { ENABLE_NEW_INFO_ARCH } from '@twreporter/core/lib/constants/feature-flag'

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
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      isFetching: false,
      isReady: false,
    })
  })

  test('should handle `types.indexPage.read.success`', () => {
    const categoryPayload = ENABLE_NEW_INFO_ARCH
      ? {
          [fieldNames.categories.world]: [post1],
          [fieldNames.categories.humanrights]: [post2],
          [fieldNames.categories.politicsAndSociety]: [post3],
          [fieldNames.categories.health]: [post4],
          [fieldNames.categories.environment]: [],
          [fieldNames.categories.econ]: [],
          [fieldNames.categories.culture]: [],
          [fieldNames.categories.education]: [],
        }
      : {
          [fieldNames.categories.humanRightsAndSociety]: [post1],
          [fieldNames.categories.environmentAndEducation]: [post2],
          [fieldNames.categories.politicsAndEconomy]: [post3],
          [fieldNames.categories.cultureAndArt]: [post4],
          [fieldNames.categories.livingAndMedicalCare]: [],
          [fieldNames.categories.international]: [],
        }
    const categoryResponse = ENABLE_NEW_INFO_ARCH
      ? {
          [fieldNames.categories.world]: [post1.id],
          [fieldNames.categories.humanrights]: [post2.id],
          [fieldNames.categories.politicsAndSociety]: [post3.id],
          [fieldNames.categories.health]: [post4.id],
          [fieldNames.categories.environment]: [],
          [fieldNames.categories.econ]: [],
          [fieldNames.categories.culture]: [],
          [fieldNames.categories.education]: [],
        }
      : {
          [fieldNames.categories.humanRightsAndSociety]: [post1.id],
          [fieldNames.categories.environmentAndEducation]: [post2.id],
          [fieldNames.categories.politicsAndEconomy]: [post3.id],
          [fieldNames.categories.cultureAndArt]: [post4.id],
          [fieldNames.categories.livingAndMedicalCare]: [],
          [fieldNames.categories.international]: [],
        }
    expect(
      reducer(
        {
          [fieldNames.sections.latestTopicSection]: 'topic-slug-3',
        },
        {
          type: types.indexPage.read.success,
          payload: {
            items: {
              [fieldNames.sections.latestSection]: [post1],
              [fieldNames.sections.editorPicksSection]: [post2],
              [fieldNames.sections.reviewsSection]: [post3],
              [fieldNames.sections.latestTopicSection]: [fullTopic],
              [fieldNames.sections.topicsSection]: [fullTopic, nonFullTopic],
              [fieldNames.sections.photosSection]: [post4],
              [fieldNames.sections.infographicsSection]: [],
              ...categoryPayload,
            },
          },
        }
      )
    ).toEqual({
      [fieldNames.sections.latestSection]: [post1.id],
      [fieldNames.sections.editorPicksSection]: [post2.id],
      [fieldNames.sections.reviewsSection]: [post3.id],
      [fieldNames.sections.latestTopicSection]: [fullTopic.id],
      [fieldNames.sections.topicsSection]: [fullTopic.id, nonFullTopic.id],
      [fieldNames.sections.photosSection]: [post4.id],
      [fieldNames.sections.infographicsSection]: [],
      error: null,
      isFetching: false,
      isReady: true,
      ...categoryResponse,
    })
  })

  test('should handle `types.indexPage.read.request`', () => {
    expect(
      reducer(undefined, {
        type: types.indexPage.read.request,
      })
    ).toEqual({
      error: null,
      isFetching: true,
      isReady: false,
    })
  })

  test('should handle `types.indexPage.read.failure`', () => {
    const error = new Error('error occurs')
    expect(
      reducer(undefined, {
        type: types.indexPage.read.failure,
        payload: {
          error,
        },
      })
    ).toEqual({
      error,
      isFetching: false,
      isReady: false,
    })
  })
})
