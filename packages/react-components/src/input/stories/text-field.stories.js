import React from 'react'
import styled from 'styled-components'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import TextField from '../components/text-field'

export default {
  title: 'Input/Text Field',
  component: TextField,
  argTypes: {
    align: getRadioArg(TextField.Align, TextField.Align.LEFT),
    state: getRadioArg(TextField.State, TextField.State.DEFAULT),
  },
}

const Form = styled(TextField)`
  width: 200px;
`
export const textField = args => <Form {...args} />
const onSubmit = value => {
  console.log('submit', value)
}
textField.args = {
  onSubmit,
  placeholder: 'test',
  align: TextField.Align.LEFT,
  state: TextField.State.DEFAULT,
  message: '系統文字',
  type: 'text',
}
