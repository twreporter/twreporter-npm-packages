import colorsConst from '../constants/colors'
import themeConst from '../constants/theme'
import LogoLightGray from '../../static/twreporter-logo-light-gray.svg'
import Logo from '../../static/twreporter-logo.svg'
import BookmarkIcon from '../../static/bookmark-list-icon.svg'
import BookmarkIconLightGray from '../../static/bookmark-list-icon-light-gray.svg'
import MemberIcon from '../../static/member-icon.svg'
import MemberIconLightGray from '../../static/member-icon-light-gray.svg'
import LogoutIcon from '../../static/logout.svg'
import LogoutIconLightGray from '../../static/logout-light-gray.svg'
import SearchIcon from '../../static/search-icon.svg'
import SearchIconLightGray from '../../static/search-icon-light-gray.svg'

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
    case themeConst.photography:
    case themeConst.transparent: {
      return {
        bookmark: BookmarkIconLightGray,
        member: MemberIconLightGray,
        search: SearchIconLightGray,
        logout: LogoutIconLightGray,
      }
    }
    default: {
      return {
        bookmark: BookmarkIcon,
        member: MemberIcon,
        search: SearchIcon,
        logout: LogoutIcon,
      }
    }
  }
}

function selectFontColor(theme) {
  switch (theme) {
    case themeConst.transparent: {
      return colorsConst.white
    }
    case themeConst.photography: {
      return '#808080'
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return colorsConst.gray15
    }
  }
}

function selectHoverFontColor(theme) {
  switch (theme) {
    case themeConst.transparent: {
      return '#808080'
    }
    case themeConst.photography: {
      return colorsConst.secondary
    }
    case themeConst.index:
    case themeConst.normal:
    default: {
      return '#808080'
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
    case themeConst.transparent: {
      return 'transparent'
    }
    default: {
      return colorsConst.white
    }
  }
}

export default {
  selectBgColor,
  selectChannelTextShadow,
  selectChannelsBgColor,
  selectFontColor,
  selectHoverFontColor,
  selectLogoComponent,
  selectMobileSlideDownMenuBgColor,
  selectServiceIcons,
}
