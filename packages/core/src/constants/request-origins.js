import releaseBranch from './release-branch'

const forServerSideRendering = {
  [releaseBranch.master]: {
    accounts: 'http://localhost:3001',
    api: 'http://localhost:8080',
    main: 'http://localhost:3000',
    support: 'http://localhost:3001',
  },
  [releaseBranch.test]: {
    accounts: 'http://localhost:3001',
    api: 'http://localhost:8080',
    main: 'http://localhost:3000',
    support: 'http://localhost:3001',
  },
  [releaseBranch.staging]: {
    accounts: 'https://staging-accounts.twreporter.org',
    api: 'https://staging-go-api.twreporter.org',
    main: 'https://staging.twreporter.org',
    support: 'https://staging-support.twreporter.org',
  },
  [releaseBranch.preview]: {
    accounts: 'https://accounts.twreporter.org',
    api: 'https://go-api.twreporter.org',
    main: 'https://www.twreporter.org',
    support: 'https://support.twreporter.org',
  },
  [releaseBranch.release]: {
    accounts: 'https://accounts.twreporter.org',
    api: 'https://go-api.twreporter.org',
    main: 'https://www.twreporter.org',
    support: 'https://support.twreporter.org',
  },
  [releaseBranch.dev]: {
    accounts: 'https://dev-accounts.twreporter.org',
    api: 'https://staging-go-api.twreporter.org',
    main: 'https://dev.twreporter.org',
    support: 'https://dev-support.twreporter.org',
  },
}

const forClientSideRendering = {
  [releaseBranch.master]: forServerSideRendering[releaseBranch.master],
  [releaseBranch.test]: forServerSideRendering[releaseBranch.test],
  [releaseBranch.staging]: forServerSideRendering[releaseBranch.staging],
  [releaseBranch.preview]: forServerSideRendering[releaseBranch.preview],
  [releaseBranch.release]: forServerSideRendering[releaseBranch.release],
  [releaseBranch.dev]: forServerSideRendering[releaseBranch.dev],
}

export default {
  forClientSideRendering,
  forServerSideRendering,
}
