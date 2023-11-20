/* eslint react/display-name:0 */
import React from 'react'
import styled from 'styled-components'
import Dialog from '../components/dialog'
import { SIZE_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Card/Dialog',
  component: Dialog,
  argTypes: {
    size: SIZE_STORYBOOK_ARG_TYPE,
  },
}

const StyledDialog = styled(Dialog)`
  width: fit-content;
`

export const dialog = {
  render: args => <StyledDialog {...args} />,

  args: {
    text: '登出',
    size: Dialog.Size.S,
  },

  parameters: {
    backgrounds: { default: 'normal' },
  },
}
