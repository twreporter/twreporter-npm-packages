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
  isAuthed: PropTypes.bool,
}

const contextDefaultProps = {
  theme: theme.normal,
  releaseBranch: releaseBranchConst.master,
  isLinkExternal: false,
  isAuthed: false,
}

const linkPropTypes = {
  to: PropTypes.string.isRequired,
  isExternal: PropTypes.bool.isRequired,
}

export default {
  context: {
    propTypes: contextPropTypes,
    defaultProps: contextDefaultProps,
  },
  link: {
    propTypes: linkPropTypes,
  },
}
