import {
  colorSupportive,
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'

export const selectThemeStyle = theme => {
  switch (theme) {
    case 'photography':
      return {
        bgColor: colorOpacity['white_0.8'],
        focusBgColor: colorGrayscale.gray100,
        desktopBgColor: colorGrayscale.gray100,
        borderColor: colorSupportive.main,
        color: colorGrayscale.gray800,
        focusColor: colorGrayscale.gray500,
        placeholderColor: colorGrayscale.gray800,
      }
    case 'transpareant':
      return {
        bgColor: colorOpacity['gray100_0.8'],
        focusBgColor: colorOpacity['gray100_0.8'],
        desktopBgColor: colorGrayscale.white,
        borderColor: colorGrayscale.gray600,
        color: colorGrayscale.gray800,
        focusColor: colorGrayscale.gray500,
        placeholderColor: colorGrayscale.gray500,
      }
    case 'normal':
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
