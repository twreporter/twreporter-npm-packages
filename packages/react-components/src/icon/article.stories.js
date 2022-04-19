import React from 'react'
import { Article } from './index'

export default {
  title: 'Icon/Article',
  component: Article,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const article = (args) => <Article {...args} />
