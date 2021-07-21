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

function selectFontColor(theme) {
  switch (theme) {
    case themeConst.transparent: {
      return colorsConst.white
    }
    case themeConst.photography:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return '#808080'
    }
  }
}

function selectHoverFontColor(theme) {
  switch (theme) {
    case themeConst.photography: {
      return colorsConst.white
    }
    case themeConst.transparent:
    case themeConst.index:
    case themeConst.normal:
    default: {
      return colorsConst.gray15
    }
  }
}

function selectHoverBgColor(theme) {
  switch (theme) {
    case themeConst.transparent: {
      return colorsConst.white
    }
    case themeConst.photography: {
      return 'rgba(255, 255, 255, 0.1)'
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return 'rgba(0, 0, 0, 0.1)'
    }
  }
}

function selectChannelTextShadow(theme) {
  switch (theme) {
    case themeConst.transparent: {
      return '0 2px 2px rgba(0, 0, 0, 0.22)'
    }

    default: {
      return 'none'
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

function selectChannelBorderColor(theme) {
  switch (theme) {
    case themeConst.photography:
    case themeConst.transparent: {
      return 'rgba(128, 128, 128, 0.2)'
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return colorsConst.gray
    }
  }
}

export default {
  selectBgColor,
  selectChannelTextShadow,
  selectChannelsBgColor,
  selectFontColor,
  selectHoverFontColor,
  selectHoverBgColor,
  selectLogoComponent,
  selectMobileSlideDownMenuBgColor,
  selectServiceIcons,
  selectIcons,
  selectChannelBorderColor,
}
