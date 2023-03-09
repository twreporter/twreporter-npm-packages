import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P2 } from '../text/paragraph'

const Container = styled.div`
  background: ${props => props.backgroundColor};
  padding: 2px 4px;
  width: fit-content;
  border-radius: 2px;
`

export const Badge = ({
  text = '',
  textColor = 'black',
  backgroundColor = 'white',
  ...props
}) => {
  return (
    <Container backgroundColor={backgroundColor} {...props}>
      <P2 text={text} style={{ color: textColor }} />
    </Container>
  )
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
}

export default Badge
