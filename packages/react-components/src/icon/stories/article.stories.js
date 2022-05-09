import React from 'react'
import { Article } from '../index'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

export default {
  title: 'Icon/Article',
  component: Article,
  argTypes: {
    releaseBranch: {
      defaultValue: master,
      options: [master, staging, preview, release],
      control: { type: 'radio' },
    },
  },
}

export const article = args => <Article {...args} />
