import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P1, P2 } from '../../text/paragraph'
// utils
import {
  getFilledPillButtonTheme,
  getOutlinePillButtonTheme,
} from '../utils/theme'
import { getSizeStyle } from '../utils/size'
// constants
import { TYPE, TYPE_PROP_TYPES } from '../constants/type'
import { STYLE, STYLE_PROP_TYPES } from '../constants/style'
// @twreporter
import { THEME, THEME_PROP_TYPES } from '@twreporter/core/lib/constants/theme'
import { SIZE, SIZE_PROP_TYPES } from '@twreporter/core/lib/constants/size'

const ButtonContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 40px;
  background-color: ${props =>
    props.type === TYPE.primary ? props.bgColor : 'transparent'};
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
      props.type === TYPE.primary ? props.hoverBgColor : 'transparent'};
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

const PillButton = ({
  text = '',
  leftIconComponent = null,
  rightIconComponent = null,
  size = SIZE.S,
  theme = THEME.normal,
  type = TYPE.primary,
  style = STYLE.brand,
  disabled = false,
  ...props
}) => {
  const themeFunc =
    type === TYPE.primary ? getFilledPillButtonTheme : getOutlinePillButtonTheme
  const { color, bgColor, hoverColor, hoverBgColor } = themeFunc(
    theme,
    disabled,
    style
  )
  const { padding, iconSize } = getSizeStyle(size)
  const textJSX =
    size === SIZE.S ? (
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
      {leftIconJSX}
      {textJSX}
      {rightIconJSX}
    </ButtonContainer>
  )
}
PillButton.propTypes = {
  leftIconComponent: PropTypes.element,
  rightIconComponent: PropTypes.element,
  text: PropTypes.string,
  size: SIZE_PROP_TYPES,
  theme: THEME_PROP_TYPES,
  type: TYPE_PROP_TYPES,
  style: STYLE_PROP_TYPES,
  disabled: PropTypes.bool,
}

export default PillButton
