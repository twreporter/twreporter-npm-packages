import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Arrow } from '../../icon'
// utils
import {
  getFilledPillButtonTheme,
  getOutlinePillButtonTheme,
} from '../utils/theme'
import { getSizeStyle } from '../utils/size'

const ButtonContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 40px;
  background-color: ${(props) =>
    props.type === 'filled' ? props.bgColor : 'transparent'};
  border-color: ${(props) => props.bgColor};
  border-style: solid;
  border-width: 1px;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  cursor: pointer;
  svg {
    height: ${(props) => props.iconSize};
    width: ${(props) => props.iconSize};
    background-color: ${(props) => props.color};
  }
  &:hover {
    color: ${(props) => props.hoverColor};
    background-color: ${(props) =>
      props.type === 'filled' ? props.hoverBgColor : 'transparent'};
    border-color: ${(props) => props.hoverBgColor};
    svg {
      background-color: ${(props) => props.hoverColor};
    }
  }
`

const TextContainer = styled.div`
  font-size: inherit;
  margin-right: 4px;
`

const PillButton = ({
  text = '',
  size = 'S',
  theme = 'normal',
  type = 'filled',
  disabled = false,
}) => {
  const themeFunc =
    type === 'filled' ? getFilledPillButtonTheme : getOutlinePillButtonTheme
  const { color, bgColor, hoverColor, hoverBgColor } = themeFunc(
    theme,
    disabled
  )
  const { fontSize, padding, iconSize } = getSizeStyle(size)
  return (
    <ButtonContainer
      type={type}
      padding={padding}
      color={color}
      bgColor={bgColor}
      fontSize={fontSize}
      iconSize={iconSize}
      hoverColor={hoverColor}
      hoverBgColor={hoverBgColor}
    >
      <TextContainer>{text}</TextContainer>
      <Arrow direction="right" />
    </ButtonContainer>
  )
}
PillButton.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(['S', 'L']),
  theme: PropTypes.oneOf(['transparent', 'normal', 'photography', 'index']),
  type: PropTypes.oneOf(['filled', 'outline']),
  disabled: PropTypes.bool,
}

export default PillButton
