import PropTypes from 'prop-types'
import { TEXT_BUTTON_THEME } from '@twreporter/core/lib/constants/theme'

export const TEXT_BUTTON_THEME_PROP_TYPES = PropTypes.oneOf(
  Object.values(TEXT_BUTTON_THEME)
)
