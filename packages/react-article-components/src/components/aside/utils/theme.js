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
        borderColor: colorPhoto.heavy,
      }
    case themeConst.article.v2.default:
    default:
      return {
        bgColor: colorGrayscale.gray100,
        borderColor: colorGrayscale.gray300,
      }
  }
}

export default {
  getToolBarTheme,
}
