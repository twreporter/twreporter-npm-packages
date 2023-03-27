import PropTypes from 'prop-types'

export const STYLE = Object.freeze({
  brand: 'brand',
  dark: 'dark',
  light: 'light',
})

export const STYLE_PROP_TYPES = PropTypes.oneOf(Object.values(STYLE))

export const STYLE_STORYBOOK_ARG_TYPE = {
  defaultValue: STYLE.brand,
  options: Object.values(STYLE),
  control: { type: 'radio' },
}
