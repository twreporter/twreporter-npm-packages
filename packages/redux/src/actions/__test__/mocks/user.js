import { EMAIL_SUBSCRIPTION_KEY } from '@twreporter/core/lib/constants/email-subscription'
import { READ_PREFERENCE } from '@twreporter/core/lib/constants/read-preference'

const mockUserId = 1

const mockSetUserData = {
  read_preference: [READ_PREFERENCE.art],
  maillist: [EMAIL_SUBSCRIPTION_KEY.featured],
}

export { mockUserId, mockSetUserData }
