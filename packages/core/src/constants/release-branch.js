import PropTypes from 'prop-types'

export const BRANCH = {
  master: 'master',
  test: 'test',
  preview: 'preview',
  staging: 'staging',
  release: 'release',
  next: 'next',
}

export const BRANCH_PROP_TYPES = PropTypes.oneOf([
  BRANCH.master,
  BRANCH.staging,
  BRANCH.preview,
  BRANCH.release,
])

export const BRANCH_STORYBOOK_ARG_TYPE = {
  defaultValue: BRANCH.master,
  options: [BRANCH.master, BRANCH.staging, BRANCH.preview, BRANCH.release],
  control: { type: 'radio' },
}

export default {
  master: 'master',
  // for dev
  test: 'test',
  // for keystone preview servers
  preview: 'preview',
  staging: 'staging',
  release: 'release',
  // `next` release branch is reserved for online migration purpose
  // for example,
  // we want to migrate our k8s cluster from old to new one.
  // old cluster: `release` branch, serve right now
  // new cluster: `next` branch, plan to serve requests afterwards
  // we could build `next` branch on new cluster
  // to test web functionalities before switching requests to new cluster.
  // `next` branch is applied end-to-end,
  // including cloudflare, nginx, frontend and backend.
  // for users, the hostname of url would be
  // - main site: next.twreporter.org
  // - accounts site: next-accounts.twreporter.org
  // - support site: next-support.twreporter.org
  // - backend: next-go-api.twreporter.org
  next: 'next',
}
