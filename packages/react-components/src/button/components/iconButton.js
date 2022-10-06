import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import {
  getPrimaryIconButtonTheme,
  getSecondaryIconButtonTheme,
} from '../utils/theme'
// constants
import { TYPE, TYPE_PROP_TYPES } from '../constants/type'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { THEME, THEME_PROP_TYPES } from '@twreporter/core/lib/constants/theme'

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
  type = TYPE.primary,
  disabled = false,
  active = false,
  ...props
}) => {
  const themeFunc =
    type === TYPE.primary
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
  theme: THEME_PROP_TYPES,
  type: TYPE_PROP_TYPES,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
}

export default IconButton
