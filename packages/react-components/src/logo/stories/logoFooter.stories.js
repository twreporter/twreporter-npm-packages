import React from 'react'
import LogoFooter from '../components/logo-footer'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Logo/Footer',
  component: LogoFooter,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const footer = args => <LogoFooter {...args} />
