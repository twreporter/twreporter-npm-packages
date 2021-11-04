import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// components
import Content from './content'
import IconList from './icon-list'
// constants
import styles from './constants/styles'
import color from './constants/color'
// @twreporter
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import { fontWeight } from '@twreporter/core/lib/constants/font'

const FooterContainer = styled.div`
  border-top: solid 0.5px ${color.lightGray};
  width: 100%;
  background-color: ${props => props.bgColor};
  padding: 0;
  ${mq.tabletAndAbove`
    min-height: ${styles.footerHeight.desktop}px;
  `}
  * {
    box-sizing: border-box;
  }
`

const FooterContent = styled.div`
  position: relative;
  ${mq.mobileOnly`
    padding: ${arrayToCssShorthand(styles.footerContentPadding.mobile)};
  `}
  ${mq.tabletOnly`
    padding: ${arrayToCssShorthand(styles.footerContentPadding.tablet)};
    max-width: 
  `}
  ${mq.desktopOnly`
    padding: ${arrayToCssShorthand(styles.footerContentPadding.desktop)};
    max-width: ${styles.footerContentMaxWidth.desktop}px;  
  `}
  ${mq.hdOnly`
    padding: ${arrayToCssShorthand(styles.footerContentPadding.hd)};
    max-width: ${styles.footerContentMaxWidth.hd}px;
  `}
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
`

const CopyRight = styled.p`
  font-size: 12px;
  font-weight: ${fontWeight.normal};
  letter-spacing: 0.4px;
  color: ${color.gray};
  ${mq.mobileOnly`
    text-align: center;
    margin-top: 10px;
  `}
  ${mq.tabletAndAbove`
    margin-top: 40px;
  `}
  ${mq.hdOnly`
    margin-top: 60px;
  `}  
`

class Footer extends React.PureComponent {
  render() {
    const { bgColor, releaseBranch, pathname, host } = this.props
    const currentYear = new Date().getFullYear()
    return (
      <FooterContainer bgColor={bgColor}>
        <FooterContent>
          <Content
            pathname={pathname}
            host={host}
            releaseBranch={releaseBranch}
          />
          <IconList />
          <CopyRight>{`Copyright © ${currentYear} The Reporter.`}</CopyRight>
        </FooterContent>
      </FooterContainer>
    )
  }
}

Footer.propTypes = {
  bgColor: PropTypes.string,
  releaseBranch: predefinedPropTypes.releaseBranch,
  host: PropTypes.string,
  pathname: PropTypes.string,
}

Footer.defaultProps = {
  bgColor: color.white,
  releaseBranch: releaseBranchConsts.release,
  host: '',
  pathname: '',
}

export default Footer
