import React from 'react'
import { Share } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Icon/Share',
  component: Share,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const share = args => <Share {...args} />
