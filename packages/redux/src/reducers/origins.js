import actionTypes from '../constants/action-types'
import assign from 'lodash/assign'

const _ = { assign }

const defaultState = {
  accounts: 'https://accounts.twreporter.org',
  api: 'https://go-api.twreporter.org',
  main: 'https://www.twreporter.org',
  support: 'https://support.twreporter.org',
}

export default function origins(state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.origins.update: {
      const { payload } = action
      return _.assign({}, state, payload)
    }
    default: {
      return state
    }
  }
}
