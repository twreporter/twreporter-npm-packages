import React from 'react'
import EmptyState from '../index'
import { Style } from '../enums'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

export default {
  title: 'Empty State/Empty State',
  component: EmptyState,
  argTypes: {
    releaseBranch: getRadioArg([master, staging, preview, release], master),
    style: getRadioArg(Style, Style.DEFAULT),
  },
}

export const emptyState = args => <EmptyState {...args} />

emptyState.args = {
  title: '文字',
  showGuide: true,
  guide: '文字文字',
  showButton: true,
  buttonText: '按鈕',
  buttonUrl: '/',
}
