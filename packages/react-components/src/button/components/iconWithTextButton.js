import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import { getIconWithTextButtonTheme } from '../utils/theme'
// components
import { P4 } from '../../text/paragraph'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.color};
  svg {
    width: 24px;
    height: 24px;
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

const IconWithTextButton = ({
  text = '',
  iconComponent,
  theme = 'normal',
  disabled = false,
  active = false,
}) => {
  const { color, hoverColor } = getIconWithTextButtonTheme(
    theme,
    active,
    disabled
  )

  return (
    <ButtonContainer color={color} hoverColor={hoverColor}>
      {iconComponent}
      <P4 text={text} weight="bold" />
    </ButtonContainer>
  )
}
IconWithTextButton.propTypes = {
  text: PropTypes.string,
  iconComponent: PropTypes.elementType.isRequired,
  theme: PropTypes.oneOf(['normal', 'photography', 'transparent', 'index']),
  disabled: PropTypes.bool,
  active: PropTypes.bool,
}

export default IconWithTextButton
