import PropTypes from 'prop-types'

export const BRANCH = {
  master: 'master',
  test: 'test',
  preview: 'preview',
  staging: 'staging',
  release: 'release',
  next: 'next',
  dev: 'dev',
}

export const BRANCH_PROP_TYPES = PropTypes.oneOf([
  BRANCH.master,
  BRANCH.staging,
  BRANCH.preview,
  BRANCH.release,
  BRANCH.dev,
])

export default {
  master: 'master',
  // for dev
  test: 'test',
  // for keystone preview servers
  preview: 'preview',
  staging: 'staging',
  release: 'release',
  dev: 'dev',
}
