import React from 'react'
import { Topic } from './index'

export default {
  title: 'Icon/Topic',
  component: Topic,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const topic = (args) => <Topic {...args} />
