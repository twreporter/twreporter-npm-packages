import React from 'react'
import styled from 'styled-components'
import { LogoHeader } from '../logo'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px 24px;
`

const Logo = styled(LogoHeader)`
  width: 144px;
  height: 21px;
`

export const SimpleHeader = props => {
  return (
    <HeaderContainer {...props}>
      <Logo />
    </HeaderContainer>
  )
}

export default SimpleHeader
