import colorsConst from '../constants/colors'
import themeConst from '../constants/theme'
import { ServiceIcons, Icons } from './icon'

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
        bgColor: colorsConst.photography,
        fontColor: '#808080',
        hoverFontColor: colorsConst.white,
        hoverBgColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(128, 128, 128, 0.2)',
      }
    }
    case themeConst.transparent: {
      return {
        bgColor: 'transparent',
        fontColor: colorsConst.white,
        hoverFontColor: colorsConst.grayDark,
        hoverBgColor: colorsConst.white,
        borderColor: 'rgba(128, 128, 128, 0.2)',
      }
    }
    case themeConst.index: {
      return {
        bgColor: colorsConst.white,
        fontColor: '#808080',
        hoverFontColor: colorsConst.grayDark,
        hoverBgColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: colorsConst.gray,
      }
    }
    case themeConst.normal:
    default: {
      return {
        bgColor: colorsConst.grayLight,
        fontColor: '#808080',
        hoverFontColor: colorsConst.grayDark,
        hoverBgColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: colorsConst.gray,
      }
    }
  }
}

function selectHeaderTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        bgColor: colorsConst.photography,
        borderColor: 'rgba(128, 128, 128, 0.2)',
      }
    }
    case themeConst.transparent: {
      return {
        bgColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(128, 128, 128, 0.2)',
      }
    }
    case themeConst.index: {
      return {
        bgColor: colorsConst.white,
        borderColor: colorsConst.gray,
      }
    }
    case themeConst.normal:
    default: {
      return {
        bgColor: colorsConst.grayLight,
        borderColor: colorsConst.gray,
      }
    }
  }
}

function selectActionButtonTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        color: colorsConst.white,
        bgColor: colorsConst.brown,
        hoverBgColor: '#856236',
      }
    }
    case themeConst.transparent: {
      return {
        color: colorsConst.brown,
        bgColor: colorsConst.white,
        hoverBgColor: '#d8d8d8',
      }
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return {
        color: colorsConst.white,
        bgColor: colorsConst.red,
        hoverBgColor: '#9e1b22',
      }
    }
  }
}

function selectHamburgerMenuTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        bgColor: colorsConst.photography,
      }
    }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return {
        bgColor: colorsConst.grayLight,
      }
    }
  }
}

function selectHamburgerServiceTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        borderColor: 'rgba(128, 128, 128, 0.5)',
      }
    }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return {
        borderColor: 'rgba(128, 128, 128, 0.2)',
      }
    }
  }
}

function selectSloganTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return '#c9af8e'
    }
    case themeConst.transparent: {
      return colorsConst.white
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return colorsConst.grayDark
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
