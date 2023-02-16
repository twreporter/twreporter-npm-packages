import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'
import { COLOR_ARTICLE } from '@twreporter/core/lib/constants/color'

const getColorFromTheme = theme => {
  switch (theme) {
    case ARTICLE_THEME.v2.photo:
      return COLOR_ARTICLE.milkTea
    case ARTICLE_THEME.v2.pink:
      return COLOR_ARTICLE.blue
    case ARTICLE_THEME.v2.default:
    default:
      return COLOR_ARTICLE.brown
  }
}

const Text = styled.div`
  color: ${props => props.color};
  display: inline-block;
  font-size: 16px;
  line-height: 1;
  padding: ${props => props.padding};

  &:hover {
    padding-bottom: 2px;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: ${props => props.color};
  }
`

const Anchor = styled.a`
  text-decoration: none;
`

const TextLink = ({
  path = '',
  name = '',
  theme = ARTICLE_THEME.v2.default,
  isBold = false,
  ...props
}) => {
  const color = getColorFromTheme(theme)
  return (
    <Anchor href={path}>
      <Text
        color={color}
        style={{ fontWeight: isBold ? 'bold' : 'normal' }}
        {...props}
      >
        {name}
      </Text>
    </Anchor>
  )
}

TextLink.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string,
  theme: PropTypes.string,
  isBold: PropTypes.bool,
}

export default TextLink
