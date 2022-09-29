/* eslint-disable react/prop-types */
import React from 'react'
import Slogan from './slogan'
import HeaderContext from '../contexts/header-context'

const themeOption = ['normal', 'transparent', 'photography', 'index']
export default {
  title: 'Slogan',
  component: Slogan,
  argTypes: {
    theme: {
      defaultValue: 'normal',
      options: themeOption,
      control: { type: 'radio' },
    },
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
