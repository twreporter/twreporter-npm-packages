import React from 'react'
import { Arrow } from '../index'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

export default {
  title: 'Icon/Arrow',
  component: Arrow,
  argTypes: {
    releaseBranch: {
      defaultValue: master,
      options: [master, staging, preview, release],
      control: { type: 'radio' },
    },
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
