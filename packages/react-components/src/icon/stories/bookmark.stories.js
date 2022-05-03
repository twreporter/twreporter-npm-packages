import React from 'react'
import { Bookmark } from '../index'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

export default {
  title: 'Icon/Bookmark',
  component: Bookmark,
  argTypes: {
    releaseBranch: {
      defaultValue: master,
      options: [master, staging, preview, release],
      control: { type: 'radio' },
    },
  },
}

const Template = args => <Bookmark {...args} />
export const bookmark = Template.bind({})
bookmark.args = { type: 'basic' }

export const basic = Template.bind({})
basic.parameters = { controls: { exclude: ['type'] } }
basic.args = { type: 'basic' }

export const add = Template.bind({})
add.parameters = { controls: { exclude: ['type'] } }
add.args = { type: 'add' }

export const saved = Template.bind({})
saved.parameters = { controls: { exclude: ['type'] } }
saved.args = { type: 'saved' }
