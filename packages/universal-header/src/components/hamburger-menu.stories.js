/* eslint-disable react/prop-types */
import React from 'react'
import HamburgerMenu from './hamburger-menu'
import HeaderContext from '../contexts/header-context'
import { THEME_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/theme'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Hamburger/Menu',
  component: HamburgerMenu,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

const onClose = () => window?.alert('click close !')
export const menu = props => {
  const { theme, releaseBranch } = props
  const context = {
    theme,
    releaseBranch,
    isLinkExternal: true,
  }
  return (
    <HeaderContext.Provider value={context}>
      <HamburgerMenu {...props} />
    </HeaderContext.Provider>
  )
}
menu.args = {
  handleClose: onClose,
}
menu.parameter = {
  controls: { exclude: ['handleClose'] },
}
