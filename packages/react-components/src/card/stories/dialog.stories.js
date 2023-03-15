import React from 'react'
import styled from 'styled-components'
import Dialog from '../components/dialog'
import { SIZE, SIZE_STORYBOOK_ARG_TYPE } from '../constants/size'

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

export const dialog = args => <StyledDialog {...args} />
dialog.args = {
  text: '登出',
  size: SIZE.S,
}
dialog.parameters = {
  backgrounds: { default: 'normal' },
}
