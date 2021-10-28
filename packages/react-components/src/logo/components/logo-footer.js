import React from 'react'
import styled from 'styled-components'
// utils
import pathUtil from '../utils/path'
// @twreporter
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

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
  releaseBranch: predefinedPropTypes.releaseBranch,
}

LogoFooter.deafaultProps = {
  releaseBranch: releaseBranchConsts.master,
}

export default LogoFooter
