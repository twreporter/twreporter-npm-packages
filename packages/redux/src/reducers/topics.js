import types from '../constants/action-types'
import pagination from '../utils/pagination'

// lodash
import concat from 'lodash/concat'
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'
import set from 'lodash/set'

const _ = {
  concat,
  get,
  map,
  merge,
  set,
}
const { offsetToPage } = pagination

export function topic(state = {}, action = {}) {
  switch (action.type) {
    case types.GET_A_FULL_TOPIC:
    case types.CHANGE_SELECTED_TOPIC: {
      return _.merge({}, state, {
        slug: _.get(action, 'payload.topic.slug'),
        error: null,
        isFetching: false,
      })
    }

    case types.START_TO_GET_A_FULL_TOPIC:
      return _.merge({}, state, {
        slug: _.get(action, 'payload.slug'),
        error: null,
        isFetching: true,
      })

    case types.ERROR_TO_GET_A_FULL_TOPIC:
      return _.merge({}, state, {
        slug: _.get(action, 'payload.slug'),
        error: _.get(action, 'payload.error'),
        isFetching: false,
      })
    default:
      return state
  }
}

export function topics(state = {}, action = {}) {
  switch (action.type) {
    case types.GET_TOPICS: {
      const { payload } = action
      const total = _.get(payload, 'total')
      const offset = _.get(payload, 'offset')
      const limit = _.get(payload, 'limit')
      const { page, nPerPage, totalPages } = offsetToPage({
        limit,
        offset,
        total,
      })
      const pageItems = _.map(_.get(payload, 'items'), item => item.slug)
      /* If nPerPage changed, overwrite the items in state, otherwise merge items with which in state */
      const items =
        nPerPage !== state.nPerPage
          ? { [page]: pageItems }
          : _.merge({}, state.items, { [page]: pageItems })
      return _.merge({}, state, {
        items,
        totalPages,
        page,
        nPerPage,
        error: null,
        isFetching: false,
      })
    }

    case types.START_TO_GET_TOPICS:
      return _.merge({}, state, {
        // page: action.page,
        // nPerPage: action.nPerPage,
        error: null,
        isFetching: true,
      })

    case types.ERROR_TO_GET_TOPICS:
      return _.merge({}, state, {
        error: _.get(action, 'payload.error'),
        isFetching: false,
      })

    default:
      return state
  }
}
