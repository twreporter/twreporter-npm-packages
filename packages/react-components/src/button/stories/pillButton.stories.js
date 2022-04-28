import React from 'react'
import PillButton from '../components/pillButton'

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
  withIcon: true,
  disabled: false,
}
