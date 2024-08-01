// @twreporter
import {
  colorGrayscale,
  colorPhoto,
} from '@twreporter/core/lib/constants/color'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

export const getToolBarTheme = (theme) => {
  switch (theme) {
    case ARTICLE_THEME.v2.photo:
      return {
        bgColor: colorPhoto.dark,
        shareByBgColor: colorPhoto.dark,
        borderColor: colorPhoto.heavy,
      }
    case ARTICLE_THEME.v2.default:
    default:
      return {
        bgColor: colorGrayscale.gray100,
        shareByBgColor: colorGrayscale.white,
        borderColor: colorGrayscale.gray300,
      }
  }
}

export default {
  getToolBarTheme,
}
