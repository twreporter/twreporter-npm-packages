import React from 'react'
import { Clock } from './index'

export default {
  title: 'Icon/Clock',
  component: Clock,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const clock = (args) => <Clock {...args} />
