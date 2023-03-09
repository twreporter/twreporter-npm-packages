import React from 'react'
import styled from 'styled-components'
import { LogoHeader } from '../logo'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px 24px;
`

export const SimpleHeader = props => {
  return (
    <HeaderContainer {...props}>
      <LogoHeader width="144px" height="21px" />
    </HeaderContainer>
  )
}

export default SimpleHeader
