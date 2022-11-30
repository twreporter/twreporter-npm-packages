export const serviceKeys = {
  search: 'search',
  bookmarks: 'bookmarks',
  login: 'login',
  logout: 'logout',
}

export const serviceLabels = {
  [serviceKeys.bookmarks]: '書籤',
  [serviceKeys.login]: '登入',
  [serviceKeys.logout]: '登出',
  [serviceKeys.search]: '搜尋',
}

export const servicePathnames = {
  [serviceKeys.bookmarks]: '/bookmarks',
  [serviceKeys.login]: '/signin',
  [serviceKeys.logout]: '/v2/auth/logout',
  [serviceKeys.search]: '/search',
}

export const serviceOrder = [
    serviceKeys.search,
    serviceKeys.bookmarks,
]

export default {
  serviceKeys,
  serviceLabels,
  serviceOrder,
  servicePathnames,
}
