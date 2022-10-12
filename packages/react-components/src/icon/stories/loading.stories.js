import React from 'react'
import { Loading } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Icon/Loading',
  component: Loading,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const loading = args => <Loading {...args} />
