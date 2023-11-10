/* eslint-disable react/prop-types */
/* eslint react/display-name:0 */
import React from 'react'
import Channel from './channels'
import HeaderContext from '../contexts/header-context'
import {
  THEME_STORYBOOK_ARG_TYPE,
  BRANCH_STORYBOOK_ARG_TYPE,
} from '../storybook/constants'

export default {
  title: 'Channel',
  component: Channel,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const channel = {
  render: props => {
    const { theme, releaseBranch } = props
    const context = {
      theme,
      releaseBranch,
      isLinkExternal: true,
    }
    return (
      <HeaderContext.Provider value={context}>
        <Channel />
      </HeaderContext.Provider>
    )
  },
}
