import colors from '../constants/colors'
import themeConst from '../constants/theme'
import { ServiceIcons, Icons } from './icon'
import {
  colorBrand,
  colorPhoto,
  colorSupportive,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'

function selectLogoType(theme) {
  switch (theme) {
    case themeConst.photography:
    case themeConst.transparent: {
      return 'white'
    }
    default: {
      return 'default'
    }
  }
}

function selectServiceIcons(theme) {
  switch (theme) {
    case themeConst.photography: {
      return ServiceIcons.photography
    }
    case themeConst.transparent: {
      return ServiceIcons.transparent
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return ServiceIcons.normal
    }
  }
}

function selectHamburgerServiceIcons(theme) {
  switch (theme) {
    case themeConst.photography: {
      return ServiceIcons.photography
    }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return ServiceIcons.normal
    }
  }
}

function selectIcons(theme) {
  switch (theme) {
    case themeConst.photography: {
      return Icons.photography
    }
    case themeConst.transparent: {
      return Icons.transparent
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return Icons.normal
    }
  }
}

function selectChannelTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        bgColor: colorPhoto.dark,
        fontColor: colorGrayscale.gray600,
        hoverFontColor: colorGrayscale.white,
        hoverBgColor: colors.gray50,
        borderColor: colors.gray250,
      }
    }
    case themeConst.transparent: {
      return {
        bgColor: 'transparent',
        fontColor: colorGrayscale.white,
        hoverFontColor: colorGrayscale.gray900,
        hoverBgColor: colorGrayscale.white,
        borderColor: colors.gray250,
      }
    }
    case themeConst.index: {
      return {
        bgColor: colorGrayscale.white,
        fontColor: colorGrayscale.gray600,
        hoverFontColor: colorGrayscale.gray900,
        hoverBgColor: colors.gray150,
        borderColor: colorGrayscale.gray200,
      }
    }
    case themeConst.normal:
    default: {
      return {
        bgColor: colorGrayscale.gray100,
        fontColor: colorGrayscale.gray600,
        hoverFontColor: colorGrayscale.gray900,
        hoverBgColor: colors.gray150,
        borderColor: colorGrayscale.gray200,
      }
    }
  }
}

function selectHeaderTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        bgColor: colorPhoto.dark,
        borderColor: colors.gray250,
      }
    }
    case themeConst.transparent: {
      return {
        bgColor: colors.gray150,
        borderColor: colors.gray250,
      }
    }
    case themeConst.index: {
      return {
        bgColor: colorGrayscale.white,
        borderColor: colorGrayscale.gray200,
      }
    }
    case themeConst.normal:
    default: {
      return {
        bgColor: colorGrayscale.gray100,
        borderColor: colorGrayscale.gray200,
      }
    }
  }
}

function selectActionButtonTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        color: colorGrayscale.white,
        bgColor: colorSupportive.main,
        hoverBgColor: colors.brownDark,
      }
    }
    case themeConst.transparent: {
      return {
        color: colorSupportive.main,
        bgColor: colorGrayscale.white,
        hoverBgColor: colorGrayscale.gray300,
      }
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return {
        color: colorGrayscale.white,
        bgColor: colorBrand.heavy,
        hoverBgColor: colors.redDark,
      }
    }
  }
}

function selectHamburgerMenuTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        bgColor: colorPhoto.dark,
      }
    }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return {
        bgColor: colorGrayscale.gray100,
      }
    }
  }
}

function selectHamburgerServiceTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        borderColor: colors.gray450,
      }
    }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return {
        borderColor: colors.gray250,
      }
    }
  }
}

function selectSloganTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return colorSupportive.main
    }
    case themeConst.transparent: {
      return colorGrayscale.white
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return colorGrayscale.gray900
    }
  }
}

/*
 * HB is the abbreviation of hamburger.
 * The HB series of theme functions are used in hamburger menu.
 */
function selectActionButtonHBTheme(theme) {
  switch (theme) {
    case themeConst.transparent: {
      return selectActionButtonTheme('normal')
    }
    case themeConst.photography:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return selectActionButtonTheme(theme)
    }
  }
}

function selectChannelHBTheme(theme) {
  switch (theme) {
    case themeConst.transparent: {
      return selectChannelTheme('normal')
    }
    case themeConst.photography:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return selectChannelTheme(theme)
    }
  }
}

function selectSloganHBTheme(theme) {
  switch (theme) {
    case themeConst.transparent: {
      return selectSloganTheme('normal')
    }
    case themeConst.photography:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return selectSloganTheme(theme)
    }
  }
}

export default {
  selectLogoType,
  selectServiceIcons,
  selectHamburgerServiceIcons,
  selectIcons,
  selectHeaderTheme,
  selectChannelTheme,
  selectActionButtonTheme,
  selectSloganTheme,
  selectChannelHBTheme,
  selectActionButtonHBTheme,
  selectSloganHBTheme,
  selectHamburgerMenuTheme,
  selectHamburgerServiceTheme,
}
