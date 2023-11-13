import {
  colorSupportive,
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import { THEME } from '@twreporter/core/lib/constants/theme'

export const selectThemeStyle = theme => {
  switch (theme) {
    case THEME.photography:
      return {
        bgColor: colorOpacity['white_0.8'],
        focusBgColor: colorGrayscale.gray100,
        desktopBgColor: colorGrayscale.gray100,
        borderColor: colorSupportive.pastel,
        color: colorGrayscale.gray800,
        focusColor: colorGrayscale.gray500,
        placeholderColor: colorGrayscale.gray800,
      }
    case THEME.transpareant:
      return {
        bgColor: colorOpacity['gray100_0.8'],
        focusBgColor: colorOpacity['gray100_0.8'],
        desktopBgColor: colorGrayscale.white,
        borderColor: colorGrayscale.gray600,
        color: colorGrayscale.gray800,
        focusColor: colorGrayscale.gray500,
        placeholderColor: colorGrayscale.gray500,
      }
    case THEME.normal:
    default:
      return {
        bgColor: colorOpacity['gray100_0.8'],
        focusBgColor: colorOpacity['gray100_0.8'],
        desktopBgColor: colorGrayscale.white,
        borderColor: colorGrayscale.gray600,
        color: colorGrayscale.gray800,
        focusColor: colorGrayscale.gray500,
        placeholderColor: colorGrayscale.gray500,
      }
  }
}
