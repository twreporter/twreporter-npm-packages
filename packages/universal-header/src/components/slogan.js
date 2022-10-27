import React, { useContext } from 'react'
import styled from 'styled-components'
import HeaderContext from '../contexts/header-context'
import sloganText from '../constants/slogan'
import { selectSloganTheme } from '../utils/theme'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'

const SloganContainer = styled.div`
  color: ${props => props.color};
  display: flex;
  align-items: center;
  cursor: default;
  font-family: ${fontFamily.title};
  font-weight: ${fontWeight.bold};
`

const Slogan = ({ ...props }) => {
  const { theme } = useContext(HeaderContext)
  const color = selectSloganTheme(theme)
  return (
    <SloganContainer color={color} {...props}>
      {sloganText}
    </SloganContainer>
  )
}

export default Slogan
