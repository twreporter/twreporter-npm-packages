import PropTypes from 'prop-types'
// @twreporter
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import { THEME, THEME_PROP_TYPES } from '@twreporter/core/lib/constants/theme'

const contextPropTypes = {
  theme: THEME_PROP_TYPES,
  releaseBranch: BRANCH_PROP_TYPES,
  isLinkExternal: PropTypes.bool,
  isAuthed: PropTypes.bool,
  pathname: PropTypes.string,
  referrerPath: PropTypes.string,
}

const contextDefaultProps = {
  theme: THEME.normal,
  releaseBranch: BRANCH.master,
  isLinkExternal: false,
  isAuthed: false,
  pathname: '',
  referrerPath: '',
}

const linkPropTypes = {
  to: PropTypes.string.isRequired,
  isExternal: PropTypes.bool.isRequired,
}

const hamburgerContextPropTypes = {
  toggleHamburger: PropTypes.func,
  closeHamburgerMenu: PropTypes.func,
  isHamburgerMenuOpen: PropTypes.boolean,
}

const hamburgerContextDefaultProps = {
  toggleHamburger: () => {},
  closeHamburgerMenu: () => {},
  isHamburgerMenuOpen: false,
}

export const CONTEXT_PROP = {
  propTypes: contextPropTypes,
  defaultProps: contextDefaultProps,
}

export const HAMBURGER_CONTEXT_PROP = {
  propTypes: hamburgerContextPropTypes,
  defaultProps: hamburgerContextDefaultProps,
}

export const LINK_PROP = {
  propTypes: linkPropTypes,
}
