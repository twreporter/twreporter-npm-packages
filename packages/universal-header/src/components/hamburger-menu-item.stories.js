/* eslint-disable react/prop-types */
/* eslint react/display-name:0 */
/* eslint react-hooks/rules-of-hooks:0 */
import React from 'react'
import styled from 'styled-components'
import { useArgs } from '@storybook/client-api'
import {
  MenuLinkItem,
  MenuSubItem,
  MenuDropdownItem,
} from './hamburger-menu-item'
import HeaderContext from '../contexts/header-context'
import {
  THEME_STORYBOOK_ARG_TYPE,
  BRANCH_STORYBOOK_ARG_TYPE,
} from '../storybook/constants'
import { THEME } from '@twreporter/core/lib/constants/theme'

export default {
  title: 'Hamburger/Item',
  component: MenuLinkItem,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

const Container = styled.div`
  width: 375px;
  background-color: ${props => props.bgColor};
  padding: 16px 0;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
`
const getBgColor = theme => {
  if (theme === THEME.photography) {
    return {
      bgColor:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #052142',
    }
  }
  return {
    bgColor: 'white',
  }
}

export const menuLinkItem = {
  render: props => {
    const { theme, releaseBranch } = props
    const context = {
      theme,
      releaseBranch,
      isLinkExternal: true,
    }
    const { bgColor } = getBgColor(theme)

    return (
      <HeaderContext.Provider value={context}>
        <Container bgColor={bgColor}>
          <MenuLinkItem {...props} />
        </Container>
      </HeaderContext.Provider>
    )
  },

  args: {
    text: '深度專題',
  },
}

export const MenuDropdownItemExample = {
  render: props => {
    const [{ isActive }, updateArgs] = useArgs()
    const { theme, releaseBranch, text } = props
    const context = {
      theme,
      releaseBranch,
      isLinkExternal: true,
    }
    const { bgColor } = getBgColor(theme)
    const handleClick = () => updateArgs({ isActive: !isActive })

    return (
      <HeaderContext.Provider value={context}>
        <Container bgColor={bgColor}>
          <MenuDropdownItem
            text={text}
            isActive={isActive}
            onClick={handleClick}
          />
        </Container>
      </HeaderContext.Provider>
    )
  },

  args: {
    text: '議題',
    isActive: false,
  },
}

export const menuSubItem = {
  render: props => {
    const { theme } = props
    const context = {
      theme,
      isLinkExternal: true,
    }
    const { bgColor } = getBgColor(theme)

    return (
      <HeaderContext.Provider value={context}>
        <Container bgColor={bgColor}>
          <MenuSubItem {...props} />
        </Container>
      </HeaderContext.Provider>
    )
  },

  args: {
    text: '小標題',
  },
}
