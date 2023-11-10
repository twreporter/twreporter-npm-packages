import LogoFallback from '../components/logo-loading-fallback'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Logo/Fallback',
  component: LogoFallback,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const fallback = {}
