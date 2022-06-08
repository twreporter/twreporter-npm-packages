import React from 'react'
import IconWithTextButton from '../components/iconWithTextButton'
import { Share, Arrow } from '../../icon'

export default {
  title: 'Button/Icon With Text Button',
  component: IconWithTextButton,
}

const Template = args => <IconWithTextButton {...args} />

export const iconWithTextButton = Template.bind({})
iconWithTextButton.args = {
  text: '文字',
  iconComponent: <Arrow direction="down" />,
  theme: 'normal',
  disabled: false,
  active: false,
  hideText: false,
}

export const shareButton = Template.bind({})
shareButton.args = {
  text: '分享',
  iconComponent: <Share />,
  theme: 'normal',
  disabled: false,
  active: false,
  hideText: false,
}
