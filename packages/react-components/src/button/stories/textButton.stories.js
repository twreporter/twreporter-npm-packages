import React from 'react'
import TextButton from '../components/textButton'
import { Arrow } from '../../icon'

export default {
  title: 'Button/Text Button',
  component: TextButton,
}

const Template = args => <TextButton {...args} />

export const textButton = Template.bind({})
textButton.args = {
  text: '文字',
  size: 'S',
  theme: 'normal',
  type: 'primary',
  active: false,
  disabled: false,
}

export const withArrowIcon = Template.bind({})
withArrowIcon.args = {
  iconComponent: <Arrow direction="right" />,
  text: '文字',
  size: 'S',
  theme: 'normal',
  type: 'primary',
  active: false,
  disabled: false,
}
