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
import { TEXT_BUTTON_THEME, TEXT_BUTTON_THEME_PROP_TYPES } from '../constants/'
import { SIZE, SIZE_PROP_TYPES } from '../constants/size'
import { TYPE, TYPE_PROP_TYPES } from '../constants/type'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'

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

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${props => (props.isLeft ? '0 4px 0 0' : '0 0 0 4px')};
`

const TextButton = ({
  text = '',
  leftIconComponent = null,
  rightIconComponent = null,
  size = SIZE.S,
  theme = TEXT_BUTTON_THEME.normal,
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
  const { color, hoverColor } = themeFunc(theme, active)
  const { iconSize } = getSizeStyle(size)
  const textJSX =
    size === SIZE.S ? (
      <P2 text={text} weight="bold" />
    ) : (
      <P1 text={text} weight="bold" />
    )

  return (
    <ButtonContainer
      color={color}
      hoverColor={hoverColor}
      iconSize={iconSize}
      {...props}
    >
      {size === SIZE.L ? (
        <IconContainer isLeft={true}>{leftIconComponent}</IconContainer>
      ) : (
        leftIconComponent
      )}
      {textJSX}
      {size === SIZE.L ? (
        <IconContainer>{rightIconComponent}</IconContainer>
      ) : (
        rightIconComponent
      )}
    </ButtonContainer>
  )
}
TextButton.propTypes = {
  leftIconComponent: PropTypes.element,
  rightIconComponent: PropTypes.element,
  text: PropTypes.string,
  size: SIZE_PROP_TYPES,
  theme: TEXT_BUTTON_THEME_PROP_TYPES,
  type: TYPE_PROP_TYPES,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default TextButton
