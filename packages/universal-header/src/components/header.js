import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// context
import HeaderContext from '../contexts/header-context'
// utils
import linkUtils from '../utils/links'
import themeUtils from '../utils/theme'
// components
import Channel from './channels'
import ActionButton from './action-button'
import Icons from './icons'
import Slogan from './slogan'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import mq from '@twreporter/core/lib/utils/media-query'
import { LogoHeader } from '@twreporter/react-components/lib/logo'
import { IconButton } from '@twreporter/react-components/lib/button'
import { Hamburger } from '@twreporter/react-components/lib/icon'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  ${mq.hdOnly`
    width: 1280px;
  `}
  ${mq.desktopOnly`
    padding: 0 48px;
  `}
  ${mq.tabletOnly`
    padding: 0 32px;
  `}
  ${mq.mobileOnly`
    padding: 0 24px;
  `}
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`
const HideWhenNarrow = styled.div``
const ShowWhenNarrow = styled.div``
const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => (props.toUseNarrow ? '16px' : '24px')} 16px;
  background-color: ${colorGrayscale.gray100};
  z-index: 501;
  ${ShowWhenNarrow} {
    opacity: ${props => (props.toUseNarrow ? '1' : '0')};
    transition: opacity 100ms;
    transition-delay: ${props => (props.toUseNarrow ? '100ms' : 0)};
  }
  ${HideWhenNarrow} {
    opacity: ${props => (props.toUseNarrow ? '0' : '1')};
    transition: opacity 100ms;
  }
  ${LogoContainer} {
    margin-left: ${props => (props.toUseNarrow ? '24px' : '0')};
    transform: translateX(${props => (props.toUseNarrow ? '0' : '-24px')});
    transition: transform 100ms;
    img,
    a {
      height: ${props => (props.toUseNarrow ? '24px' : '32px')};
      transition: height 100ms;
    }
  }
`
const IconContainer = styled.div`
  margin-left: 24px;
`
const FlexGroup = styled.div`
  display: flex;
  align-items: center;
`
const StyledChannel = styled(Channel)`
  transform: translateY(${props => (props.toUseNarrow ? '-50px' : '0')});
  transition: transform 300ms
  z-index: 500;
`

const Header = ({ pathname = '', actions = [] }) => {
  const { releaseBranch, isLinkExternal, theme, toUseNarrow } = useContext(
    HeaderContext
  )
  const logoLink = linkUtils.getLogoLink(isLinkExternal, releaseBranch)
  const logoType = themeUtils.selectLogoType(theme)
  const HamburgerIcon = <Hamburger releaseBranch={releaseBranch} />

  return (
    <HeaderContainer>
      <TopRow toUseNarrow={toUseNarrow}>
        <FlexGroup>
          <ShowWhenNarrow>
            <IconButton iconComponent={HamburgerIcon} theme={theme} />
          </ShowWhenNarrow>
          <LogoContainer>
            <Link {...logoLink}>
              <LogoHeader type={logoType} releaseBranch={releaseBranch} />
            </Link>
          </LogoContainer>
          <HideWhenNarrow>
            <Slogan />
          </HideWhenNarrow>
        </FlexGroup>
        <FlexGroup>
          <HideWhenNarrow>
            <ActionButton actions={actions} />
          </HideWhenNarrow>
          <IconContainer>
            <Icons />
          </IconContainer>
        </FlexGroup>
      </TopRow>
      <StyledChannel toUseNarrow={toUseNarrow} />
    </HeaderContainer>
  )
}
Header.propTypes = {
  pathname: PropTypes.string,
  actions: PropTypes.array,
}

export default Header
