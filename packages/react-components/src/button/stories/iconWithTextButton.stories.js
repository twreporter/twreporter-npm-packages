import React from 'react'
import IconWithTextButton from '../components/iconWithTextButton'
import { Share, Arrow } from '../../icon'
import { THEME_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Button/Icon With Text Button',
  component: IconWithTextButton,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
  },
}

const Template = args => <IconWithTextButton {...args} />

export const iconWithTextButton = Template.bind({})
iconWithTextButton.args = {
  text: '文字',
  iconComponent: <Arrow direction="down" />,
  theme: IconWithTextButton.THEME.normal,
  disabled: false,
  active: false,
  hideText: false,
}

export const shareButton = Template.bind({})
shareButton.args = {
  text: '分享',
  iconComponent: <Share />,
  theme: IconWithTextButton.THEME.normal,
  disabled: false,
  active: false,
  hideText: false,
}
