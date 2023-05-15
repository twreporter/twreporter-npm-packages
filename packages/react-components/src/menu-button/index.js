import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import Link from '../customized-link'
import { P1 } from '../text/paragraph'

const StyledP1 = styled(P1)``
const ItemContainer = styled.div`
  ${StyledP1} {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: ${props => props.paddingLeft}px;
    padding-right: ${props => props.paddingRight}px;
  }
  cursor: pointer;
  color: ${props => props.color};
  a,
  a:visited,
  a:link {
    text-decoration: none;
    color: ${props => props.color};
  }
  svg {
    background-color: ${props => props.color};
  }

  ${mq.desktopAndAbove`
    &:hover {
      background-color: ${props => props.hoverBgColor};
    }
  `}

  &:active {
    background-color: ${props => props.activeBgColor};
  }
`

const MenuButton = ({
  text = '',
  link = {},
  color = colorGrayscale.gray800,
  fontWeight = P1.Weight.NORMAL,
  hoverBgColor = colorGrayscale.gray100,
  activeBgColor = colorGrayscale.gray200,
  paddingLeft = 32,
  paddingRight = 32,
  ...props
}) => {
  return (
    <ItemContainer
      color={color}
      hoverBgColor={hoverBgColor}
      activeBgColor={activeBgColor}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      {...props}
    >
      <Link {...link}>
        <StyledP1 text={text} weight={fontWeight} />
      </Link>
    </ItemContainer>
  )
}

MenuButton.propTypes = {
  text: PropTypes.string,
  link: PropTypes.object,
  color: PropTypes.string,
  fontWeight: PropTypes.oneOf(Object.values(P1.Weight)),
  hoverBgColor: PropTypes.string,
  activeBgColor: PropTypes.string,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
}

export default MenuButton
