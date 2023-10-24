import { EMAIL_SUBSCRIPTION_KEY } from '@twreporter/core/lib/constants/email-subscription'
import { READ_PREFERENCE } from '@twreporter/core/lib/constants/read-preference'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'

const mockUserId = 1

const mockGetUserData = {
  userID: '1',
  email: 'abc@email.com',
  firstName: 'first',
  lastName: 'last',
  roles: [
    {
      id: 1,
      name: '探索者',
      name_us: 'explorer',
      key: MEMBER_ROLE.explorer,
    },
  ],
  registrationDate: '2023-06-02T11:19:32Z',
  activated: '2023-06-02T11:19:32Z',
  readPreference: [READ_PREFERENCE.art],
  maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
}

const mockSetUserData = {
  read_preference: [READ_PREFERENCE.art],
  maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
}

export { mockUserId, mockSetUserData, mockGetUserData }
