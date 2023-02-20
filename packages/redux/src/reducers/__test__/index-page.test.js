/* global expect, test, describe */

import fieldNames from '../../constants/redux-state-field-names'
import reducer from '../index-page'
import types from '../../constants/action-types'
import { ENABLE_NEW_INFO_ARCH } from '@twreporter/core/lib/constants/feature-flag'
// lodash
import reduce from 'lodash/reduce'
import snakeCase from 'lodash/snakeCase'
const _ = {
  reduce,
  snakeCase,
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

const unifyToBeFieldName = fields =>
  _.reduce(
    fields,
    (res, value, key) => {
      res[key] = _.snakeCase(value)
      return res
    },
    {}
  )

const beFieldNames = {
  categories: unifyToBeFieldName(fieldNames.categories),
  sections: unifyToBeFieldName(fieldNames.sections),
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
          [beFieldNames.categories.world]: [post1],
          [beFieldNames.categories.humanrights]: [post2],
          [beFieldNames.categories.politicsAndSociety]: [post3],
          [beFieldNames.categories.health]: [post4],
          [beFieldNames.categories.environment]: [],
          [beFieldNames.categories.econ]: [],
          [beFieldNames.categories.culture]: [],
          [beFieldNames.categories.education]: [],
        }
      : {
          [beFieldNames.categories.humanRightsAndSociety]: [post1],
          [beFieldNames.categories.environmentAndEducation]: [post2],
          [beFieldNames.categories.politicsAndEconomy]: [post3],
          [beFieldNames.categories.cultureAndArt]: [post4],
          [beFieldNames.categories.livingAndMedicalCare]: [],
          [beFieldNames.categories.international]: [],
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
              [beFieldNames.sections.latestSection]: [post1],
              [beFieldNames.sections.editorPicksSection]: [post2],
              [beFieldNames.sections.reviewsSection]: [post3],
              [beFieldNames.sections.latestTopicSection]: [fullTopic],
              [beFieldNames.sections.topicsSection]: [fullTopic, nonFullTopic],
              [beFieldNames.sections.photosSection]: [post4],
              [beFieldNames.sections.infographicsSection]: [],
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
