import Footer from './index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../storybook/constants'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Footer',
  component: Footer,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const footer = {
  args: {
    releaseBranch: releaseBranch.master,
  },
}
