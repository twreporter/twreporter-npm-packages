import { getRadioArg } from '../utils/get-enum-arg'

import { BRANCH } from '@twreporter/core/lib/constants/release-branch'
import { THEME } from '@twreporter/core/lib/constants/theme'
import { SIZE } from '@twreporter/core/lib/constants/size'

export const BRANCH_STORYBOOK_ARG_TYPE = {
  defaultValue: BRANCH.master,
  options: [BRANCH.master, BRANCH.staging, BRANCH.preview, BRANCH.release],
  control: { type: 'radio' },
}

export const THEME_STORYBOOK_ARG_TYPE = getRadioArg(THEME, THEME.normal)

export const SIZE_STORYBOOK_ARG_TYPE = getRadioArg(SIZE, SIZE.S)
