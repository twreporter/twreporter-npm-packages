import React from 'react'
import MobileMemberRoleCard from '../index'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'

export default {
  title: 'Member Role Card',
  component: MobileMemberRoleCard,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
    role: getRadioArg(MEMBER_ROLE, MEMBER_ROLE.explorer),
  },
}

export const moblieMemberRoleCard = args => <MobileMemberRoleCard {...args} />

moblieMemberRoleCard.args = {
  email: 'abc@mail.com',
  joinDate: '2022/01/08',
  name: '報導者',
}
