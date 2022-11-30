import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
// context
import HeaderContext, { HamburgerContext } from '../contexts/header-context'
// utils
import {
  getLogoLink,
  getChannelLinks,
  getCategoryLink,
  getSearchLink,
} from '../utils/links'
import { selectLogoType, selectHamburgerMenuTheme } from '../utils/theme'
// constants
import {
  CHANNEL_KEY,
  CHANNEL_ORDER,
  CHANNEL_TYPE,
  CHANNEL_LABEL,
  CHANNEL_LINK_TYPE,
  CHANNEL_DROPDOWN,
} from '../constants/channels'
import { MENU_WIDTH } from '../constants/hamburger-menu'
// components
import {
  DesktopHamburgerAction,
  MobileHamburgerAction,
  MobileHeaderAction,
} from './action-button'
import Footer from './hamburger-footer'
import {
  MenuLinkItem,
  MenuSubItem,
  MenuDropdownItem,
} from './hamburger-menu-item'
import { MobileIcons } from './icons'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import Link from '@twreporter/react-components/lib/customized-link'
import Divider from '@twreporter/react-components/lib/divider'
import { IconButton } from '@twreporter/react-components/lib/button'
import { Cross } from '@twreporter/react-components/lib/icon'
import { LogoSymbol, LogoHeader } from '@twreporter/react-components/lib/logo'
import { SearchBar } from '@twreporter/react-components/lib/input'
import {
  SUBCATEGORY_LABEL,
  CATEGORY_ORDER,
  CATEGORY_LABEL,
  CATEGORY_PATH,
} from '@twreporter/core/lib/constants/category-set'
import { THEME } from '@twreporter/core/lib/constants/theme'
import {
  TabletAndAbove,
  MobileOnly,
} from '@twreporter/react-components/lib/rwd'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const MenuContainer = styled.div`
  width: ${MENU_WIDTH.desktop};
  max-height: 100vh;
  overflow-y: scroll;
  overscroll-behavior: none;
  background-color: ${props => props.bgColor};
  ${mq.tabletOnly`
    width: ${MENU_WIDTH.tablet};
  `}
  ${mq.mobileOnly`
    max-height: calc(100vh - 51px);
    width: ${MENU_WIDTH.mobile};
  `}

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.scrollBarColor};
    border-radius: 2px;
  }
`
const CloseSection = styled.div`
  display: flex;
  padding: 24px 32px 16px 0;
  justify-content: end;
  align-items: center;
  ${mq.mobileOnly`
    display: none;
  `}
`
const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  a {
    display: flex;
  }
  img {
    height: 24px;
    width: 24px;
  }
  ${mq.mobileOnly`
    display: none;
  `}
`
const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px 0 32px;
  ${mq.mobileOnly`
    padding: 24px 32px;
  `}
  ${mq.desktopAndAbove`
    display: none;
  `}
`
const ContentSection = styled.div`
  padding-top: 16px;
`
const ActionSection = styled.div`
  padding: 40px 32px 32px 32px;
`
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
`
const FlexGroup = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 21px;
  }
`
const DropdownItemContainer = styled.div``
const SubContainer = styled.div`
  max-height: ${props => (props.isActive ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 300ms ease-in-out;
`
const DividerContainer = styled.div`
  margin: 16px 32px;
`
const IconContainer = styled.div`
  margin-left: 24px;
`
const StyledMobileHamburgerAction = styled(MobileHamburgerAction)`
  width: 100%;
`

const DropdownContent = ({ itemKey, isActive, toggleFunc }) => {
  const { releaseBranch, isLinkExternal } = useContext(HeaderContext)
  const { closeHamburgerMenu } = useContext(HamburgerContext)
  let subItemJSX
  if (itemKey === CHANNEL_KEY.category) {
    // category
    subItemJSX = _.map(CATEGORY_ORDER, catKey => {
      const label = CATEGORY_LABEL[catKey]
      const path = `/categories/${catKey}`
      const link = getCategoryLink(isLinkExternal, releaseBranch, path)
      if (!label || !link) {
        return
      }
      return <MenuSubItem text={label} link={link} key={catKey} />
    })
  } else {
    // subcategory
    subItemJSX = _.map(CHANNEL_DROPDOWN[itemKey], (subItem, key) => {
      const { type } = subItem
      let label, path
      if (type === 'subcategory') {
        label = SUBCATEGORY_LABEL[subItem.key]
        path = `/categories/${CATEGORY_PATH[itemKey]}`
        if (subItem.key !== 'all') {
          path += `/${subItem.key}`
        }
      }
      if (type === 'path') {
        label = subItem.label
        path = subItem.path
      }

      const link = getCategoryLink(isLinkExternal, releaseBranch, path)
      if (!label || !link) {
        return
      }
      const componentKey = `${itemKey}-${key}`
      return <MenuSubItem text={label} link={link} key={componentKey} />
    })
  }
  const label = CHANNEL_LABEL[itemKey]
  const handleClick = () => toggleFunc(itemKey)
  const dropdownKey = `${itemKey}-dropdown`

  return (
    <DropdownItemContainer key={itemKey}>
      <MenuDropdownItem
        text={label}
        isActive={isActive}
        onClick={handleClick}
        key={dropdownKey}
      />
      <SubContainer isActive={isActive} onClick={closeHamburgerMenu}>
        {subItemJSX}
      </SubContainer>
    </DropdownItemContainer>
  )
}
DropdownContent.propTypes = {
  itemKey: PropTypes.string,
  isActive: PropTypes.bool,
  toggleFunc: PropTypes.func,
}

const Content = () => {
  const { releaseBranch, isLinkExternal } = useContext(HeaderContext)
  const { closeHamburgerMenu } = useContext(HamburgerContext)
  const [activeKey, setActiveKey] = useState('')
  const itemLinks = getChannelLinks(isLinkExternal, releaseBranch)
  const itemJSX = _.map(CHANNEL_ORDER, (itemKey, index) => {
    // divider
    if (itemKey === 'divider') {
      return (
        <DividerContainer key={index}>
          <Divider />
        </DividerContainer>
      )
    }

    const label = CHANNEL_LABEL[itemKey]
    const type = CHANNEL_TYPE[itemKey]
    // link type
    if (type === CHANNEL_LINK_TYPE) {
      const link = itemLinks && itemLinks[itemKey]
      if (!label || !link) {
        return
      }
      return (
        <MenuLinkItem
          text={label}
          link={link}
          key={itemKey}
          onClick={closeHamburgerMenu}
        />
      )
    }

    // dropdown type
    const isActive = activeKey === itemKey
    const toggleFunc = key => {
      const nextActiveKey = activeKey === key ? '' : key
      setActiveKey(nextActiveKey)
    }
    return (
      <DropdownContent
        itemKey={itemKey}
        isActive={isActive}
        toggleFunc={toggleFunc}
      />
    )
  })

  return <ContentSection>{itemJSX}</ContentSection>
}

const HamburgerMenu = ({ ...props }) => {
  const { theme, releaseBranch, isLinkExternal } = useContext(HeaderContext)
  const { closeHamburgerMenu } = useContext(HamburgerContext)
  const menuTheme = theme === THEME.photography ? theme : THEME.noraml
  const { bgColor, scrollBarColor } = selectHamburgerMenuTheme(menuTheme)
  const logoType = selectLogoType(menuTheme)
  const CloseIcon = <Cross releaseBranch={releaseBranch} />
  const logoLink = getLogoLink(isLinkExternal, releaseBranch)
  const onSearch = keywords => {
    if (!window) {
      return
    }
    window.location = `${
      getSearchLink(isLinkExternal, releaseBranch).to
    }?q=${keywords}`
  }

  return (
    <MenuContainer bgColor={bgColor} scrollBarColor={scrollBarColor} {...props}>
      <TabletAndAbove>
        <CloseSection>
          <IconButton
            iconComponent={CloseIcon}
            theme={menuTheme}
            onClick={closeHamburgerMenu}
          />
        </CloseSection>
        <LogoSection>
          <Link {...logoLink} onClick={closeHamburgerMenu}>
            <LogoSymbol type={logoType} releaseBranch={releaseBranch} />
          </Link>
        </LogoSection>
      </TabletAndAbove>
      <MobileOnly>
        <HeaderSection>
          <FlexGroup>
            <Link {...logoLink} onClick={closeHamburgerMenu}>
              <LogoHeader type={logoType} releaseBranch={releaseBranch} />
            </Link>
          </FlexGroup>
          <FlexGroup>
            <MobileHeaderAction />
            <IconContainer>
              <MobileIcons />
            </IconContainer>
          </FlexGroup>
        </HeaderSection>
      </MobileOnly>
      <SearchSection>
        <SearchBar onSearch={onSearch} autofocus={false} widthType="stretch" />
      </SearchSection>
      <Content />
      <Footer />
      <ActionSection>
        <TabletAndAbove>
          <DesktopHamburgerAction />
        </TabletAndAbove>
        <MobileOnly>
          <StyledMobileHamburgerAction />
        </MobileOnly>
      </ActionSection>
    </MenuContainer>
  )
}

export default HamburgerMenu
