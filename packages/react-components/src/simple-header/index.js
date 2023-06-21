import React from 'react'
import styled from 'styled-components'
import { LogoHeader } from '../logo'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
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
