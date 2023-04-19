/* eslint-disable react/prop-types */
import React from 'react'
import Header from './header'
import HeaderContext from '../contexts/header-context'
import {
  THEME_STORYBOOK_ARG_TYPE,
  BRANCH_STORYBOOK_ARG_TYPE,
} from '../storybook/constants'

export default {
  title: 'Header/Universal',
  component: Header,
  argTypes: {
    toUseNarrow: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    hideHeader: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    isAuthed: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const universal = props => {
  const { theme, releaseBranch, toUseNarrow, hideHeader, isAuthed } = props
  const context = {
    theme,
    releaseBranch,
    toUseNarrow,
    hideHeader,
    isAuthed,
    isLinkExternal: true,
  }
  return (
    <HeaderContext.Provider value={context}>
      <Header />
    </HeaderContext.Provider>
  )
}
universal.parameters = {
  controls: { exclude: ['pathname'] },
}
