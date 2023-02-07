import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import themeConst from './constants/article-theme'
import { colorArticle } from '@twreporter/core/lib/constants/color'

const getColorFromTheme = theme => {
  switch (theme) {
    case themeConst.article.v2.photo:
      return colorArticle.milkTea
    case themeConst.article.v2.pink:
      return colorArticle.blue
    case themeConst.article.v2.default:
    default:
      return colorArticle.brown
  }
}

const Text = styled.div`
  color: ${props => getColorFromTheme(props.theme)};
  display: inline-block;
  font-size: 16px;
  line-height: 1;
  padding-left: 5px;

  &:hover {
    padding-bottom: 2px;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: ${props => getColorFromTheme(props.theme)};
  }
`

const Anchor = styled.a`
  text-decoration: none;
`

const TextLink = props => {
  return (
    <Anchor href={props.path}>
      <Text
        theme={props.theme}
        style={{ fontWeight: props.isBold ? 'bold' : 'normal' }}
      >
        {props.name}
      </Text>
    </Anchor>
  )
}

TextLink.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  theme: PropTypes.string,
  isBold: PropTypes.bool,
}

export default TextLink
