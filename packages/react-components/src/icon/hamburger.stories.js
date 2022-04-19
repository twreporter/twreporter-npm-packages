import React from 'react'
import { Hamburger } from './index'

export default {
  title: 'Icon/Hamburger',
  component: Hamburger,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const hamburger = (args) => <Hamburger {...args} />
