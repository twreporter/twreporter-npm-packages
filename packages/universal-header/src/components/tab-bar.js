import React, { useContext } from 'react'
import styled from 'styled-components'
// context
import HeaderContext, { HamburgerContext } from '../contexts/header-context'
// utils
import { getTabBarLinks } from '../utils/links'
import { selectTabBarTheme } from '../utils/theme'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import {
  Home,
  Clock,
  Bookmark,
  Hamburger,
} from '@twreporter/react-components/lib/icon'
import { IconWithTextButton } from '@twreporter/react-components/lib/button'

const TabBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 16px;
  border-top: 1px solid ${props => props.borderColor};
  background-color: ${props => props.bgColor};
  padding-bottom: env(safe-area-inset-bottom, 0);
  a {
    text-decoration: none;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 8px;
  flex: 1;
  &:last-child {
    margin-right: 0;
  }
  a {
    text-decoration: none;
  }
`

const TabBar = () => {
  const { theme, releaseBranch, isLinkExternal, pathname } = useContext(
    HeaderContext
  )
  const { toggleHamburger, isHamburgerMenuOpen } = useContext(HamburgerContext)
  const { home, latest, bookmark } = getTabBarLinks(
    isLinkExternal,
    releaseBranch
  )
  const HomeIcon = <Home releaseBranch={releaseBranch} />
  const ClockIcon = <Clock releaseBranch={releaseBranch} />
  const BookmarkIcon = <Bookmark releaseBranch={releaseBranch} />
  const HamburgerIcon = <Hamburger releaseBranch={releaseBranch} />
  const { bgColor, borderColor } = selectTabBarTheme(theme)
  const isHomeActive = !isHamburgerMenuOpen && pathname === '/'
  const isLatestActive = !isHamburgerMenuOpen && pathname === '/latest'
  const isBookmarkActive = !isHamburgerMenuOpen && pathname === '/bookmarks'
  const hamburgerIconText = isHamburgerMenuOpen ? '關閉選單' : '選單'

  return (
    <TabBarContainer bgColor={bgColor} borderColor={borderColor}>
      <ButtonContainer>
        <Link {...home}>
          <IconWithTextButton
            text="首頁"
            iconComponent={HomeIcon}
            theme={theme}
            active={isHomeActive}
          />
        </Link>
      </ButtonContainer>
      <ButtonContainer>
        <Link {...latest}>
          <IconWithTextButton
            text="最新"
            iconComponent={ClockIcon}
            theme={theme}
            active={isLatestActive}
          />
        </Link>
      </ButtonContainer>
      <ButtonContainer>
        <Link {...bookmark}>
          <IconWithTextButton
            text="我的書籤"
            iconComponent={BookmarkIcon}
            theme={theme}
            active={isBookmarkActive}
          />
        </Link>
      </ButtonContainer>
      <ButtonContainer onClick={toggleHamburger}>
        <IconWithTextButton
          text={hamburgerIconText}
          iconComponent={HamburgerIcon}
          theme={theme}
          active={isHamburgerMenuOpen}
        />
      </ButtonContainer>
    </TabBarContainer>
  )
}

export default TabBar
