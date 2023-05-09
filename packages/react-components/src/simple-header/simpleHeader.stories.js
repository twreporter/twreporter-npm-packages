import React from 'react'
import SimpleHeader from '.'

export default {
  title: 'Header/Simple Header',
  component: SimpleHeader,
}

const Template = args => <SimpleHeader {...args} />
export const simpleHeader = Template.bind({})
simpleHeader.args = {}
