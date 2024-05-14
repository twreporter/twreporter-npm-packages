import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P1 } from '../text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const disableColor = colorGrayscale.gray400
const activeColor = colorGrayscale.gray800

const Container = styled.div`
  display: flex;
  flex-direction: 'row';
`

const Input = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  z-index: -1;
`

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 25px;
`

const Indicator = styled.div`
  width: 16px;
  height: 16px;
  background: ${(props) =>
    props.value
      ? props.$disabled
        ? disableColor
        : activeColor
      : 'rgba(0, 0, 0, 0)'};
  position: absolute;
  top: 0px;
  left: 0px;
  border-color: ${(props) => (props.$disabled ? disableColor : activeColor)};
  border-radius: 2px;
  box-shadow: 0 0 0 1px
    ${(props) => (props.$disabled ? disableColor : activeColor)};
  margin: 3px 8px 0px 0px;

  &::after {
    content: '';
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    left: 5px;
    top: 0px;
    width: 4px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const ColorP1 = styled(P1)`
  color: ${(props) => (props.$disabled ? disableColor : activeColor)};
`

export const Checkbox = ({
  value = false,
  label = '',
  disabled = false,
  onChange = () => {},
  ...props
}) => {
  const handleChange = (e) => {
    onChange && onChange(e)
  }
  return (
    <Container {...props}>
      <Label>
        {label && <ColorP1 text={label} $disabled={disabled} />}
        <Input
          type="checkbox"
          checked={value}
          disabled={disabled}
          onChange={handleChange}
        />
        <Indicator value={value} $disabled={disabled} />
      </Label>
    </Container>
  )
}

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox
