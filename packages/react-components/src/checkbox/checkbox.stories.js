import React from 'react'
import Checkbox from '.'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    value: {
      defaultValue: false,
      options: [true, false],
    },
  },
}

const Template = args => <Checkbox {...args} />
export const checkbox = Template.bind({})
checkbox.args = {
  label: '藝術',
  value: false,
  disabled: false,
  onChange: e => {
    console.log('callback', e.target.checked)
  },
}
