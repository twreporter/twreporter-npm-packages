import requestOrigins from '../constants/request-origins'
import { getGlobalEnv } from './global-env'

const { releaseBranch } = getGlobalEnv()

const signInSearchKeys = {
  destination: 'destination',
}
const signInPathname = '/signin'

export function getSignInHref(destination = '') {
  const signInOrigin =
    requestOrigins.forClientSideRendering[releaseBranch].accounts
  const currentHrefSearch = destination
    ? `?${signInSearchKeys.destination}=${destination}`
    : ''
  return `${signInOrigin}${signInPathname}${currentHrefSearch}`
}
