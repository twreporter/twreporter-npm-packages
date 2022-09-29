/* eslint-disable react/prop-types */
import React from 'react'
import Channel from './channels'
import HeaderContext from '../contexts/header-context'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

const themeOption = ['normal', 'transparent', 'photography', 'index']
export default {
  title: 'Channel',
  component: Channel,
  argTypes: {
    theme: {
      defaultValue: 'normal',
      options: themeOption,
      control: { type: 'radio' },
    },
    releaseBranch: {
      defaultValue: master,
      options: [master, staging, preview, release],
      control: { type: 'radio' },
    },
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
