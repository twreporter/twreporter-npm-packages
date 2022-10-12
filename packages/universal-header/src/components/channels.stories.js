/* eslint-disable react/prop-types */
import React from 'react'
import Channel from './channels'
import HeaderContext from '../contexts/header-context'
import { THEME_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/theme'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Channel',
  component: Channel,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const channel = props => {
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
}
