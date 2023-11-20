import LogoHeader from '../components/logo-header'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Logo/Header',
  component: LogoHeader,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const header = {
  args: { type: LogoHeader.Type.DEFAULT },
}
