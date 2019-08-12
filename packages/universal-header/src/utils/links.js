import releaseBranchConst from '../constants/release-branch'
import externalLinks from '../constants/external-links'
import { channelPathnames } from '../constants/channels'
import { categoryPathnames } from '../constants/categories'
import { servicePathnames, serviceKeys } from '../constants/services'
import {
  accounts as accountsBaseURL,
  api as apiBaseURL,
  main as mainBaseURL,
} from '../constants/base-url'

const defaultReleaseBranch = releaseBranchConst.master
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
