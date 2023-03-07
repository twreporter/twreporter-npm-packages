import React from 'react'
import TextButton from '../components/textButton'
import { Arrow } from '../../icon'
import { Position } from '../constants'
import { SIZE, SIZE_STORYBOOK_ARG_TYPE } from '../constants/size'
import { TYPE, TYPE_STORYBOOK_ARG_TYPE } from '../constants/type'
import {
  THEME,
  THEME_STORYBOOK_ARG_TYPE,
} from '@twreporter/core/lib/constants/theme'

export default {
  title: 'Button/Text Button',
  component: TextButton,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    type: TYPE_STORYBOOK_ARG_TYPE,
    size: SIZE_STORYBOOK_ARG_TYPE,
    iconPosition: {
      defaultValue: Position.RIGHT,
      options: [Position.LEFT, Position.RIGHT],
      control: { type: 'radio' },
    },
  },
}

const Template = args => <TextButton {...args} />

export const textButton = Template.bind({})
textButton.args = {
  text: '文字',
  size: SIZE.S,
  theme: THEME.normal,
  type: TYPE.primary,
  active: false,
  disabled: false,
}

export const withArrowIcon = Template.bind({})
withArrowIcon.args = {
  iconComponent: <Arrow direction="right" />,
  iconPosition: Position.RIGHT,
  text: '文字',
  size: SIZE.S,
  theme: THEME.normal,
  type: TYPE.primary,
  active: false,
  disabled: false,
}
