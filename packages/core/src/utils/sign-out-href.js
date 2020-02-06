import requestOrigins from '../constants/request-origins'
import { getGlobalEnv } from './global-env'

const { releaseBranch } = getGlobalEnv()

const signOutSearchKeys = {
  destination: 'destination',
}
const signOutPathname = '/v2/auth/logout'
const mainHref = requestOrigins.forClientSideRendering[releaseBranch].main

export function getSignOutHref(destination = mainHref) {
  const signOutOrigin = requestOrigins.forClientSideRendering[releaseBranch].api
  const currentHrefSearch = destination
    ? `?${signOutSearchKeys.destination}=${destination}`
    : ''
  return `${signOutOrigin}${signOutPathname}${currentHrefSearch}`
}
