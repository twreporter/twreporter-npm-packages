import React from 'react'
import { Text } from './index'

export default {
  title: 'Icon/Text',
  component: Text,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const text = (args) => <Text {...args} />
