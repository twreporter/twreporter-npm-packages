/* eslint react/display-name:0 */
import React from 'react'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import PillButton from '../components/pillButton'
import { Cross } from '../../icon'
import { Type, Style } from '../enums'
import {
  THEME_STORYBOOK_ARG_TYPE,
  SIZE_STORYBOOK_ARG_TYPE,
} from '../../storybook/constants'

export default {
  title: 'Button/Pill Button',
  component: PillButton,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    type: getRadioArg(Type, Type.PRIMARY),
    size: SIZE_STORYBOOK_ARG_TYPE,
    style: getRadioArg(Style, Style.BRAND),
    // showLeft & showRight args are only for storybook check
    showLeft: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    showRight: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
}

export const pillButton = {
  args: {
    text: '文字',
    size: PillButton.Size.S,
    theme: PillButton.THEME.normal,
    style: PillButton.Style.BRAND,
    type: PillButton.Type.PRIMARY,
    disabled: false,
    loading: false,
  },

  parameters: { controls: { exclude: ['showLeft', 'showRight'] } },
}

export const toggleIconDisplay = {
  render: args => {
    args.leftIconComponent = args.showLeft ? <Cross /> : null
    args.rightIconComponent = args.showRight ? <Cross /> : null

    return <PillButton {...args} />
  },

  args: {
    showLeft: true,
    showRight: true,
    text: '文字',
    size: PillButton.Size.S,
    theme: PillButton.THEME.normal,
    style: PillButton.Style.BRAND,
    type: PillButton.Type.PRIMARY,
    disabled: false,
    loading: false,
  },

  parameters: {
    controls: { exclude: ['leftIconComponent', 'rightIconComponent'] },
  },
}
