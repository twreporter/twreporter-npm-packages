/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import Icons from './icons'
import HeaderContext from '../contexts/header-context'
import {
  THEME_STORYBOOK_ARG_TYPE,
  BRANCH_STORYBOOK_ARG_TYPE,
} from '../storybook/constants'

export default {
  title: 'Icons/Desktop',
  component: Icons,
  argTypes: {
    isAuthed: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

const Container = styled.div`
  transform: translateX(300px);
`

export const desktop = props => {
  const { isAuthed, theme, releaseBranch } = props
  const context = {
    isAuthed,
    theme,
    releaseBranch,
    isLinkExternal: true,
  }
  return (
    <HeaderContext.Provider value={context}>
      <Container>
        <Icons />
      </Container>
    </HeaderContext.Provider>
  )
}
