import React, { useContext } from 'react'
import styled from 'styled-components'
import HeaderContext from '../contexts/header-context'
import sloganText from '../constants/slogan'
import fonts from '../constants/fonts'
import { selectSloganTheme } from '../utils/theme'
import { fontWeight } from '@twreporter/core/lib/constants/font'

const SloganContainer = styled.div`
  color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  cursor: default;
  font-family: ${fonts.family.serif};
  font-weight: ${fontWeight.normal};
  font-size: 14px;
`

const Slogan = ({ ...props }) => {
  const { theme } = useContext(HeaderContext)
  const color = selectSloganTheme(theme)
  return (
    <SloganContainer $color={color} {...props}>
      {sloganText}
    </SloganContainer>
  )
}

export default Slogan
