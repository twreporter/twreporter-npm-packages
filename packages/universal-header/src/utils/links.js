import { categoryPathnames } from '../constants/categories'
import { channelPathnames } from '../constants/channels'
import { servicePathnames, serviceKeys } from '../constants/services'
import externalLinks from '../constants/external-links'
// @twreporter
import origins from '@twreporter/core/lib/constants/request-origins'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
// lodash
import forEach from 'lodash/forEach'

const _ = {
  forEach,
}

const originsForClient = origins.forClientSideRendering

/**
 * @param {string} domain - one of 'account', 'main', 'support', or 'api'
 * @returns
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

function __getLinks(isExternal, releaseBranch, baseURL, paths) {
  const rtn = {}

  if (isExternal) {
    if (baseURL.hasOwnProperty(releaseBranch)) {
      for (const key in paths) {
        rtn[key] = {
          to: baseURL[releaseBranch] + paths[key],
          isExternal,
        }
      }
      return rtn
    }
  }

  for (const key in paths) {
    rtn[key] = {
      to: paths[key],
      isExternal,
    }
  }

  return rtn
}

function __getLink(isExternal, releaseBranch, baseURL, path) {
  if (isExternal) {
    if (baseURL.hasOwnProperty(releaseBranch)) {
      return {
        to: baseURL[releaseBranch] + path,
        isExternal,
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

function getCategoryLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLinks(isExternal, releaseBranch, mainBaseURL, categoryPathnames)
}

function getChannelLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLinks(isExternal, releaseBranch, mainBaseURL, channelPathnames)
}

function getLogoutLink(releaseBranch = defaultReleaseBranch) {
  return {
    to: apiBaseURL[releaseBranch] + servicePathnames.logout,
    isExternal: true,
  }
}

function getLoginLink(releaseBranch = defaultReleaseBranch) {
  return {
    to: accountsBaseURL[releaseBranch] + servicePathnames.login,
    isExternal: true,
  }
}

function getBookmarksLink(
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

function getSearchLink(
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

function getLogoLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(isExternal, releaseBranch, mainBaseURL, '')
}

function getServiceLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return {
    [serviceKeys.bookmarks]: getBookmarksLink(isExternal, releaseBranch),
    [serviceKeys.login]: getLoginLink(releaseBranch),
    [serviceKeys.logout]: getLogoutLink(releaseBranch),
    [serviceKeys.search]: getSearchLink(isExternal, releaseBranch),
    [serviceKeys.support]: {
      to: __getExternalLinks().monthlyDonation,
      isExternal: true,
    },
    [serviceKeys.newsLetter]: {
      to: __getExternalLinks().newsLetter,
      isExternal: true,
    },
  }
}

export default {
  getBookmarksLink,
  getCategoryLinks,
  getChannelLinks,
  getServiceLinks,
  getLogoLink,
  getLoginLink,
  getLogoutLink,
  getSearchLink,
}
