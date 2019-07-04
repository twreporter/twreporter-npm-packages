/* 
  Webpack defined plugin may replace the value of process.env.NODE_ENV directly.
  So we cannot retireve the value via `_.get(process, 'env.NODE_ENV`)` since process.env is a empty object that the plugin won't touch.
  Ref: https://stackoverflow.com/questions/41248575/webpack-react-process-env-always-empty-windows-10
*/
const isEnvExists =
  typeof process === 'object' && typeof process.env === 'object'

const globalEnv = {
  nodeEnv: (isEnvExists && process.env.NODE_ENV) || 'development',
  releaseBranch: (isEnvExists && process.env.RELEASE_BRANCH) || 'master',
}

export function getGlobalEnv() {
  return globalEnv
}
