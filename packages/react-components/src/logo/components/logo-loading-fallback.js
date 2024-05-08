import React from 'react'
import styled from 'styled-components'
// utils
import pathUtil from '../utils/path'
// @twreporter
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'

const LogoContainer = styled.img``

const LogoFallback = ({ releaseBranch = BRANCH.master }) => {
  const logoSrc = pathUtil.selectLogoPath('loading-fallback', releaseBranch)
  return <LogoContainer alt="The Reporter Loading Fallback" src={logoSrc} />
}
LogoFallback.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export default LogoFallback
