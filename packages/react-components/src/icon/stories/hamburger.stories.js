import React from 'react'
import { Hamburger } from '../index'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

export default {
  title: 'Icon/Hamburger',
  component: Hamburger,
  argTypes: {
    releaseBranch: {
      defaultValue: master,
      options: [master, staging, preview, release],
      control: { type: 'radio' },
    },
  },
}

export const hamburger = args => <Hamburger {...args} />
