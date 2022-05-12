import React from 'react'
import EmptyGuide from '../empty-guide'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

export default {
  title: 'Bookmark/Empty Guide',
  component: EmptyGuide,
  argTypes: {
    releaseBranch: {
      defaultValue: master,
      options: [master, staging, preview, release],
      control: { type: 'radio' },
    },
  },
}

export const emptyGuide = args => <EmptyGuide {...args} />
