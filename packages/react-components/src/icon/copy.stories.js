import React from 'react'
import { Copy } from './index'

export default {
  title: 'Icon/Copy',
  component: Copy,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const copy = (args) => <Copy {...args} />
