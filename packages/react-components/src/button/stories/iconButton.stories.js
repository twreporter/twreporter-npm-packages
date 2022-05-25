import React from 'react'
import IconButton from '../components/iconButton'
import { Share } from '../../icon'

export default {
  title: 'Button/Icon Button',
  component: IconButton,
}

const Template = args => <IconButton {...args} />

export const iconButton = Template.bind({})
iconButton.args = {
  theme: 'normal',
  type: 'primary',
  disabled: false,
  active: false,
}

export const shareButton = Template.bind({})
shareButton.args = {
  iconComponent: <Share />,
  theme: 'normal',
  type: 'primary',
  disabled: false,
  active: false,
}
