import React from 'react'
import TextButton from '../components/textButton'
import { Arrow } from '../../icon'
import { SIZE, SIZE_STORYBOOK_ARG_TYPE } from '../constants/size'
import { TYPE, TYPE_STORYBOOK_ARG_TYPE } from '../constants/type'
import { TEXT_BUTTON_THEME } from '../constants'

export default {
  title: 'Button/Text Button',
  component: TextButton,
  argTypes: {
    theme: {
      defaultValue: TEXT_BUTTON_THEME.normal,
      options: Object.values(TEXT_BUTTON_THEME),
      control: { type: 'radio' },
    },
    type: TYPE_STORYBOOK_ARG_TYPE,
    size: SIZE_STORYBOOK_ARG_TYPE,
  },
}

const Template = args => <TextButton {...args} />

export const textButton = Template.bind({})
textButton.args = {
  text: '文字',
  size: SIZE.S,
  theme: TEXT_BUTTON_THEME.normal,
  type: TYPE.primary,
  active: false,
  disabled: false,
}

export const withArrowIcon = Template.bind({})
withArrowIcon.args = {
  leftIconComponent: <Arrow direction="left" />,
  rightIconComponent: <Arrow direction="right" />,
  text: '文字',
  size: SIZE.S,
  theme: TEXT_BUTTON_THEME.normal,
  type: TYPE.primary,
  active: false,
  disabled: false,
}
