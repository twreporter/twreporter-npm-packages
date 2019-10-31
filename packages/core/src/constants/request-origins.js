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
    api: 'http://go-api:8080',
    main: 'http://staging.twreporter.org',
    support: 'https://staging-support.twreporter.org',
  },
  [releaseBranch.preview]: {
    accounts: 'https://staging-accounts.twreporter.org',
    api: 'http://go-api:8080',
    main: 'https://staging.twreporter.org',
    support: 'https://staging-support.twreporter.org',
  },
  [releaseBranch.release]: {
    accounts: 'https://accounts.twreporter.org',
    api: 'http://go-api:8080',
    main: 'https://www.twreporter.org',
    support: 'https://support.twreporter.org',
  },
  [releaseBranch.next]: {
    accounts: 'https://next-accounts.twreporter.org',
    api: 'http://go-api:8080',
    main: 'https://next.twreporter.org',
    support: 'https://next-support.twreporter.org',
  },
}

const forClientSideRendering = {
  [releaseBranch.master]: forServerSideRendering[releaseBranch.master],
  [releaseBranch.test]: forServerSideRendering[releaseBranch.test],
  [releaseBranch.staging]: {
    accounts: forServerSideRendering[releaseBranch.staging].accounts,
    api: 'https://staging-go-api.twreporter.org:443',
    main: forServerSideRendering[releaseBranch.staging].main,
    support: forServerSideRendering[releaseBranch.staging].support,
  },
  [releaseBranch.preview]: {
    accounts: forServerSideRendering[releaseBranch.preview].accounts,
    api: 'https://staging-go-api.twreporter.org:443',
    main: forServerSideRendering[releaseBranch.preview].main,
    support: forServerSideRendering[releaseBranch.preview].support,
  },
  [releaseBranch.release]: {
    accounts: forServerSideRendering[releaseBranch.release].accounts,
    api: 'https://go-api.twreporter.org:443',
    main: forServerSideRendering[releaseBranch.release].main,
    support: forServerSideRendering[releaseBranch.release].support,
  },
  [releaseBranch.next]: {
    accounts: forServerSideRendering[releaseBranch.next].accounts,
    api: 'https://next-go-api.twreporter.org:443',
    main: forServerSideRendering[releaseBranch.next].main,
    support: forServerSideRendering[releaseBranch.next].support,
  },
}

export default {
  forClientSideRendering,
  forServerSideRendering,
}
