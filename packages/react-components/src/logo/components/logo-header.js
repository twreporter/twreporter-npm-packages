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

const LogoHeader = ({ type, releaseBranch, ...props }) => {
  const logoSrc = pathUtil.selectLogoPath('header', releaseBranch, type)

  return (
    <React.Fragment>
      <LogoContainer alt="The Reporter Logo" src={logoSrc} {...props} />
    </React.Fragment>
  )
}

LogoHeader.propTypes = {
  type: PropTypes.oneOf(['default', 'white']),
  releaseBranch: BRANCH_PROP_TYPES,
}

LogoHeader.defaultProps = {
  type: 'default',
  releaseBranch: BRANCH.master,
}

export default LogoHeader
