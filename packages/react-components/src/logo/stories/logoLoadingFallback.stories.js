import React from 'react'
import LogoFallback from '../components/logo-loading-fallback'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Logo/Fallback',
  component: LogoFallback,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const fallback = args => <LogoFallback {...args} />
