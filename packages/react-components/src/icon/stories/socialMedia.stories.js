import React from 'react'
import { SocialMedia } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Icon/Social Media',
  component: SocialMedia,
  argTypes: {
    mediaType: {
      control: { type: 'radio' },
    },
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const socialMedia = args => <SocialMedia {...args} />
