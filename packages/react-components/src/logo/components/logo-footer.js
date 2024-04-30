import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// utils
import pathUtil from '../utils/path'
// @twreporter
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import mq from '@twreporter/core/lib/utils/media-query'

const LogoContainer = styled.img`
  filter: none;
  opacity: 1;
  width: 272px;
  height: 29px;
  ${mq.tabletAndBelow`
    width: 232px;
    height: 25px;
  `}
`

const logoType = {
  DEFAULT: 'default',
  WHITE: 'white',
}

const LogoFooter = ({ releaseBranch, type }) => {
  const src = pathUtil.selectLogoPath('footer', releaseBranch, type)
  return <LogoContainer alt="The Reporter Logo" src={src} />
}
LogoFooter.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
  type: PropTypes.oneOf(Object.values(logoType)),
}
LogoFooter.defaultProps = {
  releaseBranch: BRANCH.master,
  type: logoType.DEFAULT,
}

LogoFooter.Type = logoType

export default LogoFooter
