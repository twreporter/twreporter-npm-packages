import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
// util
import {
  getDisabledTextButtonTheme,
  getActiveTextButtonTheme,
  getTextButtonTheme,
} from '../utils/theme'
import { getSizeStyle } from '../utils/size'
// component
import { P1, P2 } from '../../text/paragraph'
// enums
import { Style } from '../enums'
import { Size } from '../../shared-enum'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { THEME } from '@twreporter/core/lib/constants/theme'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const ButtonContainer = styled.div`
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
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
const HideOnLoading = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  display: flex;
  align-items: center;
  justify-content: center;
`
const RelativeParent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`
const spin = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`

const Loader = styled.span`
  position: absolute;
  opacity: ${props => (props.show ? 1 : 0)};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 2px solid ${colorGrayscale.gray400};
  border-top-color: ${colorGrayscale.gray600};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${spin} 1s linear infinite;
`

const TextButton = ({
  text = '',
  leftIconComponent = null,
  rightIconComponent = null,
  size = Size.S,
  theme = THEME.normal,
  style = Style.DARK,
  active = false,
  disabled = false,
  loading = false,
  ...props
}) => {
  let themeFunc
  if (disabled) {
    themeFunc = getDisabledTextButtonTheme
  } else if (active) {
    themeFunc = getActiveTextButtonTheme
  } else {
    themeFunc = getTextButtonTheme
  }
  const { color, hoverColor } = themeFunc(theme, style)
  const { iconSize } = getSizeStyle(size)
  const textJSX =
    size === Size.S ? (
      <P2 text={text} weight="bold" />
    ) : (
      <P1 text={text} weight="bold" />
    )

  return (
    <ButtonContainer
      color={color}
      hoverColor={hoverColor}
      iconSize={iconSize}
      disabled={disabled}
      {...props}
    >
      <RelativeParent>
        <HideOnLoading show={!loading}>
          <IconContainer isLeft={true}>{leftIconComponent}</IconContainer>
          {textJSX}
          <IconContainer>{rightIconComponent}</IconContainer>
        </HideOnLoading>
        <Loader show={loading} size={size === Size.S ? 18 : 24} />
      </RelativeParent>
    </ButtonContainer>
  )
}
TextButton.propTypes = {
  leftIconComponent: PropTypes.element,
  rightIconComponent: PropTypes.element,
  text: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
  theme: PropTypes.oneOf(Object.values(THEME)),
  style: PropTypes.oneOf(Object.values(Style)),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}
TextButton.THEME = THEME
TextButton.Size = Size
TextButton.Style = Style

export default TextButton
