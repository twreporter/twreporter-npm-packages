import styles from './constants/styles'
import Content from './content'
import IconList from './icon-list'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// core
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import mq from '@twreporter/core/lib/utils/media-query'
import origins from '@twreporter/core/lib/constants/request-origins'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

const FooterContainer = styled.div`
  border-top: solid 0.5px #d8d8d8;
  width: 100%;
  background-color: ${props => props.bgColor};
  padding: 0;
  ${mq.tabletAndAbove`
    min-height: ${styles.footerHeight.desktop}px;
  `}
  ${mq.mobileOnly`
    max-height: 811px;
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
  font-weight: ${fontWeight.medium};
  letter-spacing: 0.4px;
  color: #9c9c9c;
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
    const { bgColor } = this.props
    const currentYear = new Date().getFullYear()
    return (
      <FooterContainer bgColor={bgColor}>
        <FooterContent>
          <Content mainOrigin={origins.main} />
          <IconList />
          <CopyRight>{`Copyright © ${currentYear} The Reporter.`}</CopyRight>
        </FooterContent>
      </FooterContainer>
    )
  }
}

Footer.propTypes = {
  bgColor: PropTypes.string.isRequired,
  origins: PropTypes.shape({
    main: PropTypes.string,
  }),
}

Footer.defaultProps = {
  bgColor: '#ffffff',
  origins: origins.fromClient[releaseBranchConsts.release],
}

export default Footer
