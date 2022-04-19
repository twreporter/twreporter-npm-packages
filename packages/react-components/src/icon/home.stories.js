import React from 'react'
import { Home } from './index'

export default {
  title: 'Icon/Home',
  component: Home,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const home = (args) => <Home {...args} />
