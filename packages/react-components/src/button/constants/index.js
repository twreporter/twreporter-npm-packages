import PropTypes from 'prop-types'
import { THEME } from '@twreporter/core/lib/constants/theme'

export const TEXT_BUTTON_THEME = Object.freeze({
  ...THEME,
  brand: 'brand',
  dark: 'dark',
  light: 'light',
})
export const TEXT_BUTTON_THEME_PROP_TYPES = PropTypes.oneOf(
  Object.values(TEXT_BUTTON_THEME)
)
