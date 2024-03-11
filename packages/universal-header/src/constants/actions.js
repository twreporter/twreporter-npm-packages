const actionKeys = {
  support: 'support',
  newsLetter: 'newsLetter',
}

const gtmId = {
  [actionKeys.support]: {
    mobile: 'uh-support-header',
    desktop: 'uh-support-header',
    hamburger: 'uh-support-hamburger',
  },
  [actionKeys.newsLetter]: {
    mobile: 'uh-newsletter-header',
    desktop: 'uh-newsletter-header',
    hamburger: 'uh-newsletter-hamburger',
  },
}

export const ACTION_KEY = actionKeys

export const ACTION_LABEL = {
  brief: {
    [actionKeys.support]: '贊助',
    [actionKeys.newsLetter]: '訂閱',
  },
  full: {
    [actionKeys.support]: '贊助我們',
    [actionKeys.newsLetter]: '訂閱電子報',
  },
}

export const ACTION_BUTTON_TYPE = {
  [actionKeys.support]: 'primary',
  [actionKeys.newsLetter]: 'secondary',
}

export const ACTION_ORDER = {
  mobile: [{ key: actionKeys.support, id: gtmId[actionKeys.support].mobile }],
  desktop: [
    {
      key: actionKeys.newsLetter,
      id: gtmId[actionKeys.newsLetter].desktop,
    },
    {
      key: actionKeys.support,
      id: gtmId[actionKeys.support].desktop,
    },
  ],
  hamburger: [
    {
      key: actionKeys.newsLetter,
      id: gtmId[actionKeys.newsLetter].hamburger,
    },
    {
      key: actionKeys.support,
      id: gtmId[actionKeys.support].hamburger,
    },
  ],
}
