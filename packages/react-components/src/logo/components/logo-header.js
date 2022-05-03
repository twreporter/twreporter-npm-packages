import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import pathUtil from '../utils/path'
// @twreporter
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

const LogoContainer = styled.img`
  ${(props) => (props.isHide ? 'display: none;' : '')}
`

const LogoHeader = ({ type, releaseBranch }) => {
  const [logoDefaultSrc, logoWhiteSrc] = pathUtil.selectLogoPath(
    'header',
    releaseBranch
  )
  return (
    <React.Fragment>
      <LogoContainer
        alt="The Reporter Logo"
        src={logoDefaultSrc}
        isHide={type !== 'default'}
      />
      <LogoContainer
        alt="The Reporter Logo"
        src={logoWhiteSrc}
        isHide={type !== 'white'}
      />
    </React.Fragment>
  )
}

LogoHeader.propTypes = {
  type: PropTypes.oneOf(['default', 'white']),
  releaseBranch: predefinedPropTypes.releaseBranch,
}

LogoHeader.defaultProps = {
  type: 'default',
  releaseBranch: releaseBranchConsts.master,
}

export default LogoHeader
