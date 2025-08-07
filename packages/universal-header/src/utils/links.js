import { ACTION_KEY } from '../constants/actions'
import { FOOTER_KEY, FOOTER_PATH, MEMBER_ORDER } from '../constants/footer'
import { SOCIAL_MEDIA_KEY } from '../constants/social-media'
// import { CHANNEL_KEY, CHANNEL_PATH } from '../constants/channels'
import channels from '../constants/channels'
import newChannels from '../constants/channels-new'
import externalLinks from '../constants/external-links'
// @twreporter
import origins from '@twreporter/core/lib/constants/request-origins'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import { LAWMAKER } from '@twreporter/core/lib/constants/feature-flag'
// lodash
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import split from 'lodash/split'
import indexOf from 'lodash/indexOf'
const _ = {
  forEach,
  reduce,
  split,
  indexOf,
}

const { CHANNEL_KEY, CHANNEL_PATH } = LAWMAKER ? newChannels : channels

const originsForClient = origins.forClientSideRendering

/**
 * @param {string} domain - one of 'account', 'main', 'support', or 'api'
 * @returns {Object}
 */
function getOriginsByType(domain) {
  const baseURL = {}
  _.forEach(releaseBranchConsts, (branch) => {
    baseURL[branch] = originsForClient[branch][domain]
  })
  return baseURL
}

const accountsBaseURL = getOriginsByType('accounts')
const mainBaseURL = getOriginsByType('main')
// const support = getOriginsByType('support')

const defaultReleaseBranch = releaseBranchConsts.master
const defaultIsExternal = false

function __getLink(isExternal, releaseBranch, baseURL, path, target = '_self') {
  if (isExternal) {
    if (baseURL.hasOwnProperty(releaseBranch)) {
      return {
        to: baseURL[releaseBranch] + path,
        isExternal,
        target,
      }
    }
  }

  return {
    to: path,
    isExternal,
  }
}

function __getExternalLinks() {
  return Object.assign({}, externalLinks)
}

const __composeExternalLink = (link, target = '_self') => ({
  to: link,
  isExternal: true,
  target,
})

export const checkReferrer = (
  referrer = '',
  releaseBranch = defaultReleaseBranch
) => {
  try {
    const url = new URL(referrer)
    return url.origin === mainBaseURL[releaseBranch]
  } catch (err) {
    return false
  }
}

export const checkPathnameParent = (pathname = '', parent = '') => {
  return _.indexOf(_.split(pathname, '/'), parent) === 1
}

export function getLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch,
  path = ''
) {
  return __getLink(isExternal, releaseBranch, mainBaseURL, path)
}

export function getLoginLink(releaseBranch = defaultReleaseBranch) {
  return {
    to: accountsBaseURL[releaseBranch] + '/signin',
    isExternal: true,
  }
}

export function getMemberLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(isExternal, releaseBranch, mainBaseURL, '/account')
}

export function getBookmarksLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(isExternal, releaseBranch, mainBaseURL, '/myreading/saved')
}

export function getMyReadingLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(isExternal, releaseBranch, mainBaseURL, '/myreading')
}

export function getSearchLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(isExternal, releaseBranch, mainBaseURL, '/search')
}

export function getLogoLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(isExternal, releaseBranch, mainBaseURL, '')
}

export function getActionLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return {
    [ACTION_KEY.support]: __composeExternalLink(
      __getExternalLinks().monthlyDonation
    ),
    [ACTION_KEY.newsLetter]: __getLink(
      isExternal,
      releaseBranch,
      mainBaseURL,
      '/account/email-subscription'
    ),
  }
}

export function getFooterLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return {
    [FOOTER_KEY.foundation]: __getLink(
      isExternal,
      releaseBranch,
      mainBaseURL,
      FOOTER_PATH[FOOTER_KEY.foundation]
    ),
    [FOOTER_KEY.aboutUs]: __getLink(
      true,
      releaseBranch,
      mainBaseURL,
      FOOTER_PATH[FOOTER_KEY.aboutUs],
      '_blank'
    ),
    [FOOTER_KEY.influenceReport]: __getLink(
      isExternal,
      releaseBranch,
      mainBaseURL,
      FOOTER_PATH[FOOTER_KEY.influenceReport]
    ),
    [FOOTER_KEY.openLab]: __composeExternalLink(
      __getExternalLinks().openLab,
      '_blank'
    ),
    [FOOTER_KEY.publicationAndMerchandise]: __composeExternalLink(
      __getExternalLinks().publicationAndMerchandise,
      '_blank'
    ),
  }
}

export function getMemberLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return _.reduce(
    MEMBER_ORDER,
    (res, memberKey) => {
      res[memberKey] = __getLink(
        isExternal,
        releaseBranch,
        mainBaseURL,
        FOOTER_PATH[memberKey]
      )
      return res
    },
    {}
  )
}

export function getSocialMediaLinks() {
  const externalLinks = __getExternalLinks()
  return _.reduce(
    SOCIAL_MEDIA_KEY,
    (res, key) => {
      const link = externalLinks[key]
      if (link) {
        res[key] = __composeExternalLink(link, '_blank')
      }
      return res
    },
    {}
  )
}

export function getChannelLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  const links = _.reduce(
    CHANNEL_PATH,
    (res, path, key) => {
      const link = __getLink(isExternal, releaseBranch, mainBaseURL, path)
      res[key] = link
      return res
    },
    {}
  )
  links[CHANNEL_KEY.kidsReporter] = __composeExternalLink(
    __getExternalLinks().kidsReporter,
    '_blank'
  )
  if (LAWMAKER) {
    links[CHANNEL_KEY.lawmaker] = __composeExternalLink(
      __getExternalLinks().lawmaker,
      '_blank'
    )
  }

  return links
}

export function getTabBarLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return {
    home: __getLink(isExternal, releaseBranch, mainBaseURL, ''),
    latest: __getLink(isExternal, releaseBranch, mainBaseURL, '/latest'),
    topic: __getLink(isExternal, releaseBranch, mainBaseURL, '/topics'),
    myreading: __getLink(isExternal, releaseBranch, mainBaseURL, '/myreading'),
  }
}
