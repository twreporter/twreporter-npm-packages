import React from 'react'
import HeaderContext from '../contexts/header-context'
import sloganText from '../constants/slogan'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import styled from 'styled-components'
import themeUtils from '../utils/theme'

const style = {
  fontSize: {
    desktop: fonts.size.base
  }
}

const SloganContainer = styled.div`
  color: ${props => props.color || colors.grayDark};
  font-size: ${style.fontSize.desktop};
  font-family: Noto Serif TC;
  display: flex;
  align-items: center;
`

const Slogan = () => {
  return (
    <HeaderContext.Consumer>
      {({ theme }) => {
        const color = themeUtils.selectSloganColor(theme)
        return (
          <SloganContainer color={color}>
            {sloganText}
          </SloganContainer>
        )
      }}
    </HeaderContext.Consumer>
  )
}

export default Slogan
