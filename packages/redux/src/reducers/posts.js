import types from '../constants/action-types'

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

export function post(state = {}, action = {}) {
  switch (action.type) {
    case types.GET_A_FULL_POST:
    case types.CHANGE_SELECTED_POST: {
      return {
        slug: _.get(action, 'payload.slug'),
        error: null,
        isFetching: false,
      }
    }

    case types.START_TO_GET_A_FULL_POST:
      return {
        isFetching: true,
        slug: _.get(action, 'payload.slug'),
        error: null,
      }

    case types.ERROR_TO_GET_A_FULL_POST:
      return action.payload
    default:
      return state
  }
}

export function posts(state = {}, action = {}) {
  switch (action.type) {
    case types.GET_LISTED_POSTS: {
      const items = _.get(action, 'payload.items', [])
      const total = _.get(action, 'payload.total', 0)
      const listID = _.get(action, 'payload.listID', '')
      const page = _.get(action, 'payload.page', 0)
      const list = _.get(state, listID, {
        // pages is used to store items position,
        // say, if
        // pages = {
        //  1: [0, 9]
        // }
        // which means, items of page 1 are stored
        // from items[0] to items[9]
        pages: {},
        items: [],
        total: 0,
        error: null,
      })

      const itemsNum = list.items.length || 0

      list.items = _.concat(list.items, _.map(items, item => item.slug))
      list.total = total
      list.error = null

      // not support page = 0
      // page starts from 1, not 0
      if (page > 0) {
        _.set(list.pages, page, [itemsNum, itemsNum + (items.length - 1)])
      }

      return _.merge({}, state, {
        [listID]: list,
      })
    }

    case types.ERROR_TO_GET_LISTED_POSTS: {
      const listID = _.get(action, 'listID')
      const list = _.get(state, listID, {})
      list.error = _.get(action, 'error')

      return _.merge({}, state, {
        [listID]: list,
      })
    }

    case types.START_TO_GET_POSTS:
      return state

    case types.ERROR_TO_GET_POSTS:
      return state
    default:
      return state
  }
}
