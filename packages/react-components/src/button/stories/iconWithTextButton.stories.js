import React from 'react'
import IconWithTextButton from '../components/iconWithTextButton'
import { Share } from '../../icon'

export default {
  title: 'Button/Icon With Text Button',
  component: IconWithTextButton,
}

const Template = args => <IconWithTextButton {...args} />

export const iconWithTextButton = Template.bind({})
iconWithTextButton.args = {
  text: '文字',
  theme: 'normal',
  disabled: false,
  active: false,
}

export const shareButton = Template.bind({})
shareButton.args = {
  text: '分享',
  iconComponent: <Share />,
  theme: 'normal',
  disabled: false,
  active: false,
}
