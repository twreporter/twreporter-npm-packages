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

const initialState = {
  error: null,
  isFetching: false,
  isReady: false,
}

function indexPage(state = initialState, action = {}) {
  let payload
  switch (action.type) {
    case types.indexPage.read.success: {
      payload = action.payload
      const rtn = {}
      const sections = _.values(fieldNames.sections)
      const categories = _.values(fieldNames.categories)
      const fields = _.concat(sections, categories)

      fields.forEach(field => {
        rtn[field] = _.map(_.get(payload, ['items', field]), post => {
          return _.get(post, 'id')
        })
      })

      return _.merge({}, state, rtn, {
        error: null,
        isFetching: false,
        isReady: true,
      })
    }

    case types.indexPage.read.request: {
      return _.merge({}, state, {
        isFetching: true,
        isReady: false,
      })
    }

    case types.indexPage.read.failure: {
      return _.merge({}, state, {
        error: action.payload.error,
        isFetching: false,
        isReady: false,
      })
    }

    default:
      return state
  }
}

export default indexPage
