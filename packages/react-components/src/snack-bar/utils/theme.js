import { colorGrayscale } from '@twreporter/core/lib/constants/color'

export const getSnackBarTheme = theme => {
  switch (theme) {
    case 'photography':
      return {
        color: colorGrayscale.gray800,
        bgColor: colorGrayscale.gray200,
      }
    case 'normal':
    default:
      return {
        color: colorGrayscale.white,
        bgColor: colorGrayscale.gray800,
      }
  }
}

export default {
  getSnackBarTheme,
}
