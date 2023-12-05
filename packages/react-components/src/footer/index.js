import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// components
import Content from './content'
import IconList from './icon-list'
// constants
import styles from './constants/styles'
// @twreporter
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import { fontWeight } from '@twreporter/core/lib/constants/font'
import fundraisingId from '@twreporter/core/lib/constants/fundraising'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const FooterContainer = styled.div`
  border-top: solid 0.5px ${colorGrayscale.gray300};
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

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  ${mq.tabletAndBelow`
    flex-direction: column;
    p:last-child {
      margin-top: 10px;
    }
  `}
  ${mq.mobileOnly`
    width: 100%;
    margin-top: 30px;
  `}
  ${mq.tabletOnly`
    align-items: baseline;
    margin-top: 50px;
  `}
  ${mq.desktopAndAbove`
    width: 100%;
    margin-top: 30px;
    justify-content: space-between;
  `}
`

const InfoContainer = styled.p`
  font-size: 12px;
  font-weight: ${fontWeight.normal};
  letter-spacing: 0.4px;
  color: ${colorGrayscale.gray500};
  ${mq.mobileOnly`
    text-align: center;
  `}
`

const Copyright = () => {
  const currentYear = new Date().getFullYear()
  return (
    <InfoContainer>{`Copyright © ${currentYear} The Reporter.`}</InfoContainer>
  )
}

const Fundraising = () => {
  if (!fundraisingId) return null
  return <InfoContainer>{fundraisingId}</InfoContainer>
}

class Footer extends React.PureComponent {
  render() {
    const { bgColor, releaseBranch, pathname, host } = this.props
    return (
      <FooterContainer bgColor={bgColor}>
        <FooterContent>
          <Content
            pathname={pathname}
            host={host}
            releaseBranch={releaseBranch}
          />
          <IconList />
          <CompanyInfo>
            <Fundraising />
            <Copyright />
          </CompanyInfo>
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
  bgColor: colorGrayscale.white,
  releaseBranch: releaseBranchConsts.release,
  host: '',
  pathname: '',
}

export default Footer
