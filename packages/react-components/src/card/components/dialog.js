import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P1, P2 } from '../../text/paragraph'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Text = styled.div`
  padding: 16px 24px;
  background-color: white;
`

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid white;
  transform: translateX(-16px);
`

const Dialog = ({ text = '', size = 'S', ...props }) => {
  const textIcon =
    size === 'S' ? (
      <P2 text={text} weight="bold" />
    ) : (
      <P1 text={text} weight="bold" />
    )
  return (
    <Container {...props}>
      <Triangle />
      <Text>{textIcon}</Text>
    </Container>
  )
}
Dialog.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(['S', 'L']),
}

export default Dialog
