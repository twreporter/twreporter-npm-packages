import React from 'react'
import styled from 'styled-components'
// utils
import pathUtil from '../utils/path'
// @twreporter
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'

const LogoContainer = styled.img`
  filter: grayscale(100%);
  opacity: 0.4;

  &:hover {
    filter: none;
    opacity: 1;
  }
`

const LogoFooter = ({ releaseBranch }) => {
  const logoSrc = pathUtil.selectLogoPath('footer', releaseBranch)
  return <LogoContainer alt="The Reporter Logo" src={logoSrc} />
}

LogoFooter.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

LogoFooter.defaultProps = {
  releaseBranch: BRANCH.master,
}

export default LogoFooter
