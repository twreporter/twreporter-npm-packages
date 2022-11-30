import React from 'react'
import PillButton from '../components/pillButton'
import { Arrow } from '../../icon'
import { SIZE, SIZE_STORYBOOK_ARG_TYPE } from '../constants/size'
import { TYPE, TYPE_STORYBOOK_ARG_TYPE } from '../constants/type'
import {
  THEME,
  THEME_STORYBOOK_ARG_TYPE,
} from '@twreporter/core/lib/constants/theme'

export default {
  title: 'Button/Pill Button',
  component: PillButton,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    type: TYPE_STORYBOOK_ARG_TYPE,
    size: SIZE_STORYBOOK_ARG_TYPE,
  },
}

const Template = args => <PillButton {...args} />

export const pillButton = Template.bind({})
pillButton.args = {
  text: '文字',
  size: SIZE.S,
  theme: THEME.normal,
  type: TYPE.primary,
  disabled: false,
}

export const withArrowIcon = Template.bind({})
withArrowIcon.args = {
  iconComponent: <Arrow direction="right" />,
  text: '文字',
  size: SIZE.S,
  theme: THEME.normal,
  type: TYPE.primary,
  disabled: false,
}
