import { Arrow } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Icon/Arrow',
  component: Arrow,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const arrow = {
  args: { direction: Arrow.Direction.RIGHT },
}

export const right = {
  parameters: { controls: { exclude: ['direction'] } },
  args: { direction: Arrow.Direction.RIGHT },
}

export const left = {
  parameters: { controls: { exclude: ['direction'] } },
  args: { direction: Arrow.Direction.LEFT },
}

export const up = {
  parameters: { controls: { exclude: ['direction'] } },
  args: { direction: Arrow.Direction.UP },
}

export const down = {
  parameters: { controls: { exclude: ['direction'] } },
  args: { direction: Arrow.Direction.DOWN },
}
