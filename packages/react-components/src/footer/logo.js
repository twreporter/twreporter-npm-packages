import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import styles from './constants/styles'
// core
import { assets as assetsPath } from './constants/paths'
import mq from '@twreporter/core/lib/utils/media-query'

const Link = styled.a`
  position: relative;
  cursor: pointer;
  text-decoration: none !important;
`

const StyledReporterLogo = styled.div`
  transform: translateX(-22px);
  width: ${styles.reporterLogo.width.mobile}px;
  height: ${styles.reporterLogo.height.mobile}px;
  img {
    width: 100%;
    filter: grayscale(100%);
    opacity: ${styles.grayScaleOpacity.pureBlackWhiteSrc};
  }
  img:hover {
    filter: none;
    opacity: 1;
  }
  ${mq.tabletAndAbove`
    width: ${styles.reporterLogo.width.desktop}px;
    height: ${styles.reporterLogo.height.desktop}px;
  `}
  ${mq.hdOnly`
    transform: translateX(-25px);
    width: ${styles.reporterLogo.width.hd}px;
    height: ${styles.reporterLogo.height.hd}px;
  `}
`

class Logo extends React.PureComponent {
  render() {
    const { mainOrigin } = this.props
    return (
      <Link href={mainOrigin}>
        <StyledReporterLogo>
          <img
            alt="The Reporter Logo"
            src={`${assetsPath}logo-horizontal02.svg`}
          />
        </StyledReporterLogo>
      </Link>
    )
  }
}

Logo.propTypes = {
  mainOrigin: PropTypes.string.isRequired,
}

Logo.defaultProps = {
  mainOrigin: '',
}

export default Logo
