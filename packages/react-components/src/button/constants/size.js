import PropTypes from 'prop-types'

export const SIZE = {
  S: 'S',
  L: 'L',
}

export const SIZE_PROP_TYPES = PropTypes.oneOf([SIZE.S, SIZE.L])

export const SIZE_STORYBOOK_ARG_TYPE = {
  defaultValue: SIZE.S,
  options: [SIZE.S, SIZE.L],
  control: { type: 'radio' },
}
