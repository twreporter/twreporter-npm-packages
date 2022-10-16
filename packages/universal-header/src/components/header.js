import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import CSSTransition from 'react-transition-group/CSSTransition'
// context
import HeaderContext from '../contexts/header-context'
// utils
import { getLogoLink } from '../utils/links'
import { selectLogoType, selectHeaderTheme } from '../utils/theme'
// constants
import { MENU_WIDTH } from '../constants/hamburger-menu'
// components
import Channel from './channels'
import ActionButton from './action-button'
import Icons from './icons'
import Slogan from './slogan'
import HamburgerMenu from './hamburger-menu'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import mq from '@twreporter/core/lib/utils/media-query'
import Divider from '@twreporter/react-components/lib/divider'
import { LogoHeader } from '@twreporter/react-components/lib/logo'
import { IconButton } from '@twreporter/react-components/lib/button'
import { Hamburger } from '@twreporter/react-components/lib/icon'
import { useOutsideClick } from '@twreporter/react-components/lib/hook'

const narrowHeaderHeight = 65
const channelHeight = 50
const animation = {
  step1Duration: '200ms',
  step2Delay: '150ms',
  step2Duration: '50ms',
  step3Delay: '150ms',
  step3Duration: '200ms',
}

const channelSlideIn = keyframes`
  from {
    transform: translateY(${-channelHeight}px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`
const channelSlideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(${-channelHeight}px);
  }
`
const ChannelEffect = css`
  .channel-effect-enter {
    opacity: 0;
  }
  .channel-effect-enter-active {
    animation: ${channelSlideIn} ${animation.step1Duration} linear;
    animation-delay: 150ms;
  }
  .channel-effect-exit-active {
    animation: ${channelSlideOut} ${animation.step1Duration} linear;
    animation-delay: 0ms;
  }
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  background-color: ${props => props.bgColor};
  transform: translateY(${props =>
    props.hideHeader ? `${-narrowHeaderHeight}px` : '0'});
  transition: transform 300ms ${props =>
    props.hideHeader ? 'ease-in' : 'ease-out'};

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
  z-index: 501;
  background-color: ${props => props.topRowBgColor};
  ${ShowWhenNarrow} {
    opacity: ${props => (props.toUseNarrow ? '1' : '0')};
    transition: opacity ${animation.step3Duration};
    transition-delay: ${props => (props.toUseNarrow ? '350ms' : 0)};
  }
  ${HideWhenNarrow} {
    opacity: ${props => (props.toUseNarrow ? '0' : '1')};
    transition: opacity ${animation.step3Duration};
    transition-delay: ${props =>
      props.toUseNarrow ? animation.step3Delay : 0};
  }
  ${LogoContainer} {
    margin-left: ${props => (props.toUseNarrow ? '24px' : '0')};
    transform: translateX(${props => (props.toUseNarrow ? '0' : '-24px')});
    transition: all ${animation.step3Duration};
    transition-delay: ${props =>
      props.toUseNarrow ? animation.step3Delay : 0};
    img,
    a {
      height: ${props => (props.toUseNarrow ? '24px' : '32px')};
      transition: height ${animation.step3Duration};
      transition-delay: ${props =>
        props.toUseNarrow ? animation.step3Delay : 0};
    }
  }
`
const StyledDivider = styled(Divider)`
  opacity: ${props => (props.toUseNarrow ? '0' : '1')};
  transition: opacity ${animation.step2Duration};
  transition-delay: ${props => (props.toUseNarrow ? animation.step2Delay : 0)};
`
const IconContainer = styled.div`
  margin-left: 24px;
`
const FlexGroup = styled.div`
  display: flex;
  align-items: center;
`
const ChannelContainer = styled.div`
  z-index: 500;
  ${ChannelEffect}
`
const StyledHamburgerMenu = styled(HamburgerMenu)`
  position: absolute;
  top: 0;
  left: -${MENU_WIDTH.desktop};
  transform: translateX(
    ${props => (props.showHamburger ? MENU_WIDTH.desktop : '0')}
  );
  transition: transform 300ms ease-in-out;
  ${mq.tabletOnly`
    left: -${MENU_WIDTH.tablet};
    transform: translateX(${props =>
      props.showHamburger ? MENU_WIDTH.tablet : '0'});
  `}
`

const Header = ({ pathname = '', actions = [], hbActions = [] }) => {
  const {
    releaseBranch,
    isLinkExternal,
    theme,
    toUseNarrow,
    hideHeader,
  } = useContext(HeaderContext)
  const [showHamburger, setShowHamburger] = useState(false)
  const logoLink = getLogoLink(isLinkExternal, releaseBranch)
  const logoType = selectLogoType(theme)
  const HamburgerIcon = <Hamburger releaseBranch={releaseBranch} />
  const { bgColor, topRowBgColor } = selectHeaderTheme(theme)
  const toggleHamburger = () => setShowHamburger(!showHamburger)
  const closeHamburger = () => setShowHamburger(false)
  const ref = useOutsideClick(closeHamburger)

  return (
    <React.Fragment>
      <HeaderContainer hideHeader={hideHeader} bgColor={bgColor}>
        <TopRow toUseNarrow={toUseNarrow} topRowBgColor={topRowBgColor}>
          <FlexGroup>
            <ShowWhenNarrow>
              <IconButton
                iconComponent={HamburgerIcon}
                theme={theme}
                onClick={toggleHamburger}
              />
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
        <StyledDivider toUseNarrow={toUseNarrow} />
        <ChannelContainer>
          <CSSTransition
            in={!toUseNarrow}
            classNames="channel-effect"
            timeout={{ appear: 0, enter: 350, exit: 200 }}
            unmountOnExit
          >
            <Channel onClickHambuger={toggleHamburger} />
          </CSSTransition>
        </ChannelContainer>
      </HeaderContainer>
      <div ref={ref}>
        <StyledHamburgerMenu
          actions={hbActions}
          handleClose={closeHamburger}
          showHamburger={showHamburger}
        />
      </div>
    </React.Fragment>
  )
}
Header.propTypes = {
  pathname: PropTypes.string,
  actions: PropTypes.array,
  hbActions: PropTypes.array,
}

export default Header
