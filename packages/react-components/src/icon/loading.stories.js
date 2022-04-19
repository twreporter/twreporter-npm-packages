import React from 'react'
import { Loading } from './index'

export default {
  title: 'Icon/Loading',
  component: Loading,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const loading = (args) => <Loading {...args} />
