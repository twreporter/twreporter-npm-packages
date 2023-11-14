/* eslint-disable react/prop-types */
/* eslint react/display-name:0 */
import React from 'react'
import styled from 'styled-components'
import ActionButton from './action-button-item'
import HeaderContext from '../contexts/header-context'
import {
  DIRECTION_STORYBOOK_ARG_TYPE,
  TEXT_STORYBOOK_ARG_TYPE,
  BUTTON_WIDTH_STORYBOOK_ARG_TYPE,
  BUTTON_SIZE_STORYBOOK_ARG_TYPE,
  DIRECTION_TYPE,
  TEXT_TYPE,
  BUTTON_WIDTH_TYPE,
  BUTTON_SIZE_TYPE,
} from '../constants/action-item-types'
import { THEME_STORYBOOK_ARG_TYPE } from '../storybook/constants'
import { THEME } from '@twreporter/core/lib/constants/theme'

export default {
  title: 'Action Button',
  component: ActionButton,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    direction: DIRECTION_STORYBOOK_ARG_TYPE,
    textType: TEXT_STORYBOOK_ARG_TYPE,
    buttonWidth: BUTTON_WIDTH_STORYBOOK_ARG_TYPE,
    buttonSize: BUTTON_SIZE_STORYBOOK_ARG_TYPE,
  },
}

const Container = styled.div`
  max-width: 500px;
  width: 100%;
`

const defaultActions = [{ key: 'newsLetter' }, { key: 'support' }]

export const actionButton = {
  render: props => {
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
  },

  args: {
    actions: defaultActions,
  },
}

export const photographyTheme = {
  render: props => (
    <HeaderContext.Provider value={{ theme: THEME.photography }}>
      <Container>
        <ActionButton {...props} />
      </Container>
    </HeaderContext.Provider>
  ),

  args: {
    actions: defaultActions,
  },

  parameters: {
    backgrounds: { default: THEME.photography },
    controls: { exclude: ['actions', 'callback', 'theme'] },
  },
}

export const transparentTheme = {
  render: props => (
    <HeaderContext.Provider value={{ theme: THEME.transparent }}>
      <Container>
        <ActionButton {...props} />
      </Container>
    </HeaderContext.Provider>
  ),

  args: {
    actions: defaultActions,
  },

  parameters: {
    backgrounds: { default: THEME.transparent },
    controls: { exclude: ['actions', 'callback', 'theme'] },
  },
}

export const hamburger = {
  render: props => (
    <HeaderContext.Provider value={{ theme: props.theme }}>
      <Container>
        <ActionButton isForHambuger={true} {...props} />
      </Container>
    </HeaderContext.Provider>
  ),

  args: {
    actions: defaultActions,
    direction: DIRECTION_TYPE.column,
    textType: TEXT_TYPE.full,
    buttonWidth: BUTTON_WIDTH_TYPE.stretch,
    buttonSize: BUTTON_SIZE_TYPE.L,
  },

  parameters: {
    backgrounds: { default: 'white' },
    controls: {
      exclude: [
        'actions',
        'callback',
        'direction',
        'textType',
        'buttonWidth',
        'buttonSize',
      ],
    },
  },
}
