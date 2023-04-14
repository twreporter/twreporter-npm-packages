import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import {
  getPrimaryIconButtonTheme,
  getSecondaryIconButtonTheme,
} from '../utils/theme'
// enums
import { Type } from '../enums'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { THEME } from '@twreporter/core/lib/constants/theme'

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
  theme = THEME.normal,
  type = Type.PRIMARY,
  disabled = false,
  active = false,
  ...props
}) => {
  const themeFunc =
    type === Type.PRIMARY
      ? getPrimaryIconButtonTheme
      : getSecondaryIconButtonTheme
  const { color, hoverColor } = themeFunc(theme, active, disabled)

  return (
    <ButtonContainer color={color} hoverColor={hoverColor} {...props}>
      {iconComponent}
    </ButtonContainer>
  )
}
IconButton.propTypes = {
  iconComponent: PropTypes.element.isRequired,
  theme: PropTypes.oneOf(Object.values(THEME)),
  type: PropTypes.oneOf(Object.values(Type)),
  disabled: PropTypes.bool,
  active: PropTypes.bool,
}
IconButton.theme = THEME
IconButton.type = Type

export default IconButton
