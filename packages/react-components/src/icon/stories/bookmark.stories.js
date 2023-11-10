import { Bookmark } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Icon/Bookmark',
  component: Bookmark,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const bookmark = {
  args: { type: Bookmark.Type.BASIC },
}

export const basic = {
  parameters: { controls: { exclude: ['type'] } },
  args: { type: Bookmark.Type.BASIC },
}

export const add = {
  parameters: { controls: { exclude: ['type'] } },
  args: { type: Bookmark.Type.ADD },
}

export const saved = {
  parameters: { controls: { exclude: ['type'] } },
  args: { type: Bookmark.Type.SAVED },
}
