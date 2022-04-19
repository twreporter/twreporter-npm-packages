import React from 'react'
import { Share } from './index'

export default {
  title: 'Icon/Share',
  component: Share,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const share = (args) => <Share {...args} />
