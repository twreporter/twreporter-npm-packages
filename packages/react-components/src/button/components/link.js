import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// component
import Link from '../../customized-link'
import { P1 } from '../../text/paragraph'
// constant
import { LinkType } from '../enums'
// @twreporter
import {
  colorGrayscale,
  COLOR_SEMANTIC,
} from '@twreporter/core/lib/constants/color'

const style = {
  decoration: {
    [LinkType.DEFAULT]: 'none',
    [LinkType.UNDERLINE]: 'underline',
  },
  color: {
    [LinkType.DEFAULT]: COLOR_SEMANTIC.info,
    [LinkType.UNDERLINE]: colorGrayscale.gray600,
  },
}

const BaseContainer = styled(Link)`
  text-underline-offset: 4px;
  text-decoration-line: ${props => style.decoration[props.type]}!important;
  color: ${props => style.color[props.type]};

  &:hover {
    text-decoration-line: underline;
  }
`

const LinkContainer = styled(BaseContainer)`
  display: flex;
  align-items: center;

  ${props =>
    props.disabled
      ? `
    opacity: 0.5;
    cursor: auto;
    -webkit-tap-highlight-color: transparent;
  `
      : `
  `}
`

const InheritLinkContainer = styled(BaseContainer)``

const LinkButton = ({
  type = LinkType.DEFAULT,
  link = {},
  text = '',
  weight = P1.Weight.NORMAL,
  TextComponent = null,
  disabled = false,
  ...props
}) => {
  const textJSX = TextComponent ? (
    <TextComponent text={text} weight={weight} />
  ) : (
    <P1 text={text} weight={weight} />
  )

  return (
    <LinkContainer type={type} disabled={disabled} {...link} {...props}>
      {textJSX}
    </LinkContainer>
  )
}
LinkButton.propTypes = {
  type: PropTypes.oneOf(Object.values(LinkType)),
  link: PropTypes.object,
  text: PropTypes.string.isRequired,
  weight: P1.propTypes.weight,
  TextComponent: PropTypes.elementType,
  disabled: PropTypes.bool,
}
LinkButton.Type = LinkType
LinkButton.Weight = P1.Weight

export const InheritLinkButton = ({
  type = LinkType.DEFAULT,
  link = {},
  text = '',
  ...props
}) => (
  <InheritLinkContainer type={type} {...link} {...props}>
    {text}
  </InheritLinkContainer>
)
InheritLinkButton.propTypes = {
  type: PropTypes.oneOf(Object.values(LinkType)),
  link: PropTypes.object,
  text: PropTypes.string.isRequired,
}
InheritLinkButton.Type = LinkType

export default LinkButton
