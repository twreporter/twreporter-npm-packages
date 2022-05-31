// constants
import themeConst from '../../../constants/theme'
// @twreporter
import {
  colorGrayscale,
  colorPhoto,
} from '@twreporter/core/lib/constants/color'

export const getToolBarTheme = theme => {
  switch (theme) {
    case themeConst.article.v2.photo:
      return {
        bgColor: colorPhoto.dark,
      }
    case themeConst.article.v2.default:
    default:
      return {
        bgColor: colorGrayscale.white,
      }
  }
}

export default {
  getToolBarTheme,
}
