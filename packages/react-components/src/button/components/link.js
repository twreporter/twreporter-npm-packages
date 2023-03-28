import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// component
import Link from '../../customized-link'
import { P1 } from '../../text/paragraph'
// constant
import { LINK_TYPE, LINK_TYPE_PROP_TYPES } from '../constants/type'
// @twreporter
import {
  colorGrayscale,
  COLOR_SEMANTIC,
} from '@twreporter/core/lib/constants/color'

const style = {
  decoration: {
    [LINK_TYPE.default]: 'none',
    [LINK_TYPE.underline]: 'underline',
  },
  color: {
    [LINK_TYPE.default]: COLOR_SEMANTIC.info,
    [LINK_TYPE.underline]: colorGrayscale.gray600,
  },
}

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  text-underline-offset: 4px;
  text-decoration-line: ${props => style.decoration[props.type]};
  color: ${props => style.color[props.type]};

  &:hover {
    text-decoration-line: underline;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const LinkButton = ({
  type = LINK_TYPE.default,
  link = {},
  text = '',
  weight,
  TextComponent = null,
  ...props
}) => {
  const textJSX = TextComponent ? (
    <TextComponent text={text} weight={weight} />
  ) : (
    <P1 text={text} weight={weight} />
  )

  return (
    <LinkContainer type={type} {...props}>
      <StyledLink {...link}>{textJSX}</StyledLink>
    </LinkContainer>
  )
}
LinkButton.propTypes = {
  type: LINK_TYPE_PROP_TYPES,
  link: PropTypes.object,
  text: PropTypes.string.isRequired,
  weight: PropTypes.string,
  TextComponent: PropTypes.elementType,
}

export default LinkButton
