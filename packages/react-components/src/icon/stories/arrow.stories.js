import React from 'react'
import { Arrow } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Icon/Arrow',
  component: Arrow,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

const Template = args => <Arrow {...args} />
export const arrow = Template.bind({})
arrow.args = { direction: 'right' }

export const right = Template.bind({})
right.parameters = { controls: { exclude: ['direction'] } }
right.args = { direction: 'right' }

export const left = Template.bind({})
left.parameters = { controls: { exclude: ['direction'] } }
left.args = { direction: 'left' }

export const up = Template.bind({})
up.parameters = { controls: { exclude: ['direction'] } }
up.args = { direction: 'up' }

export const down = Template.bind({})
down.parameters = { controls: { exclude: ['direction'] } }
down.args = { direction: 'down' }
