import EmptyState from '../index'
import { Style } from '../enums'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Empty State',
  component: EmptyState,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
    style: getRadioArg(Style, Style.DEFAULT),
  },
}

export const emptyState = {
  args: {
    title: '文字',
    showGuide: true,
    guide: '文字文字',
    showButton: true,
    buttonText: '按鈕',
    buttonUrl: '/',
    maxWidth: '80vw',
  },
}
