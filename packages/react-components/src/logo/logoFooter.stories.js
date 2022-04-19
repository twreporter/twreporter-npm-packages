import React from 'react'
import LogoFooter from './components/logo-footer'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Logo/Footer',
  component: LogoFooter,
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

export const footer = (args) => <LogoFooter {...args} />
