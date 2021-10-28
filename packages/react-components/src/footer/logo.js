import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// components
import { LogoFooter } from '../logo'
// constants
import styles from './constants/styles'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

const Link = styled.a`
  position: relative;
  cursor: pointer;
  text-decoration: none !important;
`

const StyledReporterLogo = styled.div`
  width: ${styles.reporterLogo.width.mobile}px;
  height: ${styles.reporterLogo.height.mobile}px;
  ${mq.tabletAndAbove`
    width: ${styles.reporterLogo.width.desktop}px;
    height: ${styles.reporterLogo.height.desktop}px;
  `}
  ${mq.hdOnly`
    width: ${styles.reporterLogo.width.hd}px;
    height: ${styles.reporterLogo.height.hd}px;
  `}
`

const Logo = ({ mainOrigin, releaseBranch }) => {
  return (
    <Link href={mainOrigin}>
      <StyledReporterLogo>
        <LogoFooter releaseBranch={releaseBranch} />
      </StyledReporterLogo>
    </Link>
  )
}

Logo.propTypes = {
  mainOrigin: PropTypes.string.isRequired,
  releaseBranch: predefinedPropTypes.releaseBranch,
}

Logo.defaultProps = {
  mainOrigin: '',
  releaseBranch: releaseBranchConsts.release,
}

export default Logo
