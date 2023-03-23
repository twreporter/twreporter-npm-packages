import React from 'react'
import Checkbox from '.'

export default {
  title: 'Checkbox',
  component: Checkbox,
}

const Template = args => <Checkbox {...args} />
export const checkbox = Template.bind({})
checkbox.args = {
  label: '藝術',
  value: false,
}
