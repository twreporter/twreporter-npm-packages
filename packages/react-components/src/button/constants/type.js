import PropTypes from 'prop-types'

export const TYPE = {
  primary: 'primary',
  secondary: 'secondary',
}

export const TYPE_PROP_TYPES = PropTypes.oneOf([TYPE.primary, TYPE.secondary])

export const TYPE_STORYBOOK_ARG_TYPE = {
  defaultValue: TYPE.primary,
  options: [TYPE.primary, TYPE.secondary],
  control: { type: 'radio' },
}
