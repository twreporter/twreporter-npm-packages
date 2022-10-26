import PropTypes from 'prop-types'

export const WEIGHT = {
  extraLight: 'extraLight',
  normal: 'normal',
  bold: 'bold',
}

export const WEIGHT_PROP_TYPES = PropTypes.oneOf([
  WEIGHT.extraLight,
  WEIGHT.normal,
  WEIGHT.bold,
])

export const WEIGHT_STORYBOOK_ARG_TYPE = {
  defaultValue: WEIGHT.normal,
  options: [WEIGHT.extraLight, WEIGHT.normal, WEIGHT.bold],
  control: { type: 'radio' },
}
