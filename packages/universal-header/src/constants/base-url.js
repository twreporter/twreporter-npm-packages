import releaseBranch from './release-branch'

export const accounts = {
  [releaseBranch.master]: 'http://localhost:3000',
  [releaseBranch.test]: 'http://localhost:3000',
  [releaseBranch.staging]: 'https://staging-accounts.twreporter.org',
  [releaseBranch.release]: 'https://accounts.twreporter.org',
}

export const main = {
  [releaseBranch.master]: 'http://localhost:3000',
  [releaseBranch.test]: 'http://localhost:3000',
  [releaseBranch.staging]: 'https://staging.twreporter.org',
  [releaseBranch.release]: 'https://www.twreporter.org',
}

export const support = {
  [releaseBranch.master]: 'http://localhost:3000',
  [releaseBranch.test]: 'http://localhost:3000',
  [releaseBranch.staging]: 'https://staging-support.twreporter.org',
  [releaseBranch.release]: 'https://support.twreporter.org',
}

export const api = {
  [releaseBranch.master]: 'http://localhost:8080',
  [releaseBranch.test]: 'http://localhost:8080',
  [releaseBranch.staging]: 'https://staging-go-api.twreporter.org',
  [releaseBranch.release]: 'https://go-api.twreporter.org',
}

export default {
  accounts,
  api,
  main,
  support,
}
