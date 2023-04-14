import React from 'react'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import { SocialMedia } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Icon/Social Media',
  component: SocialMedia,
  argTypes: {
    type: getRadioArg(SocialMedia.type, SocialMedia.type.MASK),
    mediaType: getRadioArg(SocialMedia.mediaType, SocialMedia.mediaType.GOOGLE),
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const socialMedia = args => <SocialMedia {...args} />
