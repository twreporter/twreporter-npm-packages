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

export const iconButton = {
  args: {
    iconComponent: <Arrow direction="down" />,
    theme: IconButton.THEME.normal,
    type: IconButton.Type.PRIMARY,
    disabled: false,
    active: false,
  },
}

export const shareButton = {
  args: {
    iconComponent: <Share />,
    theme: IconButton.THEME.normal,
    type: IconButton.Type.PRIMARY,
    disabled: false,
    active: false,
  },
}
