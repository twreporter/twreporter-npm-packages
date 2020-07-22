import actionTypes from '../constants/action-types'
import assign from 'lodash/assign'

const _ = { assign }

const _fontLevels = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

const defaultState = {
  fontLevel: _fontLevels.small,
}

export default function settings(state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.settings.changeFontLevel: {
      const { payload } = action

      switch (payload) {
        case _fontLevels.small:
        case _fontLevels.medium:
        case _fontLevels.large: {
          return _.assign({}, state, { fontLevel: payload })
        }
        default: {
          return state
        }
      }
    }
    default: {
      return state
    }
  }
}
