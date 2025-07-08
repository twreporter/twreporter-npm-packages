import React from 'react'
import { EmptyStateV2 } from '../index'
import { Style } from '../enums'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'
import { PillButton } from '../../button'

export default {
  title: 'Empty State',
  component: EmptyStateV2,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
    style: getRadioArg(Style, Style.DEFAULT),
  },
}

export const emptyStateV2 = {
  args: {
    title: '文字',
    guide: '文字文字',
    maxWidth: '100vw',
    buttonComponents: [
      <PillButton text="按鈕" key={1} />,
      <PillButton text="按鈕" type={PillButton.Type.SECONDARY} key={2} />,
    ],
  },
}
