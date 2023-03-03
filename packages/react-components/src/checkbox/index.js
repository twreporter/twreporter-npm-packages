import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P1 } from '../text/paragraph'

const Container = styled.div`
  display: flex;
  flex-direction: 'row';
`

export const Checkbox = ({
  value = false,
  label = '',
  onChange = () => {},
  ...props
}) => {
  return (
    <Container {...props}>
      <input type="checkbox" checked={value} onChange={onChange} />
      <P1 text={label} />
    </Container>
  )
}

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox
