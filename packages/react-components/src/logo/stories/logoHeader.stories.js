import React from 'react'
import LogoHeader from '../components/logo-header'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Logo/Header',
  component: LogoHeader,
  argTypes: {
    releaseBranch: {
      defaultValue: releaseBranchConsts.master,
      options: [
        releaseBranchConsts.master,
        releaseBranchConsts.staging,
        releaseBranchConsts.preview,
        releaseBranchConsts.release,
      ],
      control: { type: 'radio' },
    },
  },
}

export const header = args => <LogoHeader {...args} />
header.args = { type: 'default' }
