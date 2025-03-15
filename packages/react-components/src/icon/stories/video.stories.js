import { Video } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Icon/Video',
  component: Video,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const video = {}
