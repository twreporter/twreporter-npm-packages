import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  colorBrand,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
import { P2 } from '../../text/paragraph'

const ColorP2 = styled(P2)`
  color: ${colorGrayscale.gray600};
  white-space: nowrap;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 42px;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`

const Switch = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background: ${props =>
    props.disabled ? colorGrayscale.gray400 : colorGrayscale.gray600};
  border-radius: 20px;
  padding: 0px;
  transition: 100ms ease-in-out;

  &:before {
    transition: 100ms ease-in-out;
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 20px;
    top: 50%;
    left: 2px;
    background: white;
    transform: translate(0, -50%);
  }
`

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: ${props =>
      props.disabled ? colorGrayscale.gray400 : colorBrand.heavy};
    &:before {
      transform: translate(20px, -50%);
    }
  }
`

const ToggleButton = ({
  value = false,
  labelOn = '',
  labelOff = '',
  disabled = false,
  onChange = () => {},
  ...props
}) => {
  const handleChange = e => {
    onChange && onChange()
  }

  return (
    <Container>
      <ColorP2 text={value ? labelOn : labelOff} />
      <Label disabled={disabled} {...props}>
        <Input
          type="checkbox"
          disabled={disabled}
          checked={value}
          onChange={handleChange}
        />
        <Switch disabled={disabled} />
      </Label>
    </Container>
  )
}

ToggleButton.propTypes = {
  value: PropTypes.bool.isRequired,
  labelOn: PropTypes.string,
  labelOff: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default ToggleButton
