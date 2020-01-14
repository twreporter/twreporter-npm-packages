import types from '../constants/action-types'
import fieldNames from '../constants/redux-state-field-names'

// lodash
import concat from 'lodash/concat'
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'
import values from 'lodash/values'

const _ = {
  concat,
  get,
  map,
  merge,
  values,
}

function indexPage(state = {}, action = {}) {
  let payload
  switch (action.type) {
    case types.GET_CONTENT_FOR_INDEX_PAGE: {
      payload = action.payload
      const rtn = {}
      const sections = _.values(fieldNames.sections)
      const categories = _.values(fieldNames.categories)
      const fields = _.concat(sections, categories)

      fields.forEach(field => {
        rtn[field] = _.map(_.get(payload, ['items', field]), post => {
          return _.get(post, 'slug')
        })
      })

      return _.merge({}, state, rtn, { error: null, isFetching: false })
    }

    case types.GET_TOPICS_FOR_INDEX_PAGE: {
      return _.merge({}, state, {
        // only store the topic slugs
        [fieldNames.sections.topicsSection]: _.map(
          _.get(action, 'payload.items'),
          item => {
            return _.get(item, 'slug')
          }
        ),
      })
    }

    case types.GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE: {
      return _.merge({}, state, {
        // only store the posts slugs
        [fieldNames.sections.photosSection]: _.map(
          _.get(action, 'payload.items'),
          item => {
            return _.get(item, 'slug')
          }
        ),
      })
    }

    case types.GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE: {
      return _.merge({}, state, {
        // only store the posts slugs
        [fieldNames.sections.infographicsSection]: _.map(
          _.get(action, 'payload.items'),
          item => {
            return _.get(item, 'slug')
          }
        ),
      })
    }

    case types.GET_EDITOR_PICKED_POSTS: {
      return _.merge({}, state, {
        // only store the posts slugs
        [fieldNames.sections.editorPicksSection]: _.map(
          _.get(action, 'payload.items'),
          item => {
            return _.get(item, 'slug')
          }
        ),
      })
    }

    case types.START_TO_GET_INDEX_PAGE_CONTENT: {
      return _.merge({}, state, {
        isFetching: true,
      })
    }

    case types.ERROR_TO_GET_INDEX_PAGE_CONTENT: {
      return _.merge({}, state, {
        error: action.payload.error,
        isFetching: false,
      })
    }

    default:
      return state
  }
}

export default indexPage
