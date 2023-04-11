import React from 'react'
import TextButton from '../components/textButton'
import { Arrow } from '../../icon'
import { TYPE, TYPE_STORYBOOK_ARG_TYPE } from '../constants/type'
import {
  SIZE,
  SIZE_STORYBOOK_ARG_TYPE,
} from '@twreporter/core/lib/constants/size'
import { TEXT_BUTTON_THEME } from '@twreporter/core/lib/constants/theme'

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

const Template = args => <TextButton {...args} />

export const textButton = Template.bind({})
textButton.args = {
  text: '文字',
  size: SIZE.S,
  theme: TEXT_BUTTON_THEME.normal,
  type: TYPE.primary,
  active: false,
  disabled: false,
  leftIconComponent: <Arrow direction="left" />,
  rightIconComponent: <Arrow direction="right" />,
}
textButton.parameters = { controls: { exclude: ['showLeft', 'showRight'] } }

export const toggleIconDisplay = args => {
  args.leftIconComponent = args.showLeft ? <Arrow direction="left" /> : null
  args.rightIconComponent = args.showRight ? <Arrow direction="right" /> : null

  return <TextButton {...args} />
}
toggleIconDisplay.args = {
  showLeft: true,
  showRight: true,
  text: '文字',
  size: SIZE.S,
  theme: TEXT_BUTTON_THEME.normal,
  type: TYPE.primary,
  active: false,
  disabled: false,
}
toggleIconDisplay.parameters = {
  controls: { exclude: ['leftIconComponent', 'rightIconComponent'] },
}
