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

const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-underline-offset: 4px;
  text-decoration-line: ${props => style.decoration[props.type]};
  color: ${props => style.color[props.type]};

  &:hover {
    text-decoration-line: underline;
  }
`

const LinkButton = ({
  type = LinkType.DEFAULT,
  link = {},
  text = '',
  weight = P1.Weight.NORMAL,
  TextComponent = null,
  ...props
}) => {
  const textJSX = TextComponent ? (
    <TextComponent text={text} weight={weight} />
  ) : (
    <P1 text={text} weight={weight} />
  )

  return (
    <LinkContainer type={type} {...link} {...props}>
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
}
LinkButton.Type = LinkType
LinkButton.Weight = P1.Weight

export default LinkButton
