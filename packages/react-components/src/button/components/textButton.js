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

const TextButton = ({
  text = '',
  iconComponent,
  size = 'S',
  theme = 'normal',
  type = 'primary',
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
      type === 'primary'
        ? getPrimaryTextButtonTheme
        : getSecondaryTextButtonTheme
  }
  const { color, hoverColor } = themeFunc(theme, active)
  const { iconSize } = getSizeStyle(size)
  const textJSX =
    size === 'S' ? (
      <P2 text={text} weight="bold" />
    ) : (
      <P1 text={text} weight="bold" />
    )

  return (
    <ButtonContainer color={color} hoverColor={hoverColor} iconSize={iconSize}>
      {textJSX}
      {iconComponent}
    </ButtonContainer>
  )
}
TextButton.propTypes = {
  iconComponent: PropTypes.element,
  text: PropTypes.string,
  size: PropTypes.oneOf(['S', 'L']),
  theme: PropTypes.oneOf(['transparent', 'normal', 'photography', 'index']),
  type: PropTypes.oneOf(['primary', 'secondary']),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default TextButton
