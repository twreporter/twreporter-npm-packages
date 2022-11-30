import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../index'
import {
  BRANCH_PROP_TYPES,
  BRANCH_STORYBOOK_ARG_TYPE,
} from '@twreporter/core/lib/constants/release-branch'

const SocialMedia = ({ mediaType, releaseBranch }) => (
  <Icon filename={mediaType} releaseBranch={releaseBranch} />
)
SocialMedia.propTypes = {
  mediaType: PropTypes.oneOf([
    'facebook',
    'instagram',
    'medium',
    'twitter',
    'youtube',
    'line',
  ]),
  releaseBranch: BRANCH_PROP_TYPES,
}

export default {
  title: 'Icon/Social Media',
  component: SocialMedia,
  argTypes: {
    mediaType: {
      defaultValue: 'facebook',
      options: [
        'facebook',
        'instagram',
        'medium',
        'twitter',
        'youtube',
        'line',
      ],
      control: { type: 'radio' },
    },
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const socialMedia = args => <SocialMedia {...args} />
