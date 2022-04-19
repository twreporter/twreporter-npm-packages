import React from 'react'
import { Member } from './index'

export default {
  title: 'Icon/Member',
  component: Member,
  argTypes: {
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const member = (args) => <Member {...args} />
