/* eslint-disable react/prop-types */
import React from 'react'
import Slogan from './slogan'
import HeaderContext from '../contexts/header-context'
import { THEME_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/theme'

export default {
  title: 'Slogan',
  component: Slogan,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
  },
}

export const slogan = props => {
  const { theme } = props
  const context = {
    theme,
  }
  return (
    <HeaderContext.Provider value={context}>
      <Slogan />
    </HeaderContext.Provider>
  )
}
