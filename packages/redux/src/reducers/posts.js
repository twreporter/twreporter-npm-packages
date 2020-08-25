import types from '../constants/action-types'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'
import set from 'lodash/set'

const _ = {
  forEach,
  get,
  merge,
  set,
}

export function post(state = {}, action = {}) {
  switch (action.type) {
    case types.selectedPost.read.success:
    case types.selectedPost.read.alreadyExists: {
      return {
        slug: _.get(action, 'payload.post.slug'),
        error: null,
        isFetching: false,
      }
    }

    case types.selectedPost.read.request:
      return {
        isFetching: true,
        slug: _.get(action, 'payload.slug'),
        error: null,
      }

    case types.selectedPost.read.failure:
      return action.payload
    default:
      return state
  }
}

export function posts(state = {}, action = {}) {
  switch (action.type) {
    case types.postsByListId.read.success: {
      const listId = _.get(action, 'payload.listId', '')

      if (!listId) {
        return state
      }

      const posts = _.get(action, 'payload.items', [])
      const newItems = []
      _.forEach(posts, post => {
        const id = _.get(post, 'id', '')
        if (id) {
          newItems.push(id)
        }
      })

      const total = _.get(action, 'payload.total', 0)
      const page = _.get(action, 'payload.page', 0)
      const oldItems = _.get(state, [listId, 'items'], [])

      let items = []
      let pages = {}
      if (newItems.length > 0 && page >= 1) {
        const startAt = oldItems.length
        const endAt = startAt + newItems.length - 1
        // pages is used to store items position,
        // say, if
        // pages = {
        //  1: [0, 9]
        // }
        // which means, items of page 1 are stored
        // from items[0] to items[9]
        pages = {
          [page]: [startAt, endAt],
        }

        items = [].concat(oldItems, newItems)
      }

      return _.merge({}, state, {
        [listId]: {
          pages,
          items,
          total,
          error: null,
          isFetching: false,
        },
      })
    }
    case types.postsByListId.read.failure: {
      const listId = _.get(action, 'payload.listId')

      if (!listId) {
        return state
      }

      return _.merge({}, state, {
        [listId]: {
          error: _.get(action, 'payload.error'),
          isFetching: false,
        },
      })
    }
    case types.postsByListId.read.request:
      const listId = _.get(action, 'payload.listId')

      if (!listId) {
        return state
      }

      return _.merge({}, state, {
        [listId]: {
          error: null,
          isFetching: true,
        },
      })
    default:
      return state
  }
}
