import React from 'react'
import { Cross } from './index'

export default {
  title: 'Icon/Cross',
  component: Cross,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const cross = (args) => <Cross {...args} />
