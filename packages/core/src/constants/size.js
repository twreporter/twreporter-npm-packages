import PropTypes from 'prop-types'

export const SIZE = {
  S: 'S',
  L: 'L',
}

export const SIZE_PROP_TYPES = PropTypes.oneOf([SIZE.S, SIZE.L])
