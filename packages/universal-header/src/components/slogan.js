import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import HeaderContext from '../contexts/header-context'
import sloganText from '../constants/slogan'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import themeUtils from '../utils/theme'

const style = {
  fontSize: {
    desktop: fonts.size.base,
  },
}

const SloganContainer = styled.div`
  color: ${props => props.color || colors.grayDark};
  font-size: ${style.fontSize.desktop};
  font-family: ${fonts.family.serif};
  display: flex;
  align-items: center;
`

const Slogan = ({ themeFunction }) => {
  return (
    <HeaderContext.Consumer>
      {({ theme }) => {
        const color = themeFunction(theme)
        return <SloganContainer color={color}>{sloganText}</SloganContainer>
      }}
    </HeaderContext.Consumer>
  )
}

Slogan.propTypes = {
  themeFunction: PropTypes.func,
}

Slogan.defaultProps = {
  themeFunction: themeUtils.selectSloganTheme,
}

export default Slogan
