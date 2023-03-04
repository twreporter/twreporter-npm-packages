import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P2 } from '../text/paragraph'

const Container = styled.div`
  background: white;
  padding: 2px 4px;
  width: fit-content;
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
