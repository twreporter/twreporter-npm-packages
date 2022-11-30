import PropTypes from 'prop-types'
import theme from './theme'
// @twreporter
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

const themePropTypes = PropTypes.oneOf([
  theme.normal,
  theme.transparent,
  theme.photography,
  theme.index,
])

const contextPropTypes = {
  theme: themePropTypes,
  releaseBranch: predefinedPropTypes.releaseBranch,
  isLinkExternal: PropTypes.bool,
  isAuthed: PropTypes.bool,
}

const contextDefaultProps = {
  theme: theme.normal,
  releaseBranch: releaseBranchConsts.master,
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
