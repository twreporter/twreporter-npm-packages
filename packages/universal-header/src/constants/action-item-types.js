import PropTypes from 'prop-types'

export const DIRECTION_TYPE = {
  row: 'row',
  column: 'column',
}

export const DIRECTION_PROP_TYPE = PropTypes.oneOf([
  DIRECTION_TYPE.row,
  DIRECTION_TYPE.column,
])

export const TEXT_TYPE = {
  brief: 'brief',
  full: 'full',
}

export const TEXT_PROP_TYPE = PropTypes.oneOf([TEXT_TYPE.brief, TEXT_TYPE.full])

export const BUTTON_WIDTH_TYPE = {
  fit: 'fit',
  stretch: 'stretch',
}

export const BUTTON_WIDTH_PROP_TYPE = PropTypes.oneOf([
  BUTTON_WIDTH_TYPE.fit,
  BUTTON_WIDTH_TYPE.stretch,
])

export const BUTTON_SIZE_TYPE = {
  S: 'S',
  L: 'L',
}

export const BUTTON_SIZE_PROP_TYPE = PropTypes.oneOf([
  BUTTON_SIZE_TYPE.S,
  BUTTON_SIZE_TYPE.L,
])
