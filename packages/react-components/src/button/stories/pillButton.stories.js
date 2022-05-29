import React from 'react'
import PillButton from '../components/pillButton'
import { Arrow } from '../../icon'

export default {
  title: 'Button/Pill Button',
  component: PillButton,
}

const Template = args => <PillButton {...args} />

export const pillButton = Template.bind({})
pillButton.args = {
  text: '文字',
  size: 'S',
  theme: 'normal',
  type: 'primary',
  disabled: false,
}

export const withArrowIcon = Template.bind({})
withArrowIcon.args = {
  iconComponent: <Arrow direction="right" />,
  text: '文字',
  size: 'S',
  theme: 'normal',
  type: 'primary',
  disabled: false,
}
