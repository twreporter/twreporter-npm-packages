import React from 'react'
import { Search } from './index'

export default {
  title: 'Icon/Search',
  component: Search,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const search = (args) => <Search {...args} />
