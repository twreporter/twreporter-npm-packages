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
import { SIZE, SIZE_PROP_TYPES } from '../constants/size'
import { TYPE, TYPE_PROP_TYPES } from '../constants/type'
// @twreporter
import { THEME, THEME_PROP_TYPES } from '@twreporter/core/lib/constants/theme'

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
    margin-left: 4px;
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

const PillButton = ({
  text = '',
  iconComponent,
  size = SIZE.S,
  theme = THEME.normal,
  type = TYPE.primary,
  disabled = false,
  ...props
}) => {
  const themeFunc =
    type === TYPE.primary ? getFilledPillButtonTheme : getOutlinePillButtonTheme
  const { color, bgColor, hoverColor, hoverBgColor } = themeFunc(
    theme,
    disabled
  )
  const { padding, iconSize } = getSizeStyle(size)
  const textJSX =
    size === SIZE.S ? (
      <P2 text={text} weight="bold" />
    ) : (
      <P1 text={text} weight="bold" />
    )
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
      {textJSX}
      {iconComponent}
    </ButtonContainer>
  )
}
PillButton.propTypes = {
  iconComponent: PropTypes.element,
  text: PropTypes.string,
  size: SIZE_PROP_TYPES,
  theme: THEME_PROP_TYPES,
  type: TYPE_PROP_TYPES,
  disabled: PropTypes.bool,
}

export default PillButton
