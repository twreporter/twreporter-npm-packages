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

// the value of ARTICLE_THEME is correspond to posts.style
export const ARTICLE_THEME = Object.freeze({
  v2: {
    pink: 'article:v2:pink',
    default: 'article:v2:default',
    photo: 'article:v2:photo',
    interactive: 'interactive',
  },
})

export const TEXT_BUTTON_THEME = Object.freeze({
  ...THEME,
  brand: 'brand',
  dark: 'dark',
  light: 'light',
})
