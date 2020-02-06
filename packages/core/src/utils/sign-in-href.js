import requestOrigins from '../constants/request-origins'
import { getGlobalEnv } from './global-env'

const { releaseBranch } = getGlobalEnv()

const signInSearchKeys = {
  destination: 'destination',
}
const signInPathname = '/signin'
const mainHref = requestOrigins.forClientSideRendering[releaseBranch].main

export function getSignInHref(destination = mainHref) {
  const signInOrigin =
    requestOrigins.forClientSideRendering[releaseBranch].accounts
  const currentHrefSearch = destination
    ? `?${signInSearchKeys.destination}=${destination}`
    : ''
  return `${signInOrigin}${signInPathname}${currentHrefSearch}`
}
