import { servicePathnames } from '../constants/services'
import { ACTION_KEY } from '../constants/actions'
import { FOOTER_KEY, FOOTER_PATH } from '../constants/footer'
import { SOCIAL_MEDIA_KEY } from '../constants/social-media'
import { CHANNEL_KEY, CHANNEL_PATH } from '../constants/channels'
import externalLinks from '../constants/external-links'
// @twreporter
import origins from '@twreporter/core/lib/constants/request-origins'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
// lodash
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import split from 'lodash/split'
const _ = {
  forEach,
  reduce,
  split,
}

const originsForClient = origins.forClientSideRendering

/**
 * @param {string} domain - one of 'account', 'main', 'support', or 'api'
 * @returns {Object}
 */
function getOriginsByType(domain) {
  const baseURL = {}
  _.forEach(releaseBranchConsts, branch => {
    baseURL[branch] = originsForClient[branch][domain]
  })
  return baseURL
}

const accountsBaseURL = getOriginsByType('accounts')
const apiBaseURL = getOriginsByType('api')
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

export const getCategoryLink = (
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch,
  path = ''
) => {
  return __getLink(isExternal, releaseBranch, mainBaseURL, path)
}

export function getLogoutLink(releaseBranch = defaultReleaseBranch) {
  return {
    to: apiBaseURL[releaseBranch] + servicePathnames.logout,
    isExternal: true,
  }
}

export function getLoginLink(releaseBranch = defaultReleaseBranch) {
  return {
    to: accountsBaseURL[releaseBranch] + servicePathnames.login,
    isExternal: true,
  }
}

export function getBookmarksLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(
    isExternal,
    releaseBranch,
    mainBaseURL,
    servicePathnames.bookmarks
  )
}

export function getSearchLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(
    isExternal,
    releaseBranch,
    mainBaseURL,
    servicePathnames.search
  )
}

export function getLogoLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(isExternal, releaseBranch, mainBaseURL, '')
}

export function getActionLinks() {
  return {
    [ACTION_KEY.support]: __composeExternalLink(
      __getExternalLinks().monthlyDonation
    ),
    [ACTION_KEY.newsLetter]: __composeExternalLink(
      __getExternalLinks().newsLetter
    ),
  }
}

export function getFooterLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return {
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
  }
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

  return links
}

export function getTabBarLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return {
    home: __getLink(isExternal, releaseBranch, mainBaseURL, ''),
    latest: __getLink(isExternal, releaseBranch, mainBaseURL, '/latest'),
    bookmark: __getLink(
      isExternal,
      releaseBranch,
      mainBaseURL,
      servicePathnames.bookmarks
    ),
  }
}
