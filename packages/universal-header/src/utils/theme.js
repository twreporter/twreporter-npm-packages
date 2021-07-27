import colorsConst from '../constants/colors'
import themeConst from '../constants/theme'
import { ServiceIcons, Icons } from './icon'
import LogoLightGray from '../../static/twreporter-logo-light-gray.svg'
import Logo from '../../static/twreporter-logo.svg'

const lightGrayBgColor = colorsConst.grayBg

function selectLogoComponent(theme) {
  switch (theme) {
    case themeConst.photography:
    case themeConst.transparent: {
      return LogoLightGray
    }
    default: {
      return Logo
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
        fontColor: #808080,
        hoverFontColor: colorsConst.white,
        hoverBgColor: 'rgba(255, 255, 255, 0.1)',
        textShadow: 'none',
        borderColor: 'rgba(128, 128, 128, 0.2)',
      }
    }
    case themeConst.transparent: {
      return {
        fontColor: colorsConst.white,
        hoverFontColor: colorsConst.gray15,
        hoverBgColor: colorsConst.white,
        textShadow: '0 2px 2px rgba(0, 0, 0, 0.22)',
        borderColor: 'rgba(128, 128, 128, 0.2)',
      }
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return {
        fontColor: #808080,
        hoverFontColor: colorsConst.gray15,
        hoverBgColor: 'rgba(0, 0, 0, 0.1)',
        textShadow: 'none',
        borderColor: colorsConst.gray,
      }
    }
  }
}

function selectBgColor(theme) {
  switch (theme) {
    case themeConst.photography: {
      return colorsConst.photography
    }
    case themeConst.transparent: {
      return 'rgba(0, 0, 0, 0.1)'
    }
    case themeConst.index: {
      return colorsConst.white
    }
    case themeConst.normal:
    default: {
      return lightGrayBgColor
    }
  }
}

function selectMobileSlideDownMenuBgColor(theme) {
  switch (theme) {
    case themeConst.normal: {
      return colorsConst.white
    }
    case themeConst.index:
    case themeConst.photography:
    case themeConst.transparent:
    default: {
      return lightGrayBgColor
    }
  }
}

function selectChannelsBgColor(theme) {
  switch (theme) {
    case themeConst.photography: {
      return colorsConst.photography
    }
    case themeConst.transparent: {
      return 'transparent'
    }
    case themeConst.index: {
      return colorsConst.white;
    }
    case themeConst.normal:
    default: {
      return lightGrayBgColor
    }
  }
}

function selectActionButtonTheme(theme) {
  switch (theme) {
    case themeConst.photography: {
      return {
        color: colorsConst.white,
        bgColor: colorsConst.secondary,
        hoverBgColor: '#856236',
      }
    }
    case themeConst.transparent: {
      return {
        color: colorsConst.secondary,
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

function selectSloganColor(theme) {
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
      return colorsConst.gray15
    }
  }
}


export default {
  selectBgColor,
  selectChannelTheme,
  selectChannelsBgColor,
  selectLogoComponent,
  selectMobileSlideDownMenuBgColor,
  selectServiceIcons,
  selectIcons,
  selectActionButtonTheme,
  selectSloganColor,
}
