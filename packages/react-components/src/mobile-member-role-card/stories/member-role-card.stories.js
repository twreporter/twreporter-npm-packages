import MobileMemberRoleCard from '../index'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import { READING_TIME_UNIT } from '@twreporter/core/src/constants/reading-time-unit'

export default {
  title: 'Member Role Card',
  component: MobileMemberRoleCard,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
    role: getRadioArg(MEMBER_ROLE, MEMBER_ROLE.explorer),
    articleReadingTimeUnit: getRadioArg(
      READING_TIME_UNIT,
      READING_TIME_UNIT.minute
    ),
  },
}

export const moblieMemberRoleCard = {
  args: {
    email: 'abc@mail.com',
    joinDate: '2022/1/8',
    name: '報導者',
    articleReadCount: 12,
    articleReadingTime: 380,
    hideInfo: false,
  },
}
