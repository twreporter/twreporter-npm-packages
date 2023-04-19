import React from 'react'
import { Bookmark } from '../index'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Icon/Bookmark',
  component: Bookmark,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

const Template = args => <Bookmark {...args} />
export const bookmark = Template.bind({})
bookmark.args = { type: Bookmark.Type.BASIC }

export const basic = Template.bind({})
basic.parameters = { controls: { exclude: ['type'] } }
basic.args = { type: Bookmark.Type.BASIC }

export const add = Template.bind({})
add.parameters = { controls: { exclude: ['type'] } }
add.args = { type: Bookmark.Type.ADD }

export const saved = Template.bind({})
saved.parameters = { controls: { exclude: ['type'] } }
saved.args = { type: Bookmark.Type.SAVED }
