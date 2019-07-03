import get from 'lodash/get'

const _ = {
  get,
}

const globalEnv = {
  nodeEnv: _.get(process, 'env.NODE_ENV') || 'development',
  releaseBranch: _.get(process, 'env.RELEASE_BRANCH') || 'master',
}

export function getGlobalEnv() {
  return globalEnv
}
