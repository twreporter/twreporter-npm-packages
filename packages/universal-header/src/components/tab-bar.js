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
import MaterialSymbol from '@twreporter/react-components/lib/material-icon'
import { IconWithTextButton } from '@twreporter/react-components/lib/button'

const TabBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  background-color: ${props => props.bgColor};
  padding-bottom: calc(8px + env(safe-area-inset-bottom, 0));
  a {
    text-decoration: none;
  }
  a:visited,
  a:active {
    color: inherit;
    background-color: inherit;
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
  const { theme, releaseBranch, isLinkExternal, pathname } = useContext(
    HeaderContext
  )
  const {
    closeHamburgerMenu,
    toggleHamburger,
    isHamburgerMenuOpen,
  } = useContext(HamburgerContext)
  const iconTheme = theme === themeConst.photography ? theme : themeConst.normal
  const { home, latest, bookmark } = getTabBarLinks(
    isLinkExternal,
    releaseBranch
  )
  const HomeIcon = (
    <MaterialSymbol icon="home" weight={400} grade={0} size={24} />
  )
  const ClockIcon = (
    <MaterialSymbol icon="schedule" weight={400} grade={0} size={24} />
  )
  const BookmarkIcon = (
    <MaterialSymbol icon="bookmark" weight={400} grade={0} size={24} />
  )
  const HamburgerIcon = (
    <MaterialSymbol icon="menu" weight={400} grade={0} size={24} />
  )
  const { bgColor, borderColor } = selectTabBarTheme(theme)
  const isHomeActive = !isHamburgerMenuOpen && pathname === '/'
  const isLatestActive =
    !isHamburgerMenuOpen && checkPathnameParent(pathname, 'latest')
  const isBookmarkActive = !isHamburgerMenuOpen && pathname === '/bookmarks'
  const hamburgerIconText = isHamburgerMenuOpen ? '關閉選單' : '選單'

  return (
    <TabBarContainer bgColor={bgColor} borderColor={borderColor}>
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
      <ButtonLinkContainer {...bookmark} onClick={closeHamburgerMenu}>
        <IconWithTextButton
          text="我的書籤"
          iconComponent={BookmarkIcon}
          theme={iconTheme}
          active={isBookmarkActive}
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
