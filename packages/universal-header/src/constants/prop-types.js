import PropTypes from 'prop-types'
import releaseBranchConst from './release-branch'
import theme from './theme'

const releaseBranchPropTypes = PropTypes.oneOf([
  releaseBranchConst.master,
  releaseBranchConst.test,
  releaseBranchConst.staging,
  releaseBranchConst.release,
])
const themePropTypes = PropTypes.oneOf([
  theme.normal,
  theme.transparent,
  theme.photography,
  theme.index,
])

const contextPropTypes = {
  theme: themePropTypes,
  releaseBranch: releaseBranchPropTypes,
  isLinkExternal: PropTypes.bool,
}

const contextDefaultProps = {
  theme: theme.normal,
  releaseBranch: releaseBranchConst.master,
  isLinkExternal: false,
}

const linkPropTypes = {
  to: PropTypes.string.isRequired,
  isExternal: PropTypes.bool.isRequired,
}

const headerPropTypes = {
  pathname: PropTypes.string,
}

const headerDefaultProps = {
  pathname: '',
}

export default {
  header: {
    propTypes: headerPropTypes,
    defaultProps: headerDefaultProps,
  },
  context: {
    propTypes: contextPropTypes,
    defaultProps: contextDefaultProps,
  },
  link: {
    propTypes: linkPropTypes,
  },
}
