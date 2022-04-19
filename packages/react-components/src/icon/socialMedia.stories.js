import React from 'react'
import PropTypes from 'prop-types'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import { Icon } from './index'

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
  releaseBranch: predefinedPropTypes.releaseBranch,
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
    releaseBranch: {
      defaultValue: 'master',
      options: ['master', 'staging', 'preview', 'release'],
      control: { type: 'radio' },
    },
  },
}

export const socialMedia = (args) => <SocialMedia {...args} />
