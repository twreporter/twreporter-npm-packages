import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import {
  getPrimaryIconButtonTheme,
  getSecondaryIconButtonTheme,
} from '../utils/theme'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  svg {
    width: 24px;
    height: 24px;
    background-color: ${props => props.color};
  }

  ${mq.desktopAndAbove`
    &:hover svg {
      background-color: ${props => props.hoverColor};
    }
  `}
`

const IconButton = ({
  iconComponent,
  theme = 'normal',
  type = 'primary',
  disabled = false,
  active = false,
}) => {
  const themeFunc =
    type === 'primary' ? getPrimaryIconButtonTheme : getSecondaryIconButtonTheme
  const { color, hoverColor } = themeFunc(theme, active, disabled)

  return (
    <ButtonContainer color={color} hoverColor={hoverColor}>
      {iconComponent}
    </ButtonContainer>
  )
}
IconButton.propTypes = {
  iconComponent: PropTypes.elementType.isRequired,
  theme: PropTypes.oneOf(['normal', 'photography', 'transparent', 'index']),
  type: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  active: PropTypes.bool,
}

export default IconButton
