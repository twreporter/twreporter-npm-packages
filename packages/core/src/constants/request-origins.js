import releaseBranch from './release-branch'

const fromServer = {
  [releaseBranch.master]: {
    // accounts: 'http://localhost:3001',
    api: 'http://localhost:8080',
    main: 'http://localhost:3000',
    // support: 'http://localhost:3001'
  },
  [releaseBranch.test]: {
    api: 'http://localhost:8080',
    main: 'http://localhost:3000',
  },
  [releaseBranch.staging]: {
    api: 'http://go-api:8080',
    main: 'http://staging.twreporter.org',
  },
  [releaseBranch.preview]: {
    api: 'http://go-api:8080',
    main: 'https://staging.twreporter.org',
  },
  [releaseBranch.release]: {
    api: 'http://go-api:8080',
    main: 'https://www.twreporter.org',
  },
}

const fromClient = {
  [releaseBranch.master]: fromServer.master,
  [releaseBranch.test]: fromServer.test,
  [releaseBranch.staging]: {
    api: 'https://staging-go-api.twreporter.org:443',
    main: 'https://staging.twreporter.org',
  },
  [releaseBranch.preview]: {
    api: 'https://staging-go-api.twreporter.org:443',
    main: 'https://staging.twreporter.org',
  },
  [releaseBranch.release]: {
    api: 'https://go-api.twreporter.org:443',
    main: 'https://www.twreporter.org',
  },
}

export default {
  fromClient,
  fromServer,
}
