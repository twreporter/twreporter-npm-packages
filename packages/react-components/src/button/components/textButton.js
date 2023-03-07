import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// util
import {
  getDisabledTextButtonTheme,
  getActiveTextButtonTheme,
  getPrimaryTextButtonTheme,
  getSecondaryTextButtonTheme,
} from '../utils/theme'
import { getSizeStyle } from '../utils/size'
// component
import { P1, P2 } from '../../text/paragraph'
// constants
import { Position } from '../constants'
import { SIZE, SIZE_PROP_TYPES } from '../constants/size'
import { TYPE, TYPE_PROP_TYPES } from '../constants/type'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { THEME, THEME_PROP_TYPES } from '@twreporter/core/lib/constants/theme'

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.color};
  svg {
    height: ${props => props.iconSize};
    width: ${props => props.iconSize};
    background-color: ${props => props.color};
  }

  ${mq.desktopAndAbove`
    &:hover {
      color: ${props => props.hoverColor};
      svg {
        background-color: ${props => props.hoverColor};
      }
    }
  `}
`

const TextButton = ({
  text = '',
  iconComponent,
  iconPosition = Position.RIGHT,
  size = SIZE.S,
  colorSet = undefined,
  theme = THEME.normal,
  type = TYPE.primary,
  active = false,
  disabled = false,
  ...props
}) => {
  let themeFunc
  if (disabled) {
    themeFunc = getDisabledTextButtonTheme
  } else if (active) {
    themeFunc = getActiveTextButtonTheme
  } else {
    themeFunc =
      type === TYPE.primary
        ? getPrimaryTextButtonTheme
        : getSecondaryTextButtonTheme
  }
  const { color, hoverColor } = colorSet || themeFunc(theme, active)
  const { iconSize } = getSizeStyle(size)
  const textJSX =
    size === SIZE.S ? (
      <P2 text={text} weight="bold" />
    ) : (
      <P1 text={text} weight="bold" />
    )

  const components =
    iconPosition === Position.RIGHT ? (
      <>
        {textJSX}
        {iconComponent}
      </>
    ) : (
      <>
        {iconComponent}
        {textJSX}
      </>
    )

  return (
    <ButtonContainer
      color={color}
      hoverColor={hoverColor}
      iconSize={iconSize}
      {...props}
    >
      {components}
    </ButtonContainer>
  )
}
TextButton.propTypes = {
  iconComponent: PropTypes.element,
  iconPosition: PropTypes.oneOf([Position.LEFT, Position.RIGHT]),
  text: PropTypes.string,
  size: SIZE_PROP_TYPES,
  colorSet: PropTypes.shape({
    color: PropTypes.string,
    hoverColor: PropTypes.string,
  }),
  theme: THEME_PROP_TYPES,
  type: TYPE_PROP_TYPES,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default TextButton
