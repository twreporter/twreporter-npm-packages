import PropTypes from 'prop-types'

export const DIRECTION_TYPE = {
  row: 'row',
  column: 'column',
}

export const DIRECTION_PROP_TYPE = PropTypes.oneOf([
  DIRECTION_TYPE.row,
  DIRECTION_TYPE.column,
])

export const DIRECTION_STORYBOOK_ARG_TYPE = {
  defaultValue: DIRECTION_TYPE.row,
  options: [DIRECTION_TYPE.row, DIRECTION_TYPE.column],
  control: { type: 'radio' },
}

export const TEXT_TYPE = {
  brief: 'brief',
  full: 'full',
}

export const TEXT_PROP_TYPE = PropTypes.oneOf([TEXT_TYPE.brief, TEXT_TYPE.full])

export const TEXT_STORYBOOK_ARG_TYPE = {
  defaultValue: TEXT_TYPE.brief,
  options: [TEXT_TYPE.brief, TEXT_TYPE.full],
  control: { type: 'radio' },
}

export const BUTTON_WIDTH_TYPE = {
  fit: 'fit',
  stretch: 'stretch',
}

export const BUTTON_WIDTH_PROP_TYPE = PropTypes.oneOf([
  BUTTON_WIDTH_TYPE.fit,
  BUTTON_WIDTH_TYPE.stretch,
])

export const BUTTON_WIDTH_STORYBOOK_ARG_TYPE = {
  defaultValue: BUTTON_WIDTH_TYPE.fit,
  options: [BUTTON_WIDTH_TYPE.fit, BUTTON_WIDTH_TYPE.stretch],
  control: { type: 'radio' },
}

export const BUTTON_SIZE_TYPE = {
  S: 'S',
  L: 'L',
}

export const BUTTON_SIZE_PROP_TYPE = PropTypes.oneOf([
  BUTTON_SIZE_TYPE.S,
  BUTTON_SIZE_TYPE.L,
])

export const BUTTON_SIZE_STORYBOOK_ARG_TYPE = {
  defaultValue: BUTTON_SIZE_TYPE.S,
  options: [BUTTON_SIZE_TYPE.S, BUTTON_SIZE_TYPE.L],
  control: { type: 'radio' },
}
