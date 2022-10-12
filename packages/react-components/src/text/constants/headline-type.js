import PropTypes from 'prop-types'
import { fontFamily } from '@twreporter/core/lib/constants/font'

export const TYPE = {
  default: 'default',
  article: 'article',
}

export const TYPE_PROP_TYPES = PropTypes.oneOf([TYPE.default, TYPE.article])

export const TYPE_FONT_FAMILY = {
  [TYPE.default]: fontFamily.default,
  [TYPE.article]: fontFamily.title,
}

export const TYPE_STORYBOOK_ARG_TYPE = {
  defaultValue: TYPE.default,
  options: [TYPE.default, TYPE.article],
  control: { type: 'radio' },
}
