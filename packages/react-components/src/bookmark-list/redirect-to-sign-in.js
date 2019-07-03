import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Message = styled.div`
  width: 90%;
  text-align: center;
`

const RedirectToSignIn = ({ children }) => (
  <Container>
    <Message>{children}</Message>
  </Container>
)

RedirectToSignIn.propTypes = {
  children: PropTypes.node,
}

export default RedirectToSignIn
