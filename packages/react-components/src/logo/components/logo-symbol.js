import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import pathUtil from '../utils/path'
// @twreporter
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'

const LogoContainer = styled.img``

const LogoSymbol = ({
  type = 'default',
  releaseBranch = BRANCH.master,
  ...props
}) => {
  const logoSrc = pathUtil.selectLogoPath('symbol', releaseBranch, type)

  return <LogoContainer src={logoSrc} alt="The Reporter Logo" {...props} />
}
LogoSymbol.propTypes = {
  type: PropTypes.oneOf(['default', 'black', 'white']),
  releaseBranch: BRANCH_PROP_TYPES,
}

export default LogoSymbol
