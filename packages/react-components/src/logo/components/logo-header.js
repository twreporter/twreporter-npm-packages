import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import pathUtil from '../utils/path'
// @twreporter
import { BRANCH } from '@twreporter/core/lib/constants/release-branch'

const LogoContainer = styled.img``

const logoType = {
  DEFAULT: 'default',
  WHITE: 'white',
}
const LogoHeader = ({ type, releaseBranch, ...props }) => {
  const logoSrc = pathUtil.selectLogoPath('header', releaseBranch, type)

  return (
    <React.Fragment>
      <LogoContainer alt="The Reporter Logo" src={logoSrc} {...props} />
    </React.Fragment>
  )
}
LogoHeader.propTypes = {
  type: PropTypes.oneOf(Object.values(logoType)),
  releaseBranch: PropTypes.oneOf(Object.values(BRANCH)),
}
LogoHeader.defaultProps = {
  type: 'default',
  releaseBranch: BRANCH.master,
}
LogoHeader.releaseBranch = BRANCH
LogoHeader.type = logoType

export default LogoHeader
