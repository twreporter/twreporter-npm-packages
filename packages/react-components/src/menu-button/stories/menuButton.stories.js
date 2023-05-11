import React from 'react'
import MenuButton from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'

export default {
  title: 'Menu Button',
  component: MenuButton,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
    fontWeight: getRadioArg(P1.Weight, P1.Weight.NORMAL),
  },
}

export const menuButton = args => <MenuButton {...args} />

menuButton.args = {
  text: '文字',
  link: {},
  color: colorGrayscale.gray800,
  hoverBgColor: colorGrayscale.gray100,
  activeBgColor: colorGrayscale.gray200,
}
