/* eslint react/display-name:0 */
import React from 'react'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import TextButton from '../components/textButton'
import { Arrow } from '../../icon'
import { Style } from '../enums'
import {
  THEME_STORYBOOK_ARG_TYPE,
  SIZE_STORYBOOK_ARG_TYPE,
} from '../../storybook/constants'

export default {
  title: 'Button/Text Button',
  component: TextButton,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    style: getRadioArg(Style, Style.DARK),
    size: SIZE_STORYBOOK_ARG_TYPE,
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

export const textButton = {
  args: {
    text: '文字',
    size: TextButton.Size.S,
    theme: TextButton.THEME.normal,
    style: TextButton.Style.DARK,
    active: false,
    disabled: false,
    loading: false,
    leftIconComponent: <Arrow direction="left" />,
    rightIconComponent: <Arrow direction="right" />,
  },

  parameters: { controls: { exclude: ['showLeft', 'showRight'] } },
}

export const toggleIconDisplay = {
  render: args => {
    args.leftIconComponent = args.showLeft ? <Arrow direction="left" /> : null
    args.rightIconComponent = args.showRight ? (
      <Arrow direction="right" />
    ) : null

    return <TextButton {...args} />
  },

  args: {
    showLeft: true,
    showRight: true,
    text: '文字',
    size: TextButton.Size.S,
    theme: TextButton.THEME.normal,
    style: TextButton.Style.DARK,
    active: false,
    disabled: false,
    loading: false,
  },

  parameters: {
    controls: { exclude: ['leftIconComponent', 'rightIconComponent'] },
  },
}
