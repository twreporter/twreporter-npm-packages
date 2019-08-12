import releaseBranchConst from '../constants/release-branch'
import querystring from 'querystring'
import { api as apiBaseURL } from '../constants/base-url'

export function formAPIURL(
  releaseBranch = releaseBranchConst.master,
  path = '',
  params = {}
) {
  const query = querystring.stringify(params)
  return `${apiBaseURL[releaseBranch]}${path}${query ? '?' + query : ''}`
}

export default {
  formAPIURL,
}
