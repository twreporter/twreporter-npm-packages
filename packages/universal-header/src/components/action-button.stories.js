/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import ActionButton from './action-button'
import HeaderContext from '../contexts/header-context'

const themeOption = ['normal', 'transparent', 'photography', 'index']
export default {
  title: 'Action Button',
  component: ActionButton,
  argTypes: {
    theme: {
      defaultValue: 'normal',
      options: themeOption,
      control: { type: 'radio' },
    },
    direction: {
      defaultValue: 'row',
      options: ['row', 'column'],
      control: { type: 'radio' },
    },
  },
}

const Container = styled.div`
  max-width: 500px;
  width: 100%;
`

const defaultActions = [{ key: 'newsLetter' }, { key: 'support' }]
export const actionButton = props => {
  const { theme } = props
  const context = {
    theme,
  }
  return (
    <HeaderContext.Provider value={context}>
      <Container>
        <ActionButton {...props} />
      </Container>
    </HeaderContext.Provider>
  )
}
actionButton.args = {
  actions: defaultActions,
}

export const photographyTheme = props => (
  <HeaderContext.Provider value={{ theme: 'photography' }}>
    <Container>
      <ActionButton {...props} />
    </Container>
  </HeaderContext.Provider>
)
photographyTheme.args = {
  actions: defaultActions,
}
photographyTheme.parameters = {
  backgrounds: { default: 'photography' },
  controls: { exclude: ['actions', 'callback', 'theme'] },
}

export const transparentTheme = props => (
  <HeaderContext.Provider value={{ theme: 'transparent' }}>
    <Container>
      <ActionButton {...props} />
    </Container>
  </HeaderContext.Provider>
)
transparentTheme.args = {
  actions: defaultActions,
}
transparentTheme.parameters = {
  backgrounds: { default: 'transparent' },
  controls: { exclude: ['actions', 'callback', 'theme'] },
}

export const hamburger = props => (
  <HeaderContext.Provider value={{ theme: 'normal' }}>
    <Container>
      <ActionButton {...props} />
    </Container>
  </HeaderContext.Provider>
)
hamburger.args = {
  actions: defaultActions,
  direction: 'column',
}
hamburger.parameters = {
  backgrounds: { default: 'white' },
  controls: { exclude: ['actions', 'callback', 'theme'] },
}
