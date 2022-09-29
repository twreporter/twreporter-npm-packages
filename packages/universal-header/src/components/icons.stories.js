/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import Icons from './icons'
import HeaderContext from '../contexts/header-context'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

const themeOption = ['normal', 'transparent', 'photography', 'index']
export default {
  title: 'Icons/Desktop',
  component: Icons,
  argTypes: {
    isAuthed: {
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
