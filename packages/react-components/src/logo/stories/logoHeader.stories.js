import React from 'react'
import LogoHeader from '../components/logo-header'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Logo/Header',
  component: LogoHeader,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const header = args => <LogoHeader {...args} />
header.args = { type: 'default' }
