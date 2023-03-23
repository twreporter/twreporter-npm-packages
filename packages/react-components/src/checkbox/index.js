import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P1 } from '../text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const Container = styled.div`
  display: flex;
  flex-direction: 'row';
`

const Input = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  accent-color: ${colorGrayscale.gray800};
  margin-right: 8px;
`

export const Checkbox = ({
  value = false,
  label = '',
  disabled = false,
  onChange = () => {},
  ...props
}) => {
  const handleChange = e => {
    onChange && onChange()
  }
  return (
    <Container {...props}>
      <Input
        type="checkbox"
        checked={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <P1 text={label} />
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
