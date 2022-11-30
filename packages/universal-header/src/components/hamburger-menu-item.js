import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// context
import HeaderContext from '../contexts/header-context'
// utils
import { selectHamburgerItemTheme } from '../utils/theme'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import { Arrow } from '@twreporter/react-components/lib/icon'
import { P1, P2 } from '@twreporter/react-components/lib/text/paragraph'

const StyledP1 = styled(P1)``
const StyledP2 = styled(P2)``
const ItemContainer = styled.div`
  ${StyledP1} {
    padding: 8px 32px;
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

  &:hover {
    background-color: ${props => props.hoverBgColor};
  }

  &:active {
    background-color: ${props => props.activeBgColor};
  }
`
const SubItemContainer = styled(ItemContainer)`
  ${StyledP2} {
    padding: 8px 32px 8px 48px;
  }
`
const DropdownItemContainer = styled(ItemContainer)`
  padding: 8px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    transform: rotate(${props => props.rotate});
    transition: all 300ms;
  }
`

export const MenuLinkItem = ({ text = '', link = {}, ...props }) => {
  const { theme } = useContext(HeaderContext)
  const { color, hoverBgColor, activeBgColor } = selectHamburgerItemTheme(theme)

  return (
    <ItemContainer
      color={color}
      hoverBgColor={hoverBgColor}
      activeBgColor={activeBgColor}
      {...props}
    >
      <Link {...link}>
        <StyledP1 text={text} weight="bold" />
      </Link>
    </ItemContainer>
  )
}
MenuLinkItem.propTypes = {
  text: PropTypes.string,
  link: PropTypes.object,
}

export const MenuSubItem = ({ text = '', link = {}, ...props }) => {
  const { theme } = useContext(HeaderContext)
  const { color, hoverBgColor, activeBgColor } = selectHamburgerItemTheme(theme)

  return (
    <SubItemContainer
      color={color}
      hoverBgColor={hoverBgColor}
      activeBgColor={activeBgColor}
      {...props}
    >
      <Link {...link}>
        <StyledP2 text={text} weight="bold" />
      </Link>
    </SubItemContainer>
  )
}
MenuSubItem.propTypes = {
  text: PropTypes.string,
  link: PropTypes.object,
}

export const MenuDropdownItem = ({ text = '', isActive = false, ...props }) => {
  const { theme, releaseBranch } = useContext(HeaderContext)
  const { color, hoverBgColor, activeBgColor } = selectHamburgerItemTheme(
    theme,
    isActive
  )
  const iconRotateDeg = isActive ? '-180deg' : '0'

  return (
    <DropdownItemContainer
      color={color}
      hoverBgColor={hoverBgColor}
      activeBgColor={activeBgColor}
      rotate={iconRotateDeg}
      {...props}
    >
      <P1 text={text} weight="bold" />
      <Arrow direction="down" releaseBranch={releaseBranch} />
    </DropdownItemContainer>
  )
}
MenuDropdownItem.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
}
