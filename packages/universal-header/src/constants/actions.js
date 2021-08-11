export const actionKeys = {
  support: 'support',
  newsLetter: 'newsLetter',
}

export const actionLabels = {
  [actionKeys.support]: '贊助',
  [actionKeys.newsLetter]: '訂閱',
}

export const actionOrder = {
  mobile: [
    actionKeys.support,
  ],
  desktop: [
    actionKeys.support,
    actionKeys.newsLetter,
  ],
}

export default {
  actionKeys,
  actionLabels,
  actionOrder,
}
