import React from 'react'
import { Hamburger } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Icon/Hamburger',
  component: Hamburger,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const hamburger = args => <Hamburger {...args} />
