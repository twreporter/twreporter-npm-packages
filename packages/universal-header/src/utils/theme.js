import themeConst from '../constants/theme'
import {
  colorBrand,
  colorPhoto,
  colorSupportive,
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'

export const selectLogoType = theme => {
  switch (theme) {
    case themeConst.photography:
    case themeConst.transparent:
      return 'white'
    default:
      return 'default'
  }
}

export const selectHeaderTheme = theme => {
  switch (theme) {
    case themeConst.photography:
      return {
        bgColor: colorPhoto.dark,
        topRowBgColor: colorPhoto.dark,
      }
    case themeConst.transparent:
      return {
        bgColor: colorOpacity['black_0.2'],
        topRowBgColor: 'unset',
      }
    case themeConst.index:
      return {
        bgColor: colorGrayscale.white,
        topRowBgColor: colorGrayscale.white,
      }
    case themeConst.normal:
    default:
      return {
        bgColor: colorGrayscale.gray100,
        topRowBgColor: colorGrayscale.gray100,
      }
  }
}

export const selectSloganTheme = theme => {
  switch (theme) {
    case themeConst.photography:
    case themeConst.transparent:
      return colorGrayscale.white
    case themeConst.index:
    case themeConst.normal:
    default:
      return colorGrayscale.gray800
  }
}

export const selectHamburgerFooterTheme = theme => {
  switch (theme) {
    case themeConst.photography:
      return {
        color: colorGrayscale.gray400,
        hoverColor: colorGrayscale.gray400,
        hoverBgColor: colorOpacity['white_0.2'],
        activeColor: colorGrayscale.gray400,
        activeBgColor: colorOpacity['white_0.5'],
      }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.gray800,
        hoverBgColor: colorGrayscale.gray100,
        activeColor: colorGrayscale.gray800,
        activeBgColor: colorGrayscale.gray200,
      }
  }
}

export const selectHamburgerItemTheme = (theme, active) => {
  switch (theme) {
    case themeConst.photography:
      return {
        color: active ? colorSupportive.main : colorGrayscale.white,
        hoverBgColor: colorOpacity['white_0.2'],
        activeBgColor: colorOpacity['white_0.5'],
      }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default:
      return {
        color: active ? colorBrand.heavy : colorGrayscale.gray800,
        hoverBgColor: colorGrayscale.gray100,
        activeBgColor: colorGrayscale.gray200,
      }
  }
}

export const selectHamburgerMenuTheme = theme => {
  switch (theme) {
    case themeConst.photography:
      return {
        bgColor: colorPhoto.dark,
        scrollBarColor: colorOpacity['white_0.8'],
      }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default:
      return {
        bgColor: colorGrayscale.white,
        scrollBarColor: colorOpacity['black_0.2'],
      }
  }
}

export const selectTabBarTheme = theme => {
  switch (theme) {
    case themeConst.photography:
      return {
        bgColor: colorPhoto.dark,
        borderColor: colorPhoto.heavy,
      }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default:
      return {
        bgColor: colorGrayscale.gray100,
        borderColor: colorGrayscale.gray300,
      }
  }
}
