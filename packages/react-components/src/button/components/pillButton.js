import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { P1, P2 } from '../../text/paragraph'
// utils
import {
  getFilledPillButtonTheme,
  getOutlinePillButtonTheme,
} from '../utils/theme'
import { getSizeStyle } from '../utils/size'
// enums
import { Style, Type } from '../enums'
import { Size } from '../../shared-enum'
// @twreporter
import { THEME } from '@twreporter/core/lib/constants/theme'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const ButtonContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 40px;
  background-color: ${props =>
    props.type === Type.PRIMARY ? props.bgColor : 'transparent'};
  border-color: ${props => props.bgColor};
  border-style: solid;
  border-width: 1.5px;
  color: ${props => props.color};
  padding: ${props => props.padding};
  cursor: pointer;
  svg {
    height: ${props => props.iconSize};
    width: ${props => props.iconSize};
    background-color: ${props => props.color};
  }
  &:hover {
    color: ${props => props.hoverColor};
    background-color: ${props =>
      props.type === Type.PRIMARY ? props.hoverBgColor : 'transparent'};
    border-color: ${props => props.hoverBgColor};
    svg {
      background-color: ${props => props.hoverColor};
    }
  }
`
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 4px;
  }
  &:last-child {
    margin-left: 4px;
  }
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

const PillButton = ({
  text = '',
  leftIconComponent = null,
  rightIconComponent = null,
  size = Size.S,
  theme = THEME.normal,
  type = Type.PRIMARY,
  style = Style.BRAND,
  disabled = false,
  loading = false,
  ...props
}) => {
  const themeFunc =
    type === Type.PRIMARY ? getFilledPillButtonTheme : getOutlinePillButtonTheme
  const { color, bgColor, hoverColor, hoverBgColor } = themeFunc(
    theme,
    disabled,
    style
  )
  const { padding, iconSize } = getSizeStyle(size)
  const textJSX =
    size === Size.S ? (
      <P2 text={text} weight="bold" />
    ) : (
      <P1 text={text} weight="bold" />
    )
  const leftIconJSX = leftIconComponent ? (
    <IconContainer>{leftIconComponent}</IconContainer>
  ) : null
  const rightIconJSX = rightIconComponent ? (
    <IconContainer>{rightIconComponent}</IconContainer>
  ) : null

  return (
    <ButtonContainer
      type={type}
      padding={padding}
      color={color}
      bgColor={bgColor}
      iconSize={iconSize}
      hoverColor={hoverColor}
      hoverBgColor={hoverBgColor}
      {...props}
    >
      <RelativeParent>
        <HideOnLoading show={!loading}>
          {leftIconJSX}
          {textJSX}
          {rightIconJSX}
        </HideOnLoading>
        <Loader show={loading} size={size === Size.S ? 18 : 24} />
      </RelativeParent>
    </ButtonContainer>
  )
}
PillButton.propTypes = {
  leftIconComponent: PropTypes.element,
  rightIconComponent: PropTypes.element,
  text: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
  theme: PropTypes.oneOf(Object.values(THEME)),
  type: PropTypes.oneOf(Object.values(Type)),
  style: PropTypes.oneOf(Object.values(Style)),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}
PillButton.THEME = THEME
PillButton.Type = Type
PillButton.Size = Size
PillButton.Style = Style

export default PillButton
