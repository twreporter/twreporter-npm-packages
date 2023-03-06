import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  colorBrand,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
import { P2 } from '../../text/paragraph'

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
  cursor: pointer;
`

const Switch = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background: ${colorGrayscale.gray600};
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
    background: ${colorBrand.heavy};
    &:before {
      transform: translate(20px, -50%);
    }
  }
`

const ToggleButton = ({
  value = false,
  label = ['', ''],
  onChange = () => {},
  ...props
}) => {
  const labelStr = label && label.length >= 2 ? label[value ? 1 : 0] : ''
  const handleChange = e => {
    onChange && onChange()
  }

  return (
    <Container>
      <P2
        text={labelStr}
        style={{ color: colorGrayscale.gray600, whiteSpace: 'nowrap' }}
      />
      <Label {...props}>
        <Input type="checkbox" checked={value} onChange={handleChange} />
        <Switch />
      </Label>
    </Container>
  )
}

ToggleButton.propTypes = {
  value: PropTypes.bool.isRequired,
  label: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
}

export default ToggleButton
