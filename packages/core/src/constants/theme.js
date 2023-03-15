import PropTypes from 'prop-types'

export const THEME = Object.freeze({
  normal: 'normal',
  photography: 'photography',
  transparent: 'transparent',
  index: 'index',
})

export const THEME_PROP_TYPES = PropTypes.oneOf([
  THEME.normal,
  THEME.photography,
  THEME.transparent,
  THEME.index,
])

export const THEME_STORYBOOK_ARG_TYPE = {
  defaultValue: THEME.normal,
  options: [THEME.normal, THEME.photography, THEME.transparent, THEME.index],
  control: { type: 'radio' },
}

export const ARTICLE_THEME = Object.freeze({
  v2: {
    pink: 'article:v2:pink',
    default: 'article:v2:default',
    photo: 'article:v2:photo',
  },
})

export const TEXT_BUTTON_THEME = Object.freeze({
  ...THEME,
  brand: 'brand',
  dark: 'dark',
  light: 'light',
})
