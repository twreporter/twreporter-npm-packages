import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import { SocialMedia } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Icon/Social Media',
  component: SocialMedia,
  argTypes: {
    type: getRadioArg(SocialMedia.Type, SocialMedia.Type.MASK),
    mediaType: getRadioArg(SocialMedia.MediaType, SocialMedia.MediaType.GOOGLE),
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const socialMedia = {}
