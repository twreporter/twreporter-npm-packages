/* eslint-disable react/prop-types */
import React from 'react'
import Header from './header'
import HeaderContext from '../contexts/header-context'
import { THEME_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/theme'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Header/Desktop',
  component: Header,
  argTypes: {
    toUseNarrow: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
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
