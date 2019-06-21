import externalLinks from './external-links'
import * as linkType from './link-type'

export const searchConfigs = {
  path: 'search',
}

export const memberConfigs = {
  path: 'signin',
}

export const bookmarkConfigs = {
  path: 'bookmarks',
}

export const labels = {
  SIGN_IN: '登入',
  SIGN_OUT: '登出',
  SEARCH: '搜尋',
  BOOKMARK: '書籤',
  DONATION: '贊助',
  SUBSCRIPTION: '訂閱',
}

export const configs = {
  SIGN_IN: {
    label: labels.SIGN_IN,
    path: memberConfigs.path,
    type: linkType.internal,
  },
  SIGN_OUT: {
    label: labels.SIGN_OUT,
    path: memberConfigs.path,
    type: linkType.internal,
  },
  SEARCH: {
    label: labels.SEARCH,
    path: searchConfigs.path,
    type: linkType.internal,
  },
  BOOKMARK: {
    label: labels.BOOKMARK,
    path: bookmarkConfigs.path,
    type: linkType.internal,
  },
  DONATION: {
    label: labels.DONATION,
    path: externalLinks.donation,
    type: linkType.external,
  },
  SUSBSCRIPTION: {
    label: labels.SUBSCRIPTION,
    path: externalLinks.newsLetter,
    type: linkType.external,
  },
}

export default configs
