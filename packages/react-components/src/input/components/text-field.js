import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// enum
import { TextAlign, TextState } from '../enums'
// @twreporter
import {
  colorGrayscale,
  COLOR_SEMANTIC,
} from '@twreporter/core/lib/constants/color'
import { P3 } from '../../text/paragraph'

const textAlign = {
  [TextAlign.LEFT]: 'left',
  [TextAlign.CENTER]: 'center',
}
const textColor = {
  [TextState.DEFAULT]: colorGrayscale.gray800,
  [TextState.ERROR]: colorGrayscale.gray800,
  [TextState.DISABLED]: colorGrayscale.gray500,
}
const messageColor = {
  [TextState.DEFAULT]: colorGrayscale.gray800,
  [TextState.ERROR]: COLOR_SEMANTIC.danger,
  [TextState.DISABLED]: colorGrayscale.gray500,
}
const borderColor = messageColor

const Input = styled.input`
  height: 40px;
  font-size: 16px;
  border-width: 0 0 1px 0;
  background-color: inherit;
  color: ${props => textColor[props.state]};
  border-color: ${props => borderColor[props.state]};
  &:focus,
  &:focus-visible {
    outline-width: 0;
  }
  &::placeholder {
    color: ${colorGrayscale.gray400};
  }
`
const Message = styled(P3)`
  color: ${props => messageColor[props.state]};
  margin: 8px 0 0 4px;
`
const Container = styled.form`
  ${Input}, ${Message} {
    width: 100%;
    text-align: ${props => textAlign[props.align]};
    justify-content: ${props => textAlign[props.align]};
  }
`

const defaultFunc = () => {}
const TextField = ({
  placeholder = '',
  align = TextAlign.LEFT,
  state = TextState.DEFAULT,
  message = '',
  onSubmit = defaultFunc,
  onChange = defaultFunc,
  ...props
}) => {
  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    onSubmit(e.target.input.value)
  }
  const handleChange = e => {
    onChange(e.target.value)
  }
  return (
    <Container onSubmit={handleSubmit} align={align} {...props}>
      <Input
        name="input"
        type="text"
        placeholder={placeholder}
        state={state}
        disabled={state === TextState.DISABLED}
        onChange={handleChange}
      ></Input>
      {message && <Message text={message} state={state} />}
    </Container>
  )
}
TextField.propTypes = {
  placeholder: PropTypes.string,
  align: PropTypes.oneOf(Object.values(TextAlign)),
  state: PropTypes.oneOf(Object.values(TextState)),
  message: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
}
TextField.Align = TextAlign
TextField.State = TextState

export default TextField
