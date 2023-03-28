import PropTypes from 'prop-types'

export const TYPE = Object.freeze({
  primary: 'primary',
  secondary: 'secondary',
})

export const TYPE_PROP_TYPES = PropTypes.oneOf(Object.values(TYPE))

export const TYPE_STORYBOOK_ARG_TYPE = {
  defaultValue: TYPE.primary,
  options: Object.values(TYPE),
  control: { type: 'radio' },
}

export const LINK_TYPE = Object.freeze({
  default: 'default',
  underline: 'underline',
})

export const LINK_TYPE_PROP_TYPES = PropTypes.oneOf(Object.values(LINK_TYPE))

export const LINK_TYPE_STORYBOOK_ARG_TYPE = {
  defaultValue: LINK_TYPE.default,
  options: Object.values(LINK_TYPE),
  control: { type: 'radio' },
}
