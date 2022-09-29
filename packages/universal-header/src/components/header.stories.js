/* eslint-disable react/prop-types */
import React from 'react'
import Header from './header'
import HeaderContext from '../contexts/header-context'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

const themeOption = ['normal', 'transparent', 'photography', 'index']
export default {
  title: 'Header/Desktop',
  component: Header,
  argTypes: {
    toUseNarrow: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
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

const defaultActions = [{ key: 'newsLetter' }, { key: 'support' }]
export const header = props => {
  const { theme, releaseBranch, toUseNarrow } = props
  const context = {
    theme,
    releaseBranch,
    toUseNarrow,
    isLinkExternal: true,
  }
  return (
    <HeaderContext.Provider value={context}>
      <Header actions={defaultActions} />
    </HeaderContext.Provider>
  )
}
header.parameters = { controls: { exclude: ['pathname', 'actions'] } }
