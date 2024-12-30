import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
// context
import HeaderContext, { HamburgerContext } from '../contexts/header-context'
// utils
import { getTabBarLinks, checkPathnameParent } from '../utils/links'
import { selectTabBarTheme } from '../utils/theme'
// constants
import themeConst from '../constants/theme'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import { IconWithTextButton } from '@twreporter/react-components/lib/button'
// material symbol
import Home from '@material-symbols/svg-400/outlined/home.svg'
import Clock from '@material-symbols/svg-400/outlined/schedule.svg'
import Topic from '@material-symbols/svg-400/outlined/import_contacts.svg'
import Star from '@material-symbols/svg-400/outlined/kid_star.svg'
import Menu from '@material-symbols/svg-400/outlined/menu.svg'

const TabBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.$bgColor};
  padding-bottom: calc(8px + env(safe-area-inset-bottom, 0));
  a {
    text-decoration: none;
  }
  a:visited,
  a:active {
    color: inherit;
    background-color: inherit;
  }

  svg {
    background-color: transparent;
    fill: currentColor;
    width: 24px;
    height: 24px;
  }
`
const buttonContainerCss = css`
  display: flex;
  justify-content: center;
  margin-right: 8px;
  flex: 1;
  &:last-child {
    margin-right: 0;
  }
`
const ButtonLinkContainer = styled(Link)`
  text-decoration: none;
  ${buttonContainerCss}
`
const ButtonContainer = styled.div`
  ${buttonContainerCss}
`

const TabBar = () => {
  const { theme, releaseBranch, isLinkExternal, pathname } =
    useContext(HeaderContext)
  const { closeHamburgerMenu, toggleHamburger, isHamburgerMenuOpen } =
    useContext(HamburgerContext)
  const iconTheme = theme === themeConst.photography ? theme : themeConst.normal
  const { home, latest, topic, myreading } = getTabBarLinks(
    isLinkExternal,
    releaseBranch
  )
  const HomeIcon = <Home />
  const ClockIcon = <Clock />
  const TopicIcon = <Topic />
  const MyReadingIcon = <Star />
  const HamburgerIcon = <Menu />
  const { bgColor, borderColor } = selectTabBarTheme(theme)
  const isHomeActive = !isHamburgerMenuOpen && pathname === '/'
  const isLatestActive =
    !isHamburgerMenuOpen && checkPathnameParent(pathname, 'latest')
  const isTopicActive = !isHamburgerMenuOpen && pathname === '/topics'
  const isMyReadingActive = !isHamburgerMenuOpen && pathname === '/myreading'
  const hamburgerIconText = isHamburgerMenuOpen ? '關閉選單' : '選單'

  return (
    <TabBarContainer $bgColor={bgColor} $borderColor={borderColor}>
      <ButtonLinkContainer {...home} onClick={closeHamburgerMenu}>
        <IconWithTextButton
          text="首頁"
          iconComponent={HomeIcon}
          theme={iconTheme}
          active={isHomeActive}
        />
      </ButtonLinkContainer>
      <ButtonLinkContainer {...latest} onClick={closeHamburgerMenu}>
        <IconWithTextButton
          text="最新"
          iconComponent={ClockIcon}
          theme={iconTheme}
          active={isLatestActive}
        />
      </ButtonLinkContainer>
      <ButtonLinkContainer {...topic} onClick={closeHamburgerMenu}>
        <IconWithTextButton
          text="深度專題"
          iconComponent={TopicIcon}
          theme={iconTheme}
          active={isTopicActive}
        />
      </ButtonLinkContainer>
      <ButtonLinkContainer {...myreading} onClick={closeHamburgerMenu}>
        <IconWithTextButton
          text="我的閱讀"
          iconComponent={MyReadingIcon}
          theme={iconTheme}
          active={isMyReadingActive}
        />
      </ButtonLinkContainer>
      <ButtonContainer onClick={toggleHamburger}>
        <IconWithTextButton
          text={hamburgerIconText}
          iconComponent={HamburgerIcon}
          theme={iconTheme}
          active={isHamburgerMenuOpen}
        />
      </ButtonContainer>
    </TabBarContainer>
  )
}

export default TabBar
