import * as pageThemes from '@twreporter/core/lib/constants/page-themes'

export const selectTextColor = pageTheme => {
  switch (pageTheme) {
    case pageThemes.dark:
      return '#ffffff'
    case pageThemes.bright:
    default:
      return '#262626'
  }
}

export const selectBgColor = pageTheme => {
  switch (pageTheme) {
    case pageThemes.dark:
      return '#07192e'
    case pageThemes.bright:
    default:
      return '#f1f1f1'
  }
}
