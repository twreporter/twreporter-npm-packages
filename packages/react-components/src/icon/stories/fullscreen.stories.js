import { Fullscreen } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Icon/Fullscreen',
  component: Fullscreen,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const fullscreen = {}
