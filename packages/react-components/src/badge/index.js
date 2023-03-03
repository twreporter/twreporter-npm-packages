import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { colorBrand } from '@twreporter/core/lib/constants/color'
import { P2 } from '../text/paragraph'

const Container = styled.div`
  background: white;
  padding: 2px 4px;
`

export const Badge = ({ text = '', ...props }) => {
  return (
    <Container {...props}>
      <P2 text={text} />
    </Container>
  )
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Badge
