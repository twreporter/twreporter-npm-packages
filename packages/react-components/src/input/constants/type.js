import PropTypes from 'prop-types'

export const WIDTH_TYPE = {
  fit: 'fit',
  stretch: 'stretch',
}

export const WIDTH_PROP_TYPE = PropTypes.oneOf([
  WIDTH_TYPE.fit,
  WIDTH_TYPE.stretch,
])
