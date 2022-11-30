import React from 'react'
import IconButton from '../components/iconButton'
import { Share, Arrow } from '../../icon'
import { TYPE, TYPE_STORYBOOK_ARG_TYPE } from '../constants/type'
import {
  THEME,
  THEME_STORYBOOK_ARG_TYPE,
} from '@twreporter/core/lib/constants/theme'

export default {
  title: 'Button/Icon Button',
  component: IconButton,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    type: TYPE_STORYBOOK_ARG_TYPE,
  },
}

const Template = args => <IconButton {...args} />

export const iconButton = Template.bind({})
iconButton.args = {
  iconComponent: <Arrow direction="down" />,
  theme: THEME.normal,
  type: TYPE.primary,
  disabled: false,
  active: false,
}

export const shareButton = Template.bind({})
shareButton.args = {
  iconComponent: <Share />,
  theme: THEME.normal,
  type: TYPE.primary,
  disabled: false,
  active: false,
}
