import { Back } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Icon/Back',
  component: Back,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const back = {}
