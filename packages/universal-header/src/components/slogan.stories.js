/* eslint-disable react/prop-types */
/* eslint react/display-name:0 */
import React from 'react'
import Slogan from './slogan'
import HeaderContext from '../contexts/header-context'
import { THEME_STORYBOOK_ARG_TYPE } from '../storybook/constants'

export default {
  title: 'Slogan',
  component: Slogan,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
  },
}

export const slogan = {
  render: props => {
    const { theme } = props
    const context = {
      theme,
    }
    return (
      <HeaderContext.Provider value={context}>
        <Slogan />
      </HeaderContext.Provider>
    )
  },
}
