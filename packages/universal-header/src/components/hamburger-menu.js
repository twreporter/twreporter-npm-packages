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
import ActionButton from './action-button'
import Footer from './hamburger-footer'
import {
  MenuLinkItem,
  MenuSubItem,
  MenuDropdownItem,
} from './hamburger-menu-item'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import Link from '@twreporter/react-components/lib/customized-link'
import Divider from '@twreporter/react-components/lib/divider'
import Modal from '@twreporter/react-components/lib/mobile-pop-up-modal'
import { IconButton } from '@twreporter/react-components/lib/button'
import { Cross } from '@twreporter/react-components/lib/icon'
import { LogoSymbol } from '@twreporter/react-components/lib/logo'
import { SearchBar } from '@twreporter/react-components/lib/input'
import {
  SUBCATEGORY_LABEL,
  CATEGORY_ORDER,
  CATEGORY_LABEL,
  CATEGORY_PATH,
} from '@twreporter/core/lib/constants/category-set'
import { THEME } from '@twreporter/core/lib/constants/theme'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const StyledModal = styled(Modal)`
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.bgColor};
  overflow-y: unset;
`
const MenuContainer = styled.div`
  max-width: ${MENU_WIDTH.desktop};
  max-height: 100vh;
  overflow-y: scroll;
  overscroll-behavior: none;
  background-color: ${props => props.bgColor};
  ${mq.tabletOnly`
    max-width: ${MENU_WIDTH.tablet};
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
const DropdownItemContainer = styled.div``
const SubContainer = styled.div`
  max-height: ${props => (props.isActive ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 300ms ease-in-out;
`
const DividerContainer = styled.div`
  margin: 16px 32px;
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
          path += `/{subItem.key}`
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

const HamburgerMenu = ({ actions, handleClose, ...props }) => {
  const { theme, releaseBranch, isLinkExternal } = useContext(HeaderContext)
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
  const modalHeight = '100vh'
  const modalWidth = MENU_WIDTH.desktop
  const contextValue = { closeHamburgerMenu: handleClose }

  return (
    <HamburgerContext.Provider value={contextValue}>
      <StyledModal
        modalHeight={modalHeight}
        modalWidth={modalWidth}
        bgColor={bgColor}
      >
        <MenuContainer
          bgColor={bgColor}
          scrollBarColor={scrollBarColor}
          {...props}
        >
          <CloseSection>
            <IconButton
              iconComponent={CloseIcon}
              theme={menuTheme}
              onClick={handleClose}
            />
          </CloseSection>
          <LogoSection>
            <Link {...logoLink}>
              <LogoSymbol type={logoType} />
            </Link>
          </LogoSection>
          <SearchSection>
            <SearchBar onSearch={onSearch} />
          </SearchSection>
          <Content />
          <Footer />
          <ActionSection>
            <ActionButton actions={actions} direction="column" />
          </ActionSection>
        </MenuContainer>
      </StyledModal>
    </HamburgerContext.Provider>
  )
}
HamburgerMenu.propTypes = {
  actions: PropTypes.array,
  handleClose: PropTypes.func,
}

export default HamburgerMenu
