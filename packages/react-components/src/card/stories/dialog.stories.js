import React from 'react'
import styled from 'styled-components'
import Dialog from '../components/dialog'

export default {
  title: 'Card/Dialog',
  component: Dialog,
}

const StyledDialog = styled(Dialog)`
  width: fit-content;
`

export const dialog = args => <StyledDialog {...args} />
dialog.args = {
  text: '登出',
  size: 'S',
}
dialog.parameters = {
  backgrounds: { default: 'normal' },
}
