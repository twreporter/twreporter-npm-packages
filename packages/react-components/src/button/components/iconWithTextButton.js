import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import { getIconWithTextButtonTheme } from '../utils/theme'
// components
import { P4 } from '../../text/paragraph'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { THEME } from '@twreporter/core/lib/constants/theme'

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

const StyledP4 = styled(P4)`
  max-height: ${props => (props.hideText ? '0px' : 'none')};
  opacity: ${props => (props.hideText ? '0' : '1')};
  transition: opacity 100ms;
`

const IconWithTextButton = ({
  text = '',
  iconComponent,
  theme = THEME.normal,
  disabled = false,
  active = false,
  hideText = false,
}) => {
  const { color, hoverColor } = getIconWithTextButtonTheme(
    theme,
    active,
    disabled
  )

  return (
    <ButtonContainer color={color} hoverColor={hoverColor}>
      {iconComponent}
      <StyledP4 text={text} weight="bold" hideText={hideText} />
    </ButtonContainer>
  )
}
IconWithTextButton.propTypes = {
  text: PropTypes.string,
  iconComponent: PropTypes.element.isRequired,
  theme: PropTypes.oneOf(Object.values(THEME)),
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  hideText: PropTypes.bool,
}
IconWithTextButton.THEME = THEME

export default IconWithTextButton
