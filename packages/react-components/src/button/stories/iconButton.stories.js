import React from 'react'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import IconButton from '../components/iconButton'
import { Share, Arrow } from '../../icon'
import { Type } from '../enums'
import { THEME_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Button/Icon Button',
  component: IconButton,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    type: getRadioArg(Type, Type.PRIMARY),
  },
}

const Template = args => <IconButton {...args} />

export const iconButton = Template.bind({})
iconButton.args = {
  iconComponent: <Arrow direction="down" />,
  theme: IconButton.theme.normal,
  type: IconButton.type.PRIMARY,
  disabled: false,
  active: false,
}

export const shareButton = Template.bind({})
shareButton.args = {
  iconComponent: <Share />,
  theme: IconButton.theme.normal,
  type: IconButton.type.PRIMARY,
  disabled: false,
  active: false,
}
