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
        shadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
      }
    case themeConst.article.v2.default:
    default:
      return {
        bgColor: colorGrayscale.white,
        shadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
      }
  }
}

export default {
  getToolBarTheme,
}
