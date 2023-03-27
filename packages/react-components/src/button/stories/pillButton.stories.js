import React from 'react'
import PillButton from '../components/pillButton'
import { Cross } from '../../icon'
import { SIZE, SIZE_STORYBOOK_ARG_TYPE } from '../constants/size'
import { TYPE, TYPE_STORYBOOK_ARG_TYPE } from '../constants/type'
import { STYLE, STYLE_STORYBOOK_ARG_TYPE } from '../constants/style'
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
    style: STYLE_STORYBOOK_ARG_TYPE,
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

const Template = args => <PillButton {...args} />

export const pillButton = Template.bind({})
pillButton.args = {
  text: '文字',
  size: SIZE.S,
  theme: THEME.normal,
  style: STYLE.brand,
  type: TYPE.primary,
  disabled: false,
}
pillButton.parameters = { controls: { exclude: ['showLeft', 'showRight'] } }

export const toggleIconDisplay = args => {
  args.leftIconComponent = args.showLeft ? <Cross /> : null
  args.rightIconComponent = args.showRight ? <Cross /> : null

  return <PillButton {...args} />
}
toggleIconDisplay.args = {
  showLeft: true,
  showRight: true,
  text: '文字',
  size: SIZE.S,
  theme: THEME.normal,
  style: STYLE.brand,
  type: TYPE.primary,
  disabled: false,
}
toggleIconDisplay.parameters = {
  controls: { exclude: ['leftIconComponent', 'rightIconComponent'] },
}
