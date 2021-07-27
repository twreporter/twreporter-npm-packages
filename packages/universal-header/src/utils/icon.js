import BookmarkNormalIcon from '../../static/normal/bookmark-default.svg'
import BookmarkNormalHoverIcon from '../../static/normal/bookmark-hover.svg'
import BookmarkPhotoIcon from '../../static/photography/bookmark-default.svg'
import BookmarkPhotoHoverIcon from '../../static/photography/bookmark-hover.svg'
import BookmarkTransparentIcon from '../../static/transparent/bookmark-default.svg'
import BookmarkTransparentHoverIcon from '../../static/transparent/bookmark-hover.svg'
import LoginNormalIcon from '../../static/normal/login-default.svg'
import LoginNormalHoverIcon from '../../static/normal/login-hover.svg'
import LoginPhotoIcon from '../../static/photography/login-default.svg'
import LoginPhotoHoverIcon from '../../static/photography/login-hover.svg'
import LoginTransparentIcon from '../../static/transparent/login-default.svg'
import LoginTransparentHoverIcon from '../../static/transparent/login-hover.svg'
import LogoutNormalIcon from '../../static/normal/logout-default.svg'
import LogoutNormalHoverIcon from '../../static/normal/logout-hover.svg'
import LogoutPhotoIcon from '../../static/photography/logout-default.svg'
import LogoutPhotoHoverIcon from '../../static/photography/logout-hover.svg'
import LogoutTransparentIcon from '../../static/transparent/logout-default.svg'
import LogoutTransparentHoverIcon from '../../static/transparent/logout-hover.svg'
import SearchNormalIcon from '../../static/normal/search-default.svg'
import SearchNormalHoverIcon from '../../static/normal/search-hover.svg'
import SearchPhotoIcon from '../../static/photography/search-default.svg'
import SearchPhotoHoverIcon from '../../static/photography/search-hover.svg'
import SearchTransparentIcon from '../../static/transparent/search-default.svg'
import SearchTransparentHoverIcon from '../../static/transparent/search-hover.svg'
import ExpandIcon from '../../static/expand-default.svg'
import ExpandHoverGrayIcon from '../../static/expand-hover-gray.svg'
import ExpandHoverWhiteIcon from '../../static/expand-hover-white.svg'
import CollapseIcon from '../../static/collapse-default.svg'
import CollapseHoverGrayIcon from '../../static/collapse-hover-gray.svg'
import CollapseHoverWhiteIcon from '../../static/collapse-hover-white.svg'
import ExpandWideIcon from '../../static/expand-wide-gray.svg'
import ExpandWideWhiteIcon from '../../static/expand-wide-white.svg'
import CollapseWideIcon from '../../static/collapse-wide-gray.svg'
import CollapseWideWhiteIcon from '../../static/collapse-wide-white.svg'
import MenuIcon from '../../static/menu-default.svg'
import MenuWhiteIcon from '../../static/menu-white.svg'
import CloseIcon from '../../static/close-default.svg'

export const ServiceIcons = {
  normal: {
    bookmark: [BookmarkNormalIcon, BookmarkNormalHoverIcon],
    login: [LoginNormalIcon, LoginNormalHoverIcon],
    logout: [LogoutNormalIcon, LogoutNormalHoverIcon],
    search: [SearchNormalIcon, SearchNormalHoverIcon],
  },
  photography: {
    bookmark: [BookmarkPhotoIcon, BookmarkPhotoHoverIcon],
    login: [LoginPhotoIcon, LoginPhotoHoverIcon],
    logout: [LogoutPhotoIcon, LogoutPhotoHoverIcon],
    search: [SearchPhotoIcon, SearchPhotoHoverIcon],
  },
  transparent: {
    bookmark: [BookmarkTransparentIcon, BookmarkTransparentHoverIcon],
    login: [LoginTransparentIcon, LoginTransparentHoverIcon],
    logout: [LogoutTransparentIcon, LogoutTransparentHoverIcon],
    search: [SearchTransparentIcon, SearchTransparentHoverIcon],
  }
}

export const Icons = {
  normal: {
    expand: [ExpandIcon, ExpandHoverGrayIcon],
    collapse: [CollapseIcon, CollapseHoverGrayIcon],
    expandWide: ExpandWideIcon,
    collapseWide: CollapseWideIcon,
    menu: MenuIcon,
    close: CloseIcon,
  },
  photography: {
    expand: [ExpandIcon, ExpandHoverWhiteIcon],
    collapse: [CollapseIcon, CollapseHoverWhiteIcon],
    expandWide: ExpandWideWhiteIcon,
    collapseWide: CollapseWideWhiteIcon,
    menu: MenuIcon,
    close: CloseIcon,
  },
  transparent: {
    expand: [ExpandIcon, ExpandHoverWhiteIcon],
    collapse: [CollapseIcon, CollapseHoverWhiteIcon],
    expandWide: ExpandWideWhiteIcon,
    collapseWide: CollapseWideWhiteIcon,
    menu: MenuWhiteIcon,
    close: CloseIcon,
  },
}

export default {
  ServiceIcons,
  Icons,
}
