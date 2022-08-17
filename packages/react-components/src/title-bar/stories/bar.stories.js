import React from 'react'
import Bar from '../components/bar'

export default {
  title: 'Title Bar/Bar',
  component: Bar,
}

const Template = (args) => <Bar {...args} />

export const bar = Template.bind({})
bar.args = {
  title: '標題',
  subtitle: '副標',
}

export const tagBar = Template.bind({})
tagBar.args = {
  title: 'Tag',
}

export const bookmarkBar = Template.bind({})
bookmarkBar.args = {
  title: '我的書籤',
  subtitle: '全部 55',
}
