/* eslint-disable react/prop-types */
/* eslint react/display-name:0 */
import React from 'react'
import HamburgerMenu from './hamburger-menu'
import HeaderContext from '../contexts/header-context'
import {
  THEME_STORYBOOK_ARG_TYPE,
  BRANCH_STORYBOOK_ARG_TYPE,
} from '../storybook/constants'

export default {
  title: 'Hamburger/Menu',
  component: HamburgerMenu,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

const onClose = () => window?.alert('click close !')

export const menu = {
  render: props => {
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
  },

  args: {
    handleClose: onClose,
  },

  parameter: {
    controls: { exclude: ['handleClose'] },
  },
}
